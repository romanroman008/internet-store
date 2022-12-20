import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ProductService } from 'src/app/_services/product.service';

import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../User';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  //model:any={}
  loginForm!: FormGroup;
  error=false;
  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin!:boolean;
  loginSuccess = false;
  user: User | null;
  cartIsEmpty:boolean;
  


  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private http:HttpClient,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private productService:ProductService
    ) { 
      this.user=authenticationService.userValue;
      this.cartIsEmpty=this.productService.checkIfCartIsEmpty();
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });


  }

  get f(){return this.loginForm.controls;}

  get username(){return this.loginForm.get('username');}
  get password(){return this.loginForm.get('password');}

  login(){

    // this.submitted = true;

    // // reset alerts on submit
    // this.alertService.clear();

    // // stop here if form is invalid
    // if (this.form.invalid) {
    //     return;
    // }

    this.loginForm.reset();
    

    //this.loading = true;
    this.authenticationService.login(this.loginForm.value)
        .pipe(first())
        .subscribe({
            next: () => {
             
                // get return url from query parameters or default to home page
               // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigate(['/products']);
                // console.log(localStorage.getItem("currentUser"))
                // console.log(this.user.login)
            },
            error: error => {
            
               this.invalidLogin=true;
              
            }
        });
  }
  goToRegistrationPage(){
    this.router.navigate(['/register']);
  }

  logout(){
    this.authenticationService.logout();
    window.location.reload();
  }

  goOn(){
    this.router.navigate(['orderprep'])
  }
}
