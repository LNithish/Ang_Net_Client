import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketItem } from '../models/basket';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent {


  constructor(public basketService:BasketService){}

  //output properties for Basket component methods
  @Output() addItem=new EventEmitter<BasketItem>();
  //we can only emit one object so putting id and number as a object
  @Output() removeItem=new EventEmitter<{id:number,quantity:number}>();
  //input property to identity if we are in basket or in review component
  @Input() isBasket=true;

  addBasketItem(item:BasketItem){
    this.addItem.emit(item);
  }
  removeBasketItem(id:number,quantity=1){
    this.removeItem.emit({id,quantity});
  }
}
