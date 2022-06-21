import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from './ProductModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: Array<ProductModel>=[];
  productListObs=new BehaviorSubject<Array<ProductModel>>(this.productList);
  totalPrice:number=0;
  totalProducts:number=0;
  constructor() {
    
   }

   addProduct(product:ProductModel){
     //get

     if(this.productList.some(p=>p.name==product.name)){
      this.productList.filter(p=>p.name==product.name).map(p=>{
         p.amount+=1;
       })
     }
     else{
       product.amount=1;
       this.productList.push(product);
     }
     this.totalProducts+=1;
     this.productListObs.next(this.productList);
    
   }

   remove(product:ProductModel){

  this.productList.filter(p=>p.name==product.name).map(p=>p.amount-=1);
  this.productList=this.productList.filter(p=>p.amount>0);
  this.totalProducts-=1 
  this.productListObs.next(this.productList);


  }
  delete(product:ProductModel){
    this.productList=this.productList.filter(p=>p.name!==product.name);
    this.totalProducts-=product.amount;
    this.productListObs.next(this.productList);
  }

   getProducts(): Observable<Array<ProductModel>>{
     return this.productListObs.asObservable();
   }

   setTotal(total:number){
     this.totalPrice=total;
   }
   getTotal():number{
     return this.totalPrice;
   }
   getTotalProducts(){
     return this.totalProducts;
   }
}
