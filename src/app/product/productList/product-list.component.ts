import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { ProductService } from '../../_services/product.service';
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
  constructor(
    private http: HttpClient,
    private router:Router,
    private productService: ProductService
    ) {
    this.productService
    .getProducts()
    .subscribe((products:Array<ProductModel>)=>
    {
      this.productList=products;
    });
      
   }
 
   addProduct(product:ProductModel){
     this.productService.addProduct(product);
   }

}
