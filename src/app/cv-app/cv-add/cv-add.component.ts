import { Component, HostListener, OnInit } from '@angular/core';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cv } from '../models/cv';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-cv-add',
  templateUrl: './cv-add.component.html',
  styleUrls: ['./cv-add.component.css']
})
export class CvAddComponent implements OnInit {

  cv=new Cv();
  cvForm:FormGroup;
  id: number|undefined;
  
  constructor(private fb:FormBuilder, private cvService:CvService, private route:ActivatedRoute, private toaster:ToastrService, private router:Router) { 
   

    //if update
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    
    if (this.id) {
      this.cvService.getCv(this.id).subscribe((data) => {
        if (data) {
          this.cv = data;
          console.log(this.cv)
          // Mettez à jour le formulaire avec les données du CV récupérées
          this.updateForm();
        } else {
          this.cv = new Cv();
        }
      });
    }
    

    this.cvForm = new FormGroup({
      name: new FormControl(this.cv.name, Validators.required),
      firstname: new FormControl(this.cv.firstname, Validators.required),
      age: new FormControl(this.cv.age, [
        Validators.required,
        Validators.min(16),
      ]),
      path: new FormControl(this.cv.path),
      job: new FormControl(this.cv.job),
      cin: new FormControl(this.cv.cin)
    });
  
  


  
  
  }
  private updateForm() {
    // Mettez à jour le formulaire avec les données du CV
    this.cvForm.setValue({
      name: this.cv.name,
      firstname: this.cv.firstname,
      age: this.cv.age,
      path: this.cv.path,
      job: this.cv.job,
      cin: this.cv.cin,
    });
  }

 


  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.id)
    
    if (this.id != undefined)
    { 
      console.log("modification")

      const cv=new Cv(this.id,this.cvForm.value.firstname,this.cvForm.value.name,this.cvForm.value.path,this.cvForm.value.cin,this.cvForm.value.age,this.cvForm.value.job)
      console.log(this.cvForm.value)
    
      this.cvService.updateCv(cv).subscribe({
      next: () => {
        this.toaster.success("Cv modifié avec succès")
        this.router.navigate(['cv', this.id]);
      },
      error: (err) => {
        this.toaster.error(`Erreur - ${err.status} ${err.statusText}`);
        return of(null);
      },
    });  
  } 
  else this.cvService.addCv(this.cvForm.value).subscribe({
      next: () => {
        this.toaster.success("Cv ajouté avec succès")
        this.cvForm.reset();
      },
      error: (err) => {
        this.toaster.error(`Erreur - ${err.status} ${err.statusText}`);
        return of(null);
      },
    });;
  }
  @HostListener("window:beforeunload")
  canDeactivate(){
    if (this.cvForm.dirty){
      window.confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

}
