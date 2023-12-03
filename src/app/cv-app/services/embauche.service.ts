import { Injectable } from '@angular/core';
import { Cv } from '../models/cv';

@Injectable({
  providedIn: 'root'
})
export class EmbaucheService {

  constructor() { }

  cvs: Cv[] = [];
  
  getCvs() {
    return this.cvs;
  }

  addCv(cv:Cv){
    this.cvs.push(cv) }

    existCv(cv: Cv): boolean {
      if ( this.cvs.length > 0) {
        return this.cvs.some(item => item === cv);
      }
      return false;
    }
}
