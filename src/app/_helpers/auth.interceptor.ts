import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthenticationService } from '../_services/authentication.service';

const TOKEN_HEADER_KEY='Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   let authReq=req;
  //   const token=this.token.getToken();
  //   if(token!=null){
  //     authReq=req.clone({headers:req.headers.set(TOKEN_HEADER_KEY,'Bearer '+token)});
  //   }
  //   return next.handle(authReq);
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const user = this.authenticationService.userValue;
    console.log(user);
    console.log(user?.token);
   // const isLoggedIn = user && user.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (this.authenticationService.checkIfLogged() && isApiUrl) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${user?.token}`
            }
        });
    }

    return next.handle(request);
}
}

// export const authInterceptorProviders=[
//   {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
// ];
