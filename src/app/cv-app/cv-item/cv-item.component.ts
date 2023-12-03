import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';
import { Cv } from '../models/cv';


@Component({
  selector: 'app-cv-item',
  templateUrl: './cv-item.component.html',
  styleUrls: ['./cv-item.component.css']
})
export class CvItemComponent implements OnInit {

  @Input() cv: Cv | null = null;

  @Input()
  height = 50

  @Input()
  fontSize = 15
 
  @Output()
  selectCv = new EventEmitter<Cv>();

  onSelectCv() {
    if (this.cv) this.selectCv.emit(this.cv);
  }




  constructor() { }

  ngOnInit(): void {
   
  }

}
