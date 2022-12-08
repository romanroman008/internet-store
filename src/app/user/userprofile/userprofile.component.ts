import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

import { AuthenticationService } from '../../_services/authentication.service';

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
  invalidLogin = false;
  loginSuccess = false;
  user: any | null;
  


  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private http:HttpClient,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder) { 
      this.user=authenticationService.userValue;
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f(){return this.loginForm.controls;}

 

  login(){

    // this.submitted = true;

    // // reset alerts on submit
    // this.alertService.clear();

    // // stop here if form is invalid
    // if (this.form.invalid) {
    //     return;
    // }

    //this.loading = true;
    this.authenticationService.login(this.loginForm.value)
        .pipe(first())
        .subscribe({
            next: () => {
                // get return url from query parameters or default to home page
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
            },
            error: error => {
                // this.alertService.error(error);
                // this.loading = false;
            }
        });
  }
  goToRegistrationPage(){
    this.router.navigate(['/register']);
  }
}
