import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiniWordComponent } from './mini-word/mini-word.component';
import { RainbowDirective } from './directives/rainbow.directive';
import { CvListComponent } from './cv-app/cv-list/cv-list.component';
import { CvItemComponent } from './cv-app/cv-item/cv-item.component';
import { DefaultImagePipe } from './cv-app/pipes/default-image.pipe';
import { CvDetailComponent } from './cv-app/cv-detail/cv-detail.component';
import { CvComponent } from './cv-app/cv/cv.component';
import { EmbaucheListComponent } from './cv-app/embauche-list/embauche-list.component';
import { ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CvInfoComponent } from './cv-app/cv-info/cv-info.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthFormComponent } from './cv-app/auth-form/auth-form.component';
import { CvSearchComponent } from './cv-app/cv-search/cv-search.component';
import { ObservableRxjsComponent } from './observable-rxjs/observable-rxjs.component';
import { ProductComponent } from './product-app/product/product.component';
import { ProductItemComponent } from './product-app/product-item/product-item.component';
import { MasterDetailsComponent } from './cv-app/master-details/master-details.component';
import { CvAddComponent } from './cv-app/cv-add/cv-add.component';
import { AuthInterceptor, AuthInterceptorProvider } from './cv-app/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MiniWordComponent,
    RainbowDirective,
    CvListComponent,
    CvItemComponent,
    DefaultImagePipe,
    CvDetailComponent,
    CvComponent,
    EmbaucheListComponent,
    CvInfoComponent,
    AuthFormComponent,
    CvSearchComponent,
    ObservableRxjsComponent,
    ProductComponent,
    ProductItemComponent,
    MasterDetailsComponent,
    CvAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  
    
    
    ToastrModule.forRoot()
  ],
  providers: [ 

    AuthInterceptorProvider
    

    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
