import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm!:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private authenticationService:AuthenticationService,
    private router: Router,
    private http:HttpClient
    ) { }

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
  successful:boolean=false;


  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        login: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        date: ['', Validators.required],
        country: ['', Validators.required],
        street: ['', Validators.required],
        code: ['', Validators.required],
        city: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
    });
}

get f() { return this.registrationForm.controls; }

  red='red';
  // check(){
  //    if(this.model.password1!==this.model.password2)
  //    {
  //      this.passwordError=true;
  //    }
  //    else{
  //      this.passwordError=false;
  //      this.successful=true;
  //    }
     
   
  // }
  go(){
    this.router.navigate(['products']);
  }
  confirm(){
    this.successful=true;
  }
  sendRegistrationForm(){
   // this.submitted = true;

    // reset alerts on submit
   // this.alertService.clear();

    // stop here if form is invalid
    // if (this.form.invalid) {
    //   return;
  //}

    //this.loading = true;
    this.authenticationService.register(this.registrationForm.value)
        .pipe(first())
        .subscribe({
            next: () => {
             //  this.alertService.success('Registration successful', { keepAfterRouteChange: true });
      //          this.router.navigate(['../login'], { relativeTo: this.route });
            },
            error: error => {
    //            this.alertService.error(error);
      //          this.loading = false;
            }
        });
}

}
