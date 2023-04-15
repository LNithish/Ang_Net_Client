import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { BasketItem } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  constructor(public basketService:BasketService){}
  //add or remove quantity from the basket
  //the values are coming from basket-summary shared component
  increamentQuantity(item:BasketItem){
    this.basketService.addItemToBasket(item);
  }
  //to handle the event emitted from basket-summary component
  //removeItem(id:number,quantity:number)
  removeItem(event:{id:number,quantity:number})
  {
    this.basketService.removeItemFromBasket(event.id,event.quantity);
  }
}
