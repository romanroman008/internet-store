import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  model:any={}

  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
  }

  login(){
    let headers: HttpHeaders = new HttpHeaders().append('Access-Control-Allow-Origin', '*').append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method");
    let options = { headers: headers }

    this.http.post<Observable<Object>>(environment.apiUrl+"/registration/login",
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

  register(){
    this.router.navigate(['/register']);
  }
}
