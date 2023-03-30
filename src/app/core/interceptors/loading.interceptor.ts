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
    this.busyService.busy();
    //using pipe to utilize rxjs operator
    return next.handle(request).pipe(
      delay(1000),
      //executes finally once the API request is completed
      finalize(()=>this.busyService.idle())
    );    
  }
}
