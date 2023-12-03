import { Component, Input, OnInit } from '@angular/core';
import { Cv } from '../models/cv';
import { CvService } from '../services/cv.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-cv-search',
  templateUrl: './cv-search.component.html',
  styleUrls: ['./cv-search.component.css']
})
export class CvSearchComponent implements OnInit {

  public searchList$: Observable<Cv[]> | undefined;
  
  public searchControl = new FormControl('');
  @Input()
  height = 50

  @Input()
  fontSize = 15

  constructor(private cvService:CvService, private router:Router) { }

  ngOnInit(): void {
   
    this.setupSearchListener()
  }


private setupSearchListener() {
  this.searchList$ = this.searchControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(name => {
      // Vérifie si l'entrée est vide avant d'appeler le service
      if (!name.trim()) {
        return of([]); // Retourne un observable vide si l'entrée est vide
      } else {
        return this.cvService.getByName(name);
      }
    }),
  );
}

/*
  search(){
    let name=this.input;
    
    name=name.trim();
    console.log(name);
    if(name.length){
      this.cvService.getByName(name).subscribe(
        (cvs)=>{
          console.log(cvs);
          this.searchList=cvs;
        }
      )
    }
    else{
      this.searchList=[]
    }

  }
*/




  onSelectCv(cv:Cv) {
    const link=['cv',cv.id]
    
   this.searchControl.setValue('');
   this.router.navigate(link);
  }
  
}
