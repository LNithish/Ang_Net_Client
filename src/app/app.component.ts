import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

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
  //Injecting basket service to get the basket data of user during app start
  //Injection account service to load current logged in user during root of the application
  constructor(private http:HttpClient,private basketService:BasketService
    ,private accountService:AccountService)
  {
  }
  ngOnInit(): void {
    //to observe an observable we have to subscribe to it
    //Specified observable type as Pagination<Product[]>, it is called type safety(benefits of typescript)
    //this.http.get<Pagination<Product[]>>("https://localhost:5001/api/products").subscribe({
      //items in response is coming from Pagination model
      //next:response=>this.products=response.items,//what to do next
      //error:error=>console.log(error),//what to do if there is an error
      //complete:()=>
      //{
        //open curly brackets to add multiple lines
        //console.log("Request completed"),
        //console.log("Code works perfectly")
     // }
    //})
    this.loadBasket();
    this.loadCurrentUser();
  }

  //Get Basket Data
  loadBasket(){
    const basketId=localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId);
    }
  }
  //loading currently logged in user
  loadCurrentUser(){
    const token=localStorage.getItem('token');
      this.accountService.loadCurrentUser(token).subscribe();
  }
}
