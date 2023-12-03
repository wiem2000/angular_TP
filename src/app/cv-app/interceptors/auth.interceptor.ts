import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthentificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const token = localStorage.getItem('token');
    console.log(request)
    console.log("token")
    console.log(token)
    if (token) {
      
      const cloneRequest = request.clone(
        {
        params: 
          new HttpParams().set('access_token',token)
        
      }
      
      );
      return next.handle(cloneRequest);
    }
    else{
      return next.handle(request);

    }
    
    
  }


}

export const AuthInterceptorProvider={
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi:true
}
