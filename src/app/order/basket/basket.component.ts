import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../product/product.service';
import { ProductModel } from '../../product/ProductModel';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  products:Array<ProductModel>=[];
  //uniqueProducts:Array<ProductModel>=[]
  //totalPrice:number=0;
  constructor(private router:Router,private productService:ProductService) {
    this.productService.getProducts().subscribe((products:Array<ProductModel>)=>
    {
      this.products=products;
    });
   }
  productList:Array<ProductModel>=[];

  ngOnInit(): void {
  }
  deleteProduct(product:ProductModel){
    this.productService.remove(product);
  }

}
