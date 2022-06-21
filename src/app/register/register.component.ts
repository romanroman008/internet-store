import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model:any={}
  constructor(private router: Router ,private http:HttpClient) { }

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


  ngOnInit(): void {
  }

  red='red';
  check(){
     if(this.model.password1!==this.model.password2)
     {
       this.passwordError=true;
     }
     else{
       this.passwordError=false;
       this.successful=true;
     }
     
   
  }
  go(){
    this.router.navigate(['products']);
  }
  confirm(){
    this.successful=true;
  }

  sendRegister(){
    let headers: HttpHeaders = new HttpHeaders().append('Access-Control-Allow-Origin', '*').append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method");
    let options = { headers: headers }

    // this.http.post<Observable<Object>>(environment.apiUrl + "register",
    // {
    //   login:this.model.login,
    //   password:this.model.password1,
    //   firstName:this.model.firstName,
    //   surname:this.model.surname,
    //   date:this.model.date,
    //   street:this.model.street,
    //   code:this.model.code,
    //   city:this.model.city,
    //   country:this.model.country,
    //   phone:this.model.phone,
    //   email:this.model.email
    // },options
    // ).subscribe(
    //   response=>{
    //     if(response){
    //       this.router.navigate(['products'])
    //     }
    //     else{

    //     }
    //   },error=>{
    //     console.log(error);
    //   }
    // )
  }

}
