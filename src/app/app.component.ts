import { Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorageService } from './_services/token-storage.service';
import { ProductService } from './product/product.service';
import { ProductModel } from './product/ProductModel';

// import { TokenStorageService } from './_services/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'meating-front';
  vis:boolean=false;
  cartClicked:boolean=false;
  mouseOverValue:boolean=false;
  totalPrice:number=0;
  total:number=0;

  private roles: string[] = [];
  isLoggedIn=false;
  username:string | undefined;
  showAdminBoard=false;

  constructor(private tokenStorageService:TokenStorageService,private router:Router,private productService:ProductService,private el:ElementRef,
    private renderer:Renderer2){
    this.productService.getProducts().subscribe((products:Array<ProductModel>)=>
    {
     this.totalPrice=products.reduce((sum,prod)=>{
      
       if(prod.amount){
        sum=sum+prod.price*prod.amount;
       }
       return sum;//dd
     },0)
     this.total=productService.getTotalProducts();
    });
  }

  ngOnInit():void{
    this.isLoggedIn=!!this.tokenStorageService.getToken();

    if(this.isLoggedIn){
      const user=this.tokenStorageService.getUser();
      this.roles=user.roles;
      
      this.showAdminBoard=this.roles.includes('ROLE_ADMIN');

      this.username=user.username;
    }
  }


  logout(){
    this.tokenStorageService.signOut();
    window.location.reload();
    }
  


  showBar(){
    const navbarLinks = document.getElementsByClassName('nav')[0];
    navbarLinks.classList.toggle('active');
  }
  home(){
    this.router.navigate([''])
  }
  products(){
    this.router.navigate(['products'])
  }
  profile(){
    this.router.navigate(['profile'])
  }
  basket(){
    this.router.navigate(['basketpage'])
  }
  
  toggle(){
    // this.vis=!this.vis;
    // this.cartClicked=!this.cartClicked;
    if(this.cartClicked){
      this.cartClicked=false;
    }
    else{
      this.cartClicked=true;
    }
  }
  mouseOut(){
    // if(this.cartClicked){
    // this.vis=true;
    // }
    // else{
    this.vis=false;
   // }
  }
  mouseOver(){
    this.mouseOverValue=true;
  }
  position(){
    // let pos=document.getElementById("tu")?.offsetTop;
    // let x=document.getElementById("tu")?.offsetHeight;
    // let y=document.getElementById("tu")?.offsetWidth;
    // let z=document.getElementById("tu")?.offsetLeft;
    // console.log(pos);
    // console.log(x);
    // console.log(y);
    // console.log(z);
    // let pos1=document.getElementById("ru")?.offsetTop;
    // console.log(pos1);

    //document.getElementById("carton")?.onfocus(this.mouseOver());
    let pos=document.getElementById("carton")?.offsetTop;
    let h=document.getElementById("carton")?.offsetHeight;
    let x=document.getElementById("carton")?.offsetLeft;
    let z=document.getElementById("carton")?.offsetWidth;
    let part=this.el.nativeElement.querySelector('.cartcontent');
    let p=part.offsetWidth;
    console.log(pos);
    console.log(h);
    console.log(x);
    console.log(z);
    console.log(p);
    
  }
   onMouseOver(){
    let part=this.el.nativeElement.querySelector('.cartcontent')
    this.renderer.setStyle(part,'display','block');
  }
   onMouseOut(){
    let part=this.el.nativeElement.querySelector('.cartcontent')
    console.log()
    this.renderer.setStyle(part,'display','none');
  }

 
}
