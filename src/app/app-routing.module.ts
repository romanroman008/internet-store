import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainpageComponent } from './mainpage/mainpage.component';
import { BasketpageComponent } from './order/basketpage/basketpage.component';
import { OrderPrepComponent } from './order/order-prep/order-prep.component';
import { ProductListComponent } from './product/productList/product-list.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UseprofileextraComponent } from './user/useprofileextra/useprofileextra.component';
import { UserprofileComponent } from './user/userprofile/userprofile.component';

const routes: Routes = [
  {path:'',component:MainpageComponent},
  {path:'products',component:ProductListComponent},
  {path:'profile',component:UserprofileComponent},
  {path:'register',component:RegistrationComponent},
  {path:'basketpage',component:BasketpageComponent},
  {path:'orderprep',component:OrderPrepComponent},
  {path:'extrauser',component:UseprofileextraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
