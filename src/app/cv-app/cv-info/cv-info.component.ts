import { Component, OnInit } from '@angular/core';
import { Cv } from '../models/cv';
import { ActivatedRoute, Router } from '@angular/router';
import { CvService } from '../services/cv.service';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-cv-info',
  templateUrl: './cv-info.component.html',
  styleUrls: ['./cv-info.component.css']
})
export class CvInfoComponent implements OnInit {

  
  cv$: Observable<Cv | null>;
  
  cvId=0
 

  constructor(private toaster:ToastrService,private router: Router,private activatedRoute: ActivatedRoute,private cvService:CvService,public authentificationService: AuthentificationService) {


    this.cv$ = this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const cvIdString = params.get('id');
        if (cvIdString === null) {
        
          return of(null);
        }

        const cvId = +cvIdString; // Convertir l'ID en nombre
        return this.cvService.getCvById(cvId);
      }),
      catchError(() => {
        this.toaster.error('Aucun cv trouvé');
        this.router.navigate(['']);
        return of(null);
      })
    );










  }
   

  ngOnInit(): void {

  /*
      const id = this.activatedRoute.snapshot.paramMap.get('id')

      try {
        this.getCvDetails(Number(id));
      } catch (error) {
        console.error(error);
       
      }
    */
   
  }

  /*
  getCvDetails(cvId: number): void {
    this.cvService.getCvById(cvId).subscribe(
      (data: Cv) => {
        if(data)
         { this.cv = data;}
        
      },
      error => {
        console.error(error); 
      }
    );
  }
 
  



  deleteCv(): void {
    if(this.cv)
    {
    this.cvService.deleteCv(this.cv.id).subscribe(
      (data: any) => {
        if (data) {
          
          console.log('Le CV a été supprimé avec succès.');
          this.router.navigate(['/cv']); 
        } else {       
          console.error('Erreur lors de la suppression du CV.');      
        }
      },
      error => {
        console.error(error); 
      }
    );
  }
}*/

deleteCv() {
  const id = this.activatedRoute.snapshot.params['id'];
  this.cvService
    .deleteCv(id)
    .subscribe({
      next: () => {
        this.router.navigate(['cv']);
      },
      error: (err) => {
        if (err.status == 0) this.cvService.handleDeleteError(id);
        else this.toaster.error(`Erreur - ${err.status} ${err.statusText}`);
        return of(null);
      },
    });
}



}
