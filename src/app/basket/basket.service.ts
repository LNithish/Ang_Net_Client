import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';
import { DeliveryMethod } from '../shared/models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
baseUrl=environment.apiUrl;
//Creating behavioursubject observable of type Basket or null from rxjs
//null in the() is the initial value for when application is started
//components can subscribe and unsubscribe to this observable
//Components will be notified when the observable state changes and update template accordingly
private basketSource =new BehaviorSubject<Basket|null>(null);
basketSource$=this.basketSource.asObservable();

//New observable for basket total,Any coponent that disaplays this value can subscribe to it
private basketTotalSource =new BehaviorSubject<BasketTotals|null>(null);
basketTotalSource$=this.basketTotalSource.asObservable();

//adding property to calculate totals based on the shipping selected
shipping=0;

  constructor(private http:HttpClient) { }

  setShippingPrice(deliveryMethod:DeliveryMethod){
    this.shipping=deliveryMethod.price;
    this.calculateTotals();
  }

  getBasket(id:string)
  {
    return this.http.get<Basket>(this.baseUrl+'basket?id='+id).subscribe({
    //We will update the observale created above, and component will subscribe to them
      next:basket=>{
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }
  //updating / adding the basket
  setBasket(basket:Basket)
  {
    return this.http.post<Basket>(this.baseUrl+'basket',basket).subscribe({
      //updating observable
      next:basket=>{
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }
  getCurrentBasketValue()
  {
    //to get current basket value itself
    return this.basketSource.value;
  }

  //adding item to basket
  //item can be a product or basket item, quantity is set to 1 so it is optional
  addItemToBasket(item:Product|BasketItem,quantity=1){
    //const itemToAdd=this.mapProductItemToBasketItem(item);
    //Type Guard
    if(this.isProduct(item))item=this.mapProductItemToBasketItem(item);
    
    //below will return null also if basket doesn't exist, so creating if null using ??
    const basket=this.getCurrentBasketValue()??this.createBasket();
    //adding item to basket
    //basket.items=this.addOrUpdateItem(basket.items,itemToAdd,quantity);
    basket.items=this.addOrUpdateItem(basket.items,item,quantity);
    this.setBasket(basket);
  }
  private addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    //finding if the basket already have the item, if have just updating quatity
    const item=items.find(x=>x.id===itemToAdd.id);
    if(item) item.quantity+=quantity;
    else{
      //if basket is empty
      itemToAdd.quantity=quantity;
      items.push(itemToAdd);
    }
    return items;
  }
  private createBasket(): Basket {
    //new basket will have id generated from cuid
    const basket=new Basket();
    //using browser local storage to set basketId, that will allow user to get it when they come back later
    localStorage.setItem('basket_id',basket.id);
    return basket;
  }

  //Item remove function from Basket
  removeItemFromBasket(id:number,quantity=1){
    const basket=this.getCurrentBasketValue();
    //return nothing if basket is empty
    if(!basket) return;
    const item=basket.items.find(x=>x.id===id);
    if(item){
      item.quantity-=quantity;
      if(item.quantity===0){
        basket.items=basket.items.filter(x=>x.id!==id);
      }
      if(basket.items.length>0){
        this.setBasket(basket);
      }
      else{
        this.deleteBasket(basket);
      }
    }    
  }
  //delete basket
  deleteBasket(basket: Basket) {
    return this.http.delete(this.baseUrl+'basket?id='+basket.id).subscribe({
      next:()=>{
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      }
    })
  }

  //Mapping
  private mapProductItemToBasketItem(item:Product):BasketItem{
    return{
      id:item.id,
      productName:item.name,
      price:item.price,
      quantity:0,
      pictureUrl:item.pictureUrl,
      brand:item.productBrand,
      type:item.productType
    }
  }
  
//Calculating basket total
private calculateTotals() {
  const basket=this.getCurrentBasketValue();
  if(!basket) return;
  const subtotal=basket.items.reduce((a,b)=>(b.price*b.quantity)+a,0);
  const total=this.shipping+subtotal;
  this.basketTotalSource.next({shipping:this.shipping,total,subtotal});
}

//TypeGuard
//checking if item received is product or basketItem
private isProduct(item:Product|BasketItem):item is Product{
  return (item as Product).productBrand!==undefined;
}


//delete basket locally once order is created
deleteLocalBasket(){
  this.basketSource.next(null);
  this.basketTotalSource.next(null);
  localStorage.removeItem('basket_id');
}

}
