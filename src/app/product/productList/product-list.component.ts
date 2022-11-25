import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { ProductService } from '../product.service';
import { ProductModel } from '../ProductModel';

const API=environment.apiUrl+"product/";
const httpOptions={
  headers:new HttpHeaders().append('Access-Control-Allow-Origin', '*').append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method")
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

 
  productList:Array<ProductModel>=[];
  constructor(private http: HttpClient,private router:Router,private productService: ProductService) {
    // this.productList=[
    //   {name:"Beef jerky - papryka",price:29.99,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",amount:1},
    //   {name:"Beef jerky - czosnek",price:29.99,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",amount:1},
    //   {name:"Beef jerky - sweet-chilli",price:29.99,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",amount:1},
    //   {name:"Beef jerky - honey",price:29.99,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",amount:1},
    //   {name:"Beef jerky - orginal",price:29.99,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",amount:1},
    //   {name:"Beef jerky - sweet-spicy",price:29.99,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",amount:1},
    //   {name:"Beef jerky - spicy",price:29.99,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",amount:1}
    
    // ]
    this.getALLProducts();
   }
 
   addProduct(product:ProductModel){
     this.productService.addProduct(product);
   }

   getALLProducts(){
     this.http.get<Array<ProductModel>>("http://localhost:8081/product/getallproducts",httpOptions)
     .subscribe((products)=>{
      console.log(products);
       this.productList=products;
     })
   }

}
