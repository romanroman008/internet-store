import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<any | null>;
  public user: Observable<any | null>;



  constructor(
    private http:HttpClient,
    ) {
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.user = this.userSubject.asObservable();
     }

     public get userValue() {
      return this.userSubject.value;
  }

  // authenticationService(username: String,password:String){
  //   return this.http.post(environment.apiUrl + "/registration/login",
  // { headers: {authorization:this.createBasicAuthToken(username,password)}})
  // .pipe(map((res)=>{
  //   // this.username=username;
  //   // this.password=password;
  //   this.registerSuccesfulLogin(username,password);
  // }));
  // }

  login(user:any) {
    return this.http.post<any>(environment.apiUrl + "registration/login", user)
        .pipe(map(returnedUser => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(returnedUser));
           // this.currentUserSubject.next(user);
            return returnedUser;
        }));
}

register(user: any) {
  return this.http.post(`${environment.apiUrl}/registration/register`, user);
}

  



 
}
