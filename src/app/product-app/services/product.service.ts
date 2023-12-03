import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http:HttpClient) { }


  getAll(take: number, skip: number = 0): Observable<Product[]> {
    const url = `${this.apiUrl}?skip=${skip}&limit=${take}`;

    return this.http.get<{products: Product[]}>(url).pipe(
      map((res)=> res.products)
    );
  }
}

