import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/shared/models/basket';
import { Address } from 'src/app/shared/models/user';
import { OrderToCreate } from 'src/app/shared/models/order';
import { NavigationExtras, Router } from '@angular/router';
import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit{

  @Input() checkoutForm?:FormGroup;
  //accessing template referrenc variable
  @ViewChild('cardNumber') cardNumberElement?:ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?:ElementRef;
  @ViewChild('cardCvc') cardCvcElement?:ElementRef;
  //stripe property
  stripe:Stripe|null=null;
  cardNumber?:StripeCardNumberElement;
  cardExpiry?:StripeCardExpiryElement;
  cardCvc?:StripeCardCvcElement;
  cardErrors:any;
  //card details completion status check property for submit button
  cardNumberComplete=false;
  cardExpiryComplete=false;
  cardCvcComplete=false;

  //loading property for order submit
  loading=false;

  constructor(private basketService:BasketService,private toastr:ToastrService
    , private checkoutService:CheckoutService, private router:Router){}

  ngOnInit(): void {
    //loadStripe method from Stripe JS, It returns promise
    loadStripe("pk_test_51MxWXgSDg0vFk7nhe5C6BrRwsHgPIp44KZOPLOUeOwAkf2yOf9zLyRpDTMh7AnmKNHZOgAEEd61hggwle7ZHwqRR00E02hvhVp")
    .then(stripe=>{
      this.stripe=stripe;
      const elements=stripe?.elements();
      if(elements){
        this.cardNumber=elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement?.nativeElement);
        //error message based on change event
        this.cardNumber.on('change',event=>{
          this.cardNumberComplete=event.complete;
          if (event.error)this.cardErrors=event.error.message;
          //else condition is to clear the errors once the card value is corrected
          else this.cardErrors=null;
        })
        this.cardExpiry=elements.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
        //error message based on change event
        this.cardExpiry.on('change',event=>{
          this.cardExpiryComplete=event.complete;
          if(event.error)this.cardErrors=event.error.message;
          //else condition is to clear the errors once the card value is corrected
          else this.cardErrors=null;
        })
        this.cardCvc=elements.create('cardCvc');
        this.cardCvc.mount(this.cardCvcElement?.nativeElement);
        //error message based on change event
        this.cardCvc.on('change',event=>{
          this.cardCvcComplete=event.complete;
          if(event.error)this.cardErrors=event.error.message;
          //else condition is to clear the errors once the card value is corrected
          else this.cardErrors=null;
        })
      }
    })
  }

  //async method
    async submitOrder(){
      this.loading=true;
      //get basket
      const basket=this.basketService.getCurrentBasketValue();
      if(!basket)throw new Error('Cannot get basket');
      //potential error code
      try {
        const createdOrder=await this.createOrder(basket);
        const paymentResult=await this.confirmPaymentWithStripe(basket);
        if(paymentResult.paymentIntent){
          this.basketService.deleteBasket(basket);
          const navigationExtras:NavigationExtras={state:createdOrder};
          this.router.navigate(['checkout/success'],navigationExtras);
        }
        else{
          this.toastr.error(paymentResult.error.message);
        }
      } catch (error:any) {
        console.log(error);
        this.toastr.error(error.message);
      }finally{
        this.loading=false;
      }
      // if(!basket) return;
      
      // if(!orderToCreate)return;
      // this.checkoutService.createOrder(orderToCreate).subscribe({
      //   next:order=>{
      //     this.toastr.success('Order Created Successfully');
      //     //utilizing stripe to confirm payment,passing client secret
      //     this.stripe?.confirmCardPayment(basket.clientSecret!,{
            
      //       payment_method:{
      //         //when we mention cardnumber stripe automatically gets expiry date and Cvc also
      //         card:this.cardNumber!,
      //         billing_details:{
      //           name:this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
      //         }
      //       }
      //       //using then because stripe returns promise
      //     }).then(result=>{
      //       console.log(result);
      //       if(result.paymentIntent){
      //         this.basketService.deleteLocalBasket();
      //         const navigationExtras:NavigationExtras={state:order};
      //         this.router.navigate(['checkout/success'],navigationExtras);
      //       }
      //       else{
      //         this.toastr.error(result.error.message);
      //       }
      //     })
      //   }
      // })
    }
    //using async to make sure below function will return a promise
  private async confirmPaymentWithStripe(basket: Basket | null) {
    if(!basket){
      throw new Error('Basket is null');
    }
    const result=this.stripe?.confirmCardPayment(basket.clientSecret!,{
            
      payment_method:{
        //when we mention cardnumber stripe automatically gets expiry date and Cvc also
        card:this.cardNumber!,
        billing_details:{
          name:this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
        }
      }
    });
    if(!result)
    {
      throw new Error('Problem attempting payment with stripe');
    }
    return result;
  }
    //by adding async the below function will return a promise using firstvaluefrom
  private async createOrder(basket: Basket | null) {
    if(!basket){
      throw new Error('Basket is null');
    }
    const orderToCreate =this.getOrderToCreate(basket);
    return firstValueFrom(this.checkoutService.createOrder(orderToCreate));
  }
  //below method will return OrderToCreate type value
    private getOrderToCreate(basket:Basket):OrderToCreate{
      //get deliverymethod
      const deliveryMethodId =this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
      //get shiptoaddress
      const shipToAddress = this.checkoutForm?.get('addressForm')?.value as Address
      if(!deliveryMethodId||!shipToAddress)throw new Error('Problem with basket');
      return{
        basketId:basket.id,
        deliveryMethodId:deliveryMethodId,
        shipToAddress:shipToAddress
      }
    }

    //to enable submit button based on form details completion using stripe validation
    get paymentFormComplete(){
      return this.checkoutForm?.get('paymentForm')?.valid
      &&this.cardNumberComplete
      &&this.cardExpiryComplete
      &&this.cardCvcComplete
    }
}
