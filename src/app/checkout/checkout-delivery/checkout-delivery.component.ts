import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})

//implementing onInit interface to get the deliverymethod details during form initialization
export class CheckoutDeliveryComponent implements OnInit {

  @Input() checkoutForm?: FormGroup;
  deliveryMethods: DeliveryMethod[]=[];

  //injecting checkout service to get delivery methods
  //,adding basketservice to calculate total after selecting delivery method
  constructor(private checkoutService:CheckoutService,private basketService:BasketService){}

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: dm=>this.deliveryMethods=dm
    })
  }

  //update totals based on delivery type
  setShippingPrice(deliveryMethod:DeliveryMethod){
    this.basketService.setShippingPrice(deliveryMethod);
  }

}
