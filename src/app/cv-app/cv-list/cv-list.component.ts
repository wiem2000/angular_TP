import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { Cv } from '../models/cv';
import { CvService } from '../services/cv.service';
import { tap } from 'rxjs';



@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent implements OnInit {

  @Input() cvs: Cv[]|null = [];
  
  @Output() selectCv = new EventEmitter();
  selectedCv?:Cv;
  
  @Input() juniorCvs: Cv[] = [];
  @Input() seniorCvs: Cv[] = [];
  @Input() selectedTab: 'junior' | 'senior' = 'junior';

  @Input()
  onItemClick!: (cv: Cv)=>void;
 
  constructor(private cvService:CvService,) { }

  ngOnInit(): void {
   this.getAllCv()
  }

  getAllCv(){
    this.cvService.getCvs().pipe(
      tap(
      (data: Cv[]) => {
        this.cvs = data; 
    
      },
      error => {
        console.error(error); 
        
      }
    ));
  }





  onSelectCv(cv: Cv): void {
    
    
    this.selectedCv=cv;
    this.selectCv.emit(cv);
  }

}
