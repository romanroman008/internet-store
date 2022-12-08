import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { HttpInterceptorService } from './http-interceptor.service';
import { MainpageComponent } from './mainpage/mainpage.component';
import { BasketComponent } from './order/basket/basket.component';
import { BasketpageComponent } from './order/basketpage/basketpage.component';
import { OrderPrepComponent } from './order/order-prep/order-prep.component';
import { ProductListComponent } from './product/productList/product-list.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UseprofileextraComponent } from './user/useprofileextra/useprofileextra.component';
import { UserprofileComponent } from './user/userprofile/userprofile.component';


@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    ProductListComponent,
    UserprofileComponent,
    BasketComponent,
    RegistrationComponent,
    BasketpageComponent,
    OrderPrepComponent, 
    UseprofileextraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule
    
  ],
  providers: [AppService,authInterceptorProviders,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:HttpInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
