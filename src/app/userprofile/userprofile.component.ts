import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  model:any={}

  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;


  constructor(private route: ActivatedRoute, private router:Router,private http:HttpClient,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  login(){
    let headers: HttpHeaders = new HttpHeaders().append('Access-Control-Allow-Origin', '*').append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method");
    let options = { headers: headers }

    this.http.post<Observable<Object>>("http://localhost:8081/registration/login",
    {
      login:this.model.login,
      password:this.model.password
    },options
    ).subscribe(
      response=>{
        if(response){
          console.log(response)
        this.router.navigate(['products'])
        }
      },error=>{
        console.log(error);
      }
    )
  }

  // login(){
  //   this.authenticationService.authenticationService(this.model.username, this.model.password).subscribe((result)=> {
  //     this.invalidLogin = false;
  //     this.loginSuccess = true;
  //     this.successMessage = 'Login Successful.';
  //     this.router.navigate(['products']);
  //   }, () => {
  //     this.invalidLogin = true;
  //     this.loginSuccess = false;
  //   });      
  // }

  register(){
    this.router.navigate(['/register']);
  }
}
