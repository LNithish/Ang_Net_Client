import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { BusyService } from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  //adding the busy service to use the spinner
  constructor(private busyService:BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    //to avoid loading animation during async operation(Like checking email is in use while typing)
    // if(!request.url.includes('emailExists')){
    // this.busyService.busy();
    // }

    //To stop page loading during async email check and order creation
    if(
      request.url.includes('emailExists')||
      request.method==='POST'&&request.url.includes('orders')
    ){
      return next.handle(request);
    }
    //turning on spinner for other page loads
    this.busyService.busy();
    //using pipe to utilize rxjs operator
    return next.handle(request).pipe(
      delay(500),
      //executes finally once the API request is completed
      finalize(()=>this.busyService.idle())
    );    
  }
}
