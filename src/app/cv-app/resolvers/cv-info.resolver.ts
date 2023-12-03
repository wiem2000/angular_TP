import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CvService } from '../services/cv.service';
import { Cv } from '../models/cv';

@Injectable({
  providedIn: 'root'
})
export class CvInfoResolver implements Resolve<Observable<Cv>> {

  constructor(private cvService: CvService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cv> {
   
    const id = route.params['id'];
    return this.cvService.getCvById(id);
  }
}
