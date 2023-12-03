import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { User } from '../models/user';
import { loginDto } from '../models/loginDto';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {


  private apiUrl = 'https://apilb.tridevs.net/api/Users/login';
 /*

  constructor( private http :HttpClient) { }

  login(credentials:any)
  {
    return this.http.post(this.apiUrl,credentials)
  }

  logout(){
   localStorage.removeItem('token');

  }

  isLogged(){
    return !! localStorage.getItem('token')
  }
*/



isLoggedIn$ : Observable<boolean> 
user = new BehaviorSubject<User | null>(null);
isLoggedOut$ :Observable<boolean>

constructor(private http:HttpClient,private toaster:ToastrService,private router:Router){
  const user = localStorage.getItem('user');

  this.isLoggedIn$ = this.user.pipe(
    map((user)=> !!user)
  )

  this.isLoggedOut$ = this.user.pipe(
    map((user)=> ! user)
  )

  if (user) {
    this.loginUser(JSON.parse(JSON.stringify(user)));
  } else {
    this.logout();
  }
}

loginUser(user: User) {
  this.user.next(user);
}

login(dto: loginDto) {
  return this.http.post<Response>(this.apiUrl, dto).pipe(
      tap((res) =>{
        const user = {
          email: dto.email,
          id: res.userId,
          token: res.id
        };
        const token = res.id;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.loginUser(user);   
      }),
    )
}

logout() {
  localStorage.removeItem("user");
  localStorage.removeItem('token');
  this.user.next(null);
}







}
