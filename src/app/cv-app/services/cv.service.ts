import { Injectable } from '@angular/core';
import { Cv } from '../models/cv';
import { Observable, catchError, filter, map, of,  } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  handleDeleteError(id: any) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'https://apilb.tridevs.net/api/personnes/';
  
  cvs: Cv[] = [];
  constructor(private http: HttpClient, private toastr: ToastrService){
    this.cvs = [
    new Cv(1, "Alice"," Johnson"),
    new Cv(2, "Ethan"," Martinez"),
    new Cv(3, "Sophia", "Clark"),
    new Cv(4, "Oliver", "Taylor"),
  ];
  }

  /*
  getCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(this.apiUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastr.error('Une erreur est survenue lors de la récupération des CVs depuis l\'API.');
          return of(this.cvs); 
        })
      );
  }
*/
  getCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(this.apiUrl).pipe(
      map((cvs) => {
        this.cvs = cvs;
        return cvs;
      }),
      catchError(() => {
     
        return of(this.cvs);
      })
    );
  }

  addCv(cv: Cv):Observable<any>{
    return this.http.post(this.apiUrl, cv);
  }

  updateCv(cv: Cv){
    return this.http.patch(this.apiUrl, cv);
  }
  

  



  getCvById(id: number): Observable<Cv> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cv>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastr.error('Erreur lors de la récupération du CV spécifique depuis l\'API.');
          const cv=this.cvs.find(cv => cv.id === id);
          if (!cv) {
            throw new Error(`CV avec l'ID ${id} non trouvé`);
          }
          
          return of(cv); 
        })
      );
  }

  getCv(id: number): Observable<Cv | null> {
    return this.http.get<Cv>(this.apiUrl+ id)
      .pipe(
        map((cv) => cv),
        catchError((err) => {
          if (err.status == 0) {
            const cv = this.cvs.find((cv) => cv.id == id);
            if (cv) return of(cv);
          }
          return of(null);
        })
      );
  }


  deleteCv(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastr.error('Erreur lors de la suppression du CV depuis l\'API.');
          this.cvs = this.cvs.filter(cv => cv.id !== id);
          return of(1); 
        })
      );
  }

  getByName(name:string):Observable<Cv[]>{
    const filter=`{"where":{"name":{"like":"%${name}%"}}}`
    const params=new HttpParams().set('filter',filter)
    return this.http.get<Cv[]>(this.apiUrl,{params});

  }


}
