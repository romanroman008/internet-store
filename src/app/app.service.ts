import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private router:Router) {
   }

   home(){
     this.router.navigate([''])
   }
   products(){
     this.router.navigate(['products'])
   }

   contact(){
    this.router.navigate(['contact'])
   }
}
