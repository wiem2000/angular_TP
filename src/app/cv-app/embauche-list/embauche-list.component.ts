import { Component, OnInit,Input } from '@angular/core';
import { Cv } from '../models/cv';
import { EmbaucheService } from '../services/embauche.service';

@Component({
  selector: 'app-embauche-list',
  templateUrl: './embauche-list.component.html',
  styleUrls: ['./embauche-list.component.css']
})
export class EmbaucheListComponent implements OnInit {

  @Input() embauches: Cv[] = [];
  
 

  constructor(private embaucheService:EmbaucheService) { }

  ngOnInit(): void {
   this.embauches= this.embaucheService.getCvs()
  }



}
