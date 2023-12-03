import { Component, OnInit,Input,Output } from '@angular/core';
import { Cv } from '../models/cv';

import { EmbaucheService } from '../services/embauche.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cv-detail',
  templateUrl: './cv-detail.component.html',
  styleUrls: ['./cv-detail.component.css']
})
export class CvDetailComponent implements OnInit {

  

  @Input() cv: Cv | null = null;
 
  

  constructor(private embaucherService:EmbaucheService ,private toastrService:ToastrService) { }

  ngOnInit(): void {
   
  }

  showToastWarning() {
    this.toastrService.warning('Le Cv existe déja dans la liste des préembauchés !')
  }

  showToastSuccess() {
    this.toastrService.success('Le Cv a été ajouté a la liste des préembauchés ')
  }

  OnEmbaucher(){
    if(this.cv)
    {
      if(this.embaucherService.existCv(this.cv)){
        this.showToastWarning()
      }
      else {
        
        this.embaucherService.addCv(this.cv);
        this.showToastSuccess()
      
      }
    }

  }
}
