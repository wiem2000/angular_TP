import { Component } from '@angular/core';
import { AuthentificationService } from './cv-app/services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tp1';

  constructor(public authentificationService: AuthentificationService, private router:Router){

    }

    logout(){
      this.authentificationService.logout()
    
      const path=['auth'];
      this.router.navigate(path);
      
    }


}
