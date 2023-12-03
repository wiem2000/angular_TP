import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiniWordComponent } from './mini-word/mini-word.component';


import { CvComponent } from './cv-app/cv/cv.component';
import { CvInfoComponent } from './cv-app/cv-info/cv-info.component';
import { AuthFormComponent } from './cv-app/auth-form/auth-form.component';
import { AppComponent } from './app.component';
import { ObservableRxjsComponent } from './observable-rxjs/observable-rxjs.component';
import { ProductComponent } from './product-app/product/product.component';
import { MasterDetailsComponent } from './cv-app/master-details/master-details.component';
import { CvResolver } from './cv-app/resolvers/cv.resolver';
import { CvInfoResolver } from './cv-app/resolvers/cv-info.resolver';
import { CvAddComponent } from './cv-app/cv-add/cv-add.component';
import { AuthGuard } from './cv-app/guards/auth.guard';
import { LoginGuard } from './cv-app/guards/login.guard';
import { UnsavedChangesGuard } from './cv-app/guards/unsaved-changes.guard';

const routes: Routes = [
  {path:'',redirectTo:'cv',pathMatch:'full'},
  
  {path:'word',component:MiniWordComponent},
  {path:'cv',component:CvComponent,resolve: { cvs: CvResolver }},
  
  { path:'cv/:id', component: CvInfoComponent ,resolve: { cv: CvInfoResolver }},
 
  { path:'auth', component: AuthFormComponent ,canActivate: [LoginGuard] },
  {
    path: 'rxjs', component: ObservableRxjsComponent,
  },

  {
    path: 'products',component: ProductComponent
  },

  {
    path: 'list',component: MasterDetailsComponent,
    children: [
      {
        path: ':id',
        component: CvInfoComponent,
        
      },
    ],
  },

  {
    path: 'cv-add',
    component: CvAddComponent,
    canDeactivate: [UnsavedChangesGuard],
    canActivate: [AuthGuard]
  },

  {
    path: 'cv-update/:id',
    component: CvAddComponent,
    canDeactivate: [UnsavedChangesGuard],
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
