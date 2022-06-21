import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { BasketpageComponent } from './basketpage/basketpage.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { OrderPrepComponent } from './order-prep/order-prep.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { UseprofileextraComponent } from './useprofileextra/useprofileextra.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {path:'',component:MainpageComponent},
  {path:'products',component:ProductsComponent},
  {path:'profile',component:UserprofileComponent},
  {path:'register',component:RegisterComponent},
  {path:'basketpage',component:BasketpageComponent},
  {path:'orderprep',component:OrderPrepComponent},
  {path:'extrauser',component:UseprofileextraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
