import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductService } from '../products/product.service';
import { ProductModel } from '../products/ProductModel';
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
export class OrderPrepComponent implements OnInit {

  model:any={}
  productList:Array<any>=[];
  constructor(private router: Router ,private http:HttpClient,private productService:ProductService) {
    this.productService.getProducts().subscribe((products)=>{
      this.productList=products;
    })
   }

  productsAviable:boolean=false;
  feedbackProducts:Array<ProductModel>=[];
  productsInStore:number | undefined;
  order:OrderModel | undefined;
  userDetails:any={};
  

  loginError:string='red';
  passwordError:boolean=false;
  notMatched:boolean=false;
  nameError:boolean=false;
  surnameError:boolean=false;
  dateError:boolean=false;
  streetError:boolean=false;
  codeError:boolean=false;
  cityError:boolean=false;
  countryError:boolean=false;
  phoneError:boolean=false;
  emailError:boolean=false;

  emptyFields:boolean=false;
  successful:boolean=false;


  ngOnInit(): void {
  }

  checkFields(){
    let allFields:Array<string>=[
      this.model.firstName,
      this.model.lastName,
      this.model.date,
      this.model.street,
      this.model.code,
      this.model.city,
      this.model.country,
      this.model.phone,
      this.model.email
    ]
    // allFields.forEach(e => {
    //   if(e.)
    //   return false;
    // })
    // return true;
    if(this.model.firstName==''){
      this.emptyFields=true;
    }
    console.log(this.model.firstName);

  }

  red='red';

  go(){
    this.router.navigate(['products']);
  }
  confirm(){
    this.successful=true;
  }

  checkOrder(){
    this.checkFields();
  //if(!this.emptyFields){
    this.http.post<any>(API +"adddetails",
    {
      firstName:this.model.firstName,
      lastName:this.model.lastName,
      birthday:this.model.date,
      street:this.model.street,
      code:this.model.code,
      city:this.model.city,
      country:this.model.country,
      phone:this.model.phone,
      email:this.model.email
    },
    httpOptions
    ).subscribe(
      response=>{
        if(response){
          this.userDetails=response;
          console.log(response);
         // this.userDetails.birthday=new Date(response.birthday.prototype.getYear())
          this.successful=true;
        }
      }
    )

    this.http.post<OrderModel>(API + "check",
    
    {
      
      date:new Date(),
      productList:this.productList,
      ownerEmail:this.model.email

    },httpOptions
    ).subscribe(
      response=>{
        if(response){
          this.order=response;
         
          console.log(this.order);
          console.log(this.order.productList);
          console.log(this.productList);
          this.feedbackProducts=response.productList;
          console.log(response.productList);
        }
       
      },error=>{
        console.log(error);
      }
    )
  //}
}

}
