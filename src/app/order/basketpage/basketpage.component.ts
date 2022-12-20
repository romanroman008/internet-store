import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { OrderService } from 'src/app/_services/order.service';
import { User } from 'src/app/user/User';

import { ProductService } from '../../_services/product.service';
import { ProductModel } from '../../product/ProductModel';

@Component({
  selector: 'app-basketpage',
  templateUrl: './basketpage.component.html',
  styleUrls: ['./basketpage.component.css']
})
export class BasketpageComponent implements OnInit {

  user: User | null;
  products:Array<ProductModel>=[];
  constructor(
    private router:Router,
    private productService:ProductService,
    private authenticationService:AuthenticationService,
    private orderService:OrderService
    ){
    this.user=authenticationService.userValue;
    this.productService.getCartProducts().subscribe((products:Array<ProductModel>)=>
    {
      this.products=products;
    });
   
   }

  ngOnInit(): void {
  }
  removeProduct(product:ProductModel){
    this.productService.remove(product);
  }
  add(product:ProductModel){
    this.productService.addProduct(product);
  }
  deleteProduct(product:ProductModel){
    this.productService.delete(product);
  }

  goOn(){
    if(this.user!==null){                       //go to order preparation if user is logged in
      this.orderService.checkOrder();
      this.router.navigate(['orderprep'])
    }
    if(this.user==null)                   //go to registration page if user is not logged in
    this.router.navigate(['profile'])
    

  }
  continueShopping(){                        //go to product list page
    this.router.navigate(['products']);
  }

}
