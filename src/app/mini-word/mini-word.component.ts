import { Component, OnInit } from '@angular/core';
import { RainbowDirective } from '../directives/rainbow.directive';

@Component({
  selector: 'app-mini-word',
  templateUrl: './mini-word.component.html',
  styleUrls: ['./mini-word.component.css']
})
export class MiniWordComponent implements OnInit {


   myFont:string="garamond";
   myColor:string="black";
   mySize:string="20px";


  changeColor(color: string) {
    this.myColor = color;
  }

  changeSize(size: string) {
    this.mySize = parseInt(size, 10)+"px";
  }

  changeFontFamily(font: string) {
    this.myFont = font;
  }




  constructor() { }

  ngOnInit(): void {
  }


}
