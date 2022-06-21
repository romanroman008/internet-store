import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ProductsComponent } from './products/products.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { BasketComponent } from './basket/basket.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { BasketpageComponent } from './basketpage/basketpage.component';
import { MatIconModule } from '@angular/material/icon';
import { OrderPrepComponent } from './order-prep/order-prep.component';

import { UseprofileextraComponent } from './useprofileextra/useprofileextra.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    ProductsComponent,
    UserprofileComponent,
    BasketComponent,
    RegisterComponent,
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
    MatIconModule
    
  ],
  providers: [AppService,authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
