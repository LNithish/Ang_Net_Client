import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  //this interceptor is for passing the token to API for authorization
  token?:string;
  //injecting account service to access the replaySubject observable
  constructor(private accountService:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //once we have one of the currentUser observable, request is completed and it will unsubscribe
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next:userloggedin=>this.token=userloggedin?.token
    })
    if(this.token){
      //new version of the request with authorization header(token) will be sent
      request=request.clone({
        setHeaders:{
          Authorization:`Bearer ${this.token}`
        }
      })
    }
    return next.handle(request);
  }
}
