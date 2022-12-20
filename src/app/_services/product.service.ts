import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ProductModel } from '../product/ProductModel';
import { AuthenticationService } from './authentication.service';


const API=environment.apiUrl+"product/";
const httpOptions={
  headers:new HttpHeaders().append('Access-Control-Allow-Origin', '*').append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method")
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartProductsList: Array<ProductModel>=[];
  cartProductListObs=new BehaviorSubject<Array<ProductModel>>(this.cartProductsList);

  productList: Array<ProductModel>=[];
  productListObs=new BehaviorSubject<Array<ProductModel>>(this.productList);
  totalPrice:number=0;
  totalProducts:number=0;
  
  //xD
  
  
  constructor(
    private http: HttpClient,
    private router:Router,
    private authenticationService:AuthenticationService) {
    this.getALLProductsFromDatabase();
   
   }

   checkIfCartIsEmpty(){         //check if cart is empty
    if(this.totalProducts==0)
      return true;
    return false;
    
   }

   addProduct(product:ProductModel){       //add product to shopping cart
     //get

     if(this.cartProductsList.some(p=>p.name==product.name)){
      this.cartProductsList.filter(p=>p.name==product.name).map(p=>{
         p.amount+=1;
       })
     }
     else{
       product.amount=1;
       this.cartProductsList.push(product);
     }
     this.totalProducts+=1;
     this.cartProductListObs.next(this.cartProductsList);
    
   }

   clearCart(){         //clear shopping cart
    this.totalProducts=0;
    this.cartProductsList.splice(0);
    this.cartProductListObs.next(this.cartProductsList);
   
   }

   remove(product:ProductModel){           //remove product from shopping cart
   
    if(this.totalProducts>0){
      this.cartProductsList.filter(p=>p.name==product.name).map(p=>p.amount-=1);
      this.cartProductsList=this.cartProductsList.filter(p=>p.amount>0);
      this.totalProducts-=1 
      this.cartProductListObs.next(this.cartProductsList);
    }
    if(this.totalProducts==0)
    window.location.reload();
 
  
  


  }
  delete(product:ProductModel){            //delete all products of one kind
    this.cartProductsList=this.cartProductsList.filter(p=>p.name!==product.name);
    this.totalProducts-=product.amount;
    this.cartProductListObs.next(this.cartProductsList);
  
  }

   getCartProducts(): Observable<Array<ProductModel>>{       //get all shopping cart products
     return this.cartProductListObs.asObservable();
   }

   getProducts(): Observable<Array<ProductModel>>{
    return this.productListObs.asObservable();
  }

   setTotal(total:number){          
     this.totalPrice=total;
   }
   getTotalPrice():number{              //get total price of products
     return this.totalPrice;
   }
   getTotalNumberOfProducts(){       //get total amount of products
     return this.totalProducts;
   }

   getALLProductsFromDatabase(){        //get products from database
    this.http.get<Array<ProductModel>>(API+"getallproducts",httpOptions)
    .subscribe((products)=>{
      this.productList=products;
      this.productListObs.next(this.productList);
    })
  }


}
