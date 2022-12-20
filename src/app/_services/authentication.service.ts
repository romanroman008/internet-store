import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../user/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User|null>;
  public user: Observable<User|null>;
  private isLoggedIn: boolean = false;



  constructor(
    private http:HttpClient,
    private router:Router
    ) {
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.user = this.userSubject.asObservable();
     }

     public get userValue() {
      return this.userSubject.value;
  }

  public checkIfLogged(){
    return this.isLoggedIn;
  }


  
  login(user:User) {
    return this.http.post<User>(environment.apiUrl + "authenticate", user)
        .pipe(map(returnedUser => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            
              localStorage.setItem('user', JSON.stringify(returnedUser));
              this.userSubject.next(returnedUser)
              console.log(returnedUser)
              console.log(localStorage.getItem('user'))
              this.isLoggedIn=true;
            return returnedUser;
           
        }));
}

register(user: User) {
  return this.http.post(`${environment.apiUrl}register`, user);
}



logout() {
  // remove user from local storage and set current user to null
  localStorage.removeItem('user');
  this.userSubject.next(null);
  this.router.navigate(['profile']);
  this.isLoggedIn=false;
}
  



 
}
