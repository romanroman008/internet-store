import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { OrderService } from 'src/app/_services/order.service';
import { ProductModel } from 'src/app/product/ProductModel';
import { User } from 'src/app/user/User';
import { environment } from 'src/environments/environment';

import { ProductService } from '../../_services/product.service';
import { OrderModel } from './OrderModel';


const API=environment.apiUrl+"order/";
const httpOptions={
  headers:new HttpHeaders().append('Access-Control-Allow-Origin', '*').append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method")
}

@Component({
  selector: 'app-order-prep',
  templateUrl: './order-prep.component.html',
  styleUrls: ['./order-prep.component.css']
})
export class OrderPrepComponent implements OnInit{

  
  productList:Array<any>=[];
  user:User|null;
  feedbackProducts:Array<ProductModel>=[];
  informationForm!:FormGroup;
  
  constructor(
    private router: Router,
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private productService:ProductService,
    private authenticationService:AuthenticationService,
    private orderService:OrderService
    ) {
    this.user=authenticationService.userValue;
    this.productService
    .getCartProducts()
    .subscribe((products: any[])=>{
    this.productList=products;
    })
    this.orderService
    .getFeedbackProducts()
    .subscribe((products:Array<ProductModel>)=>
    {
      this.feedbackProducts=products;
    });

 
    this.feedbackProducts =JSON.parse(localStorage.getItem("feedback")||'{}')
    this.totalCartProducts=this.productService.getTotalPrice();
    console.log(this.productService.getTotalPrice());
   }

  productsAviable:boolean=false;
  
  productsInStore:number | undefined;
  order:OrderModel | undefined;
  userDetails:any={};
  totalCartProducts!: number;
  



  emptyFields:boolean=false;
  successful:boolean=false;


  ngOnInit(): void {                                                  //input validation
    this.informationForm = this.formBuilder.group({
    firstName: ['', [Validators.required,Validators.pattern("[a-zA-Z]*")]],
    lastName: ['', [Validators.required,Validators.pattern("[a-zA-Z]*")]],
    date: ['', Validators.required],
    country: ['', [Validators.required,Validators.pattern("[a-zA-Z]*")]],
    street: ['',[ Validators.required,Validators.pattern("[a-zA-Z]*")]],
    houseNumber: ['',[ Validators.required,Validators.pattern("[0-9]*")]],
    flatNumber: ['',[ Validators.required,Validators.pattern("[0-9]*")]],
    code: ['', Validators.required],
    city: ['',[ Validators.required,Validators.pattern("[a-zA-Z]*")]],
    phone: ['', [Validators.required,Validators.pattern("[0-9]*")]],
    email: ['', [Validators.required,Validators.email]]
  });
  }


  sendInformations(){
    this.orderService.addOrderFromUnregisteredUser(this.informationForm.value);
    this.checkOrder();
  }

  checkOrder(){                               
    this.orderService.checkOrder();
    this.successful=true;
  }


sendOrder(){
  this.orderService.addOrder();
  this.productService.clearCart();
  this.router.navigate(['products']);
}

}

