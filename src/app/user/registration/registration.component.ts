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
  registrationError!:boolean;

  
  constructor(
    private formBuilder:FormBuilder,
    private authenticationService:AuthenticationService,
    private router: Router,
    private http:HttpClient
    ) { }
  
  

  


  successful:boolean=false;


  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
        login: ['',Validators.required],
        password: ['', Validators.required],
        firstName: ['', [Validators.required,Validators.pattern("[a-zA-Z]*"),Validators.minLength(2)]],
        lastName: ['', [Validators.required,Validators.pattern("[a-zA-Z]*"),Validators.minLength(2)]],
        birthday: ['', Validators.required],
        country: ['', [Validators.required,Validators.pattern("[a-zA-Z]*"),Validators.minLength(3)]],
        street: ['',[ Validators.required,Validators.pattern("[a-zA-Z]*"),Validators.minLength(3)]],
        houseNumber: ['',[ Validators.required,Validators.pattern("[0-9]*")]],
        flatNumber: ['',[ Validators.required,Validators.pattern("[0-9]*")]],
        code: ['', Validators.required],
        city: ['',[ Validators.required,Validators.pattern("[a-zA-Z]*"),Validators.minLength(2)]],
        phone: ['', [Validators.required,Validators.pattern("[0-9]*"),Validators.maxLength(12)]],
        email: ['', [Validators.required,Validators.email]]
    });
}



get f() { return this.registrationForm.controls; }

 
  go(){
    this.router.navigate(['products']);
  }
  confirm(){
    this.successful=true;
  }
  sendRegistrationForm(){
    
    this.authenticationService.register(this.registrationForm.value)
        .pipe(first())
        .subscribe({
            next: () => {

      this.registrationError=false;
      this.successful=true;
     
            },
            error: error => {
              this.registrationError=true;
              this.successful=false;
              this.registrationForm.reset();
              
            }
        });
}

}
