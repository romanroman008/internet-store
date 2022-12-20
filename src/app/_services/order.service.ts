import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { OrderModel } from '../order/order-prep/OrderModel';
import { ProductModel } from '../product/ProductModel';
import { AuthenticationService } from './authentication.service';
import { ProductService } from './product.service';


const API=environment.apiUrl+"order/";
const httpOptions={
  headers:new HttpHeaders().append('Access-Control-Allow-Origin', '*').append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method")
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private feedbackProducts:Array<ProductModel>=[];
  private feedbackProductObs=new BehaviorSubject<Array<ProductModel>>(this.feedbackProducts);

  private cartProductsList: Array<ProductModel>=[];
  private cartProductListObs=new BehaviorSubject<Array<ProductModel>>(this.cartProductsList);


  constructor(
    private http:HttpClient,
    private router:Router,
    private authenticationService:AuthenticationService,
    private productService:ProductService
  ) {
    this.productService
    .getCartProducts()
    .subscribe((cartProducts:Array<ProductModel>)=>
    {
      this.cartProductsList=cartProducts;
    });
    
   }


   

  getFeedbackProducts():Observable<Array<ProductModel>>{
   return this.feedbackProductObs.asObservable();
   }

   checkOrder():any{                   //check if there is required amount of products in storage
    console.log(this.cartProductsList)
   this.http.post<OrderModel>(API+'check',
    { date:new Date(),
      productList:this.cartProductsList,
      jwt:this.authenticationService.userValue?.token
    })
    .subscribe(feedbackOrder=>{
      this.feedbackProducts=feedbackOrder.productList;
      this.feedbackProductObs.next(this.feedbackProducts);
      localStorage.setItem("feedback",JSON.stringify(feedbackOrder.productList));
      this.productService.clearCart();
    })
  }

addOrder(){                            //add new order from logged account
  this.http.post<any>(API+'addorder',
  { date:new Date(),
    productList:this.cartProductsList,
    jwt:this.authenticationService.userValue?.token
  },
  httpOptions)
  .subscribe((p)=>
  {
    console.log("It's not a trap")
    this.router.navigate(['products']);
  })
}

addOrderFromUnregisteredUser(user:any){          //add new order without registration
 return this.http.post<any>(API + 'addorderwithinfo',
  {
    firstName:user.firstName,
    lastName:user.lastName,
    birthday:new Date(),
    street:user.street,
    city:user.city,
    country:user.country,
    phone:user.phone,
    email:user.email,
    date:new Date(),
    productList:this.cartProductsList
  },
  httpOptions)
  .subscribe((p)=>
  {
    return p;
  })
}
   
}
