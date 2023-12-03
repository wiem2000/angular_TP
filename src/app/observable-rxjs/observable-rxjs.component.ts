import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, debounceTime, merge, reduce, scan, takeUntil } from 'rxjs';

@Component({
  selector: 'app-observable-rxjs',
  templateUrl: './observable-rxjs.component.html',
  styleUrls: ['./observable-rxjs.component.css']
})
export class ObservableRxjsComponent implements OnInit {

  merge$: Observable<number | null>;
  scan$: Observable<number>;
  reduce$: Observable<number>;

  endStream1$ = new Subject();
  endStream2$ = new Subject();

  numberForm:FormGroup
  
  constructor() {

    this.numberForm = new FormGroup({
      nb1: new FormControl(0),
      nb2: new FormControl(0),
    });

  

    
  const nb1$ = this.numberForm.get('nb1')!.valueChanges.pipe(debounceTime(300), takeUntil(this.endStream1$));

  const nb2$ = this.numberForm.get('nb2')!.valueChanges.pipe(debounceTime(300), takeUntil(this.endStream2$));

  this.merge$ = merge(nb1$, nb2$);

  this.scan$ = this.merge$.pipe(scan((acc, val) => acc + (val ?? 0), 0));

  this.reduce$ = this.merge$.pipe(reduce((acc, val) => acc + (val ?? 0), 0));
   }


  ngOnInit(): void {
 
   
  }

  terminate1() {
    this.endStream1$.next(null);
    this.endStream1$.complete();
  }

  terminate2() {
    this.endStream2$.next(null);
    this.endStream2$.complete();
  }

}
