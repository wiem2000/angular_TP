import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input()
  title = ""

  @Input()
  path = ""


  @Input()
  height = 50

  @Input()
  fontSize = 15


  
  constructor() { }

  ngOnInit(): void {
  }

}
