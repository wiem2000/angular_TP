import { Component, OnInit } from '@angular/core';
import { Cv } from '../models/cv';
import { CvService } from '../services/cv.service';
import { EmbaucheService } from '../services/embauche.service';
import { catchError, map, tap, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  selectedCv: Cv | null = null;
  cvs: Cv[] = [];
  embauches:Cv[]=[]
  juniorCvs: Cv[] = [];
  seniorCvs: Cv[] = [];
  currentTab: 'junior' | 'senior' = 'junior';

  constructor(private cvService:CvService , private embaucheService:EmbaucheService, private route:ActivatedRoute) { 

    const cvs : Cv[] = this.route.snapshot.data['cvs'];
    this.juniorCvs = cvs.filter(cv => cv.age && cv.age < 40);
    this.seniorCvs = cvs.filter(cv => cv.age && cv.age >= 40);

    this.cvs = cvs;
  }

  ngOnInit(): void {
   //this.getAllCv()
    this.embauches=this.embaucheService.getCvs()
  }

  /*
  getAllCv(){
    this.cvService.getCvs().subscribe(
      (data: Cv[]) => {
        this.cvs = data; 
        this.juniorCvs = data.filter(cv => cv.age && cv.age < 40);
        this.seniorCvs = data.filter(cv => cv.age && cv.age >= 40);
      },
      error => {
        console.error(error); 
        
      }
    );
  }
   */

 


  onSelectCv(cv: Cv) {
    this.selectedCv = cv;
    console.log(cv);
  }


  switchTab(tab: 'junior' | 'senior') {
    this.currentTab = tab;
  }
  
}
