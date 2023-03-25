import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  //injecting router to navigate to component based on error
  //injecting toastr service for error notification
  constructor(private router:Router,private toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //when we manage observable we use rxjs library
    //to use operator available in rxjs we use pipe method
    return next.handle(request).pipe(
      //catching error
      catchError((error:HttpErrorResponse)=>{
        if(error)
        {
          if(error.status===400)
          {
            //validation error, errors should match API error response
            if(error.error.errors)
            {
              this.toastr.error(error.error.errorMessage,error.status.toString())
              //bloww code lets display the error component details
              throw error.error;
            }
            else
            {
              //varaiable name errorMessage below should be match from API
            this.toastr.error(error.error.errorMessage,error.status.toString())
            }
          }
          if(error.status===401)
          {
            //varaiable name errorMessage below should be match from API
            this.toastr.error(error.error.message,error.status.toString())
          }
          if(error.status===404)
          {
            this.router.navigateByUrl('/not-found');
          }
          if(error.status===500)
          {
            //crating variable of navigationextras to pass the stacktrace details
            const navigationExtras:NavigationExtras={state:{error:error.error}}
            //passing navigationextras to server-error component
            this.router.navigateByUrl('/server-error',navigationExtras);
          }
        }
        return throwError(()=>new Error(error.message))
      })
    )
  }
}
