import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../_services/product.service';
import { ProductModel } from '../../product/ProductModel';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  products:Array<ProductModel>=[];
  
  constructor(
    private router:Router,
    private productService:ProductService
    ) {
    this.productService.getCartProducts().subscribe((products:Array<ProductModel>)=>
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
