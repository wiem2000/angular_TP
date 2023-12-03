import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loginDto } from '../models/loginDto';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authentificationSerrvice: AuthentificationService, private router: Router
    , private toastrService: ToastrService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

  }

  ngOnInit(): void {

  }

  isInvalid(field: string): boolean {
    const formControl = this.form.get(field);
    if (formControl)
      return formControl.invalid && (formControl.dirty || formControl.touched);
    else return false
  }


  showToastUnauthorized() {
    this.toastrService.error('Unauthorized !')
  }

  showToastAuthorized() {
    this.toastrService.success('Authorized !')
  }

  submitForm(credentials: any): void {

    if (this.form?.valid) {
      console.log(credentials)
      this.authentificationSerrvice.login(new loginDto(this.form.value.email, this.form.value.password)).subscribe(
        (response: any) => {
          this.router.navigate(['cv'])
          this.showToastAuthorized()
          console.log('Auth successful:', response);
        },
        (error) => {
          console.error('Auth failed:', error);
          this.showToastUnauthorized()
        }
      )

    }
  }

}
