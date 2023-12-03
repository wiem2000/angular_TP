import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { BehaviorSubject, Observable, concatMap, scan, switchMap, takeWhile } from 'rxjs';
import { Product } from '../models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products$!: Observable<Product[]>;
  numberElements$ = new BehaviorSubject<number>(0);

  loading = true;


  constructor(private productService:ProductService, ) {

    this.products$ = this.numberElements$.pipe(
      concatMap((skip) => this.productService.getAll(12, skip)),
      takeWhile(products => !!products.length),
      scan((acc, res)=> {
        return [...acc, ...res]
      })
    );
   }

  ngOnInit(): void {
  }


  showMore(): void {
    const nextPage = this.numberElements$.value + 12;
    if (nextPage <= 100) this.numberElements$.next(nextPage);
    else this.numberElements$.complete();
  }

}
