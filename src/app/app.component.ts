import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
//oninitialization hook is a lifecycle of angular, To use that we have to implement the class with OnInit
export class AppComponent implements OnInit{
  title = 'NKL';
  //when strict mode is enabled every property will give an error if it's vale not defined or initialized
  products:Product[]=[];
  constructor(private http:HttpClient)
  {
  }
  ngOnInit(): void {
    //to observe an observable we have to subscribe to it
    //Specified observable type as Pagination<Product[]>, it is called type safety(benefits of typescript)
    this.http.get<Pagination<Product[]>>("https://localhost:5001/api/products").subscribe({
      //items in response is coming from Pagination model
      next:response=>this.products=response.items,//what to do next
      error:error=>console.log(error),//what to do if there is an error
      complete:()=>
      {
        //open curly brackets to add multiple lines
        console.log("Request completed"),
        console.log("Code works perfectly")
      }
    })
  }
}
