import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../products/product.service';
import { ProductModel } from '../products/ProductModel';

@Component({
  selector: 'app-basketpage',
  templateUrl: './basketpage.component.html',
  styleUrls: ['./basketpage.component.css']
})
export class BasketpageComponent implements OnInit {

  products:Array<ProductModel>=[];
  constructor(private router:Router,private productService:ProductService) {
    this.productService.getProducts().subscribe((products:Array<ProductModel>)=>
    {
      this.products=products;
      // this.products= [{name:"Beef jerky - papryka",price:29.99,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",amount:1},
      // {name:"Beef jerky - czosnek",price:29.99,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",amount:1},
      // {name:"Beef jerky - sweet-chilli",price:29.99,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",amount:1},
      // {name:"Beef jerky - honey",price:29.99,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",amount:3},
      // {name:"Beef jerky - orginal",price:29.99,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",amount:1},
      // {name:"Beef jerky - sweet-spicy",price:29.99,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",amount:5},
      // {name:"Beef jerky - spicy",price:29.99,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",amount:1}]
    
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
    this.router.navigate(['extrauser']);
  }
  continueShopping(){
    this.router.navigate(['products']);
  }

}
