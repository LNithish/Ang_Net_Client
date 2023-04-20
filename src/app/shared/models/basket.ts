import * as cuid from "cuid"

export interface Basket {
    id: string
    items: BasketItem[]
    //To persist deliverymethod in checkout and for adding paymentIntent for payment
    clientSecret?:string;
    paymentIntentId?:string;
    deliveryMethodId?:number;
    //to persist Shipping price in basket adding a field
    shippingPrice:number;
  }
  
  export interface BasketItem {
    id: number
    productName: string
    price: number
    quantity: number
    pictureUrl: string
    brand: string
    type: string
  }
  
  //craeting a class for basket as the cleint need to add the basketID when the instance is created
  export class Basket implements Basket{
    id=cuid();
    items: BasketItem[]=[];
    shippingPrice=0;
  }

//Basket total interface
export interface BasketTotals{
  shipping:number;
  subtotal:number;
  total:number;
}