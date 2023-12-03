import { Component, OnInit } from '@angular/core';
import { CvService } from '../services/cv.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { Cv } from '../models/cv';

@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.css']
})
export class MasterDetailsComponent implements OnInit {


  cvs$: Observable<Cv[]>
  
  constructor(private cvService:CvService, private toastr:ToastrService, private router:Router) {

    this.cvs$ = this.cvService.getCvs().pipe(
      catchError((res)=> {
        this.toastr.error('Erreur de récupération de donnés');
        return of(res);
      })
    )
   }

  ngOnInit(): void {
  }

  onSelectCv(cv: Cv){
    this.router.navigate(['list', cv.id]);
  }

 
}
