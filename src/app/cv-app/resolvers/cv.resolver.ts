import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Cv } from '../models/cv';
import { CvService } from '../services/cv.service';

@Injectable({
  providedIn: 'root'
})


export class CvResolver implements Resolve<Observable<Cv[]>> {

  constructor(private cvService: CvService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cv[]> {
    return this.cvService.getCvs();
  }
}
