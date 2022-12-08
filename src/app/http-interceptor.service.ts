import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthenticationService } from './_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authenticationService:AuthenticationService) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if(this.authenticationService.isUserLoggedIn()&& req.url.indexOf('basicauth') === -1) {
//       const authReq = req.clone({
//           headers: new HttpHeaders({
//               'Content-Type': 'application/json',
//               'Authorization': `Basic ${window.btoa(this.authenticationService.username + ":" + this.authenticationService.password)}`
//           })
//       });
//       return next.handle(authReq);
//   } else {
//       return next.handle(req);
//   }
// }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // add auth header with jwt if user is logged in and request is to the api url
  const user = this.authenticationService.userValue;
  const isLoggedIn = user && user.token;
  const isApiUrl = request.url.startsWith(environment.apiUrl);
  if (isLoggedIn && isApiUrl) {
      request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${user.token}`
          }
      });
  }

  return next.handle(request);
}
}
