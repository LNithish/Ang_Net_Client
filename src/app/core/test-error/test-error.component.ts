import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent {
baseurl=environment.apiUrl;
validationError:string[]=[];
constructor(private http:HttpClient){}
//404 error
get404Error()
{
  this.http.get(this.baseurl+'product/42').subscribe({
    next:response=>console.log(response),
    error: error=>console.log(error)
  })
}
//invalid request
get500Error()
{
  this.http.get(this.baseurl+'buggy/servererror').subscribe({
    next:response=>console.log(response),
    error: error=>console.log(error)
  })
}
//badrequest
get400Error()
{
  this.http.get(this.baseurl+'buggy/badrequest').subscribe({
    next:response=>console.log(response),
    error: error=>console.log(error)
  })
}
//fortytwo is not a valid productID
get400ValidationError()
{
  this.http.get(this.baseurl+'products/fortytwo').subscribe({
    next:response=>console.log(response),
    error: error=>{
      console.log(error);
      //adding validationerror details to display in error component
      this.validationError=error.errors;
    }
  })
}
}
