import { Component, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  //reading data from parent component to this child component
  //we've set the property optional to avoid angular giving error for undefined property due to strict mode
  @Input() product?:Product

  //Injecting basket service to add item to basket
constructor(private basketService:BasketService){ }

addItemToBasket(){
  if(this.product)this.basketService.addItemToBasket(this.product);
}

}
