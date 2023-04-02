import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
//below import will give error
//import { BreadcrumbService } from 'xng-breadcrumb/lib/breadcrumb.service';
import { ShopService } from '../shop.service';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
//implemeting onInit interface
export class ProductDetailsComponent implements OnInit{

  //due to strict mode using ? for optional parameter
  product?:Product
  //quantity to add into cart
  quantity=1;
  quantityInBasket=0;

  //constructor for service dependency injection and activated route for capturing route parameter,
  //breadcrumb service,basket service for updating cart quantity
  constructor(protected shopService:ShopService,private activatedRoute:ActivatedRoute
    ,private bcService:BreadcrumbService,private basketService:BasketService)
  { 
    //there is a issu where productID or previous product nam will be shown in the title
    //setting the initial value to avoid incorrect values in productname of breadcrumb title
    this.bcService.set('@productDetails',' ')
  }
  ngOnInit(): void {
    this.loadProduct()
  }
  loadProduct()
  {
    //to avoid null/string valus being passed,Captures id from route parameter
    const id=this.activatedRoute.snapshot.paramMap.get('id')
    
      //using + symbol to cast it as number      
    if(id)
    {
      this.shopService.getProduct(+id).subscribe({
        next:productdetail=>{
          this.product=productdetail,
          //breadcrumb alias setup from shop.routing module for 
          this.bcService.set('@productDetails',productdetail.name)
          //capturing quantity of product using basketservice
          //once we have one value from basketsource request completes and unsubscribe from it
          this.basketService.basketSource$.pipe(take(1)).subscribe({
            next:basket=>{
              const item=basket?.items.find(x=>x.id===+id);
              //updating quantity as per cart
              if(item){
                this.quantity=item.quantity;
                this.quantityInBasket=item.quantity;
              }
            }
          })
        },
        error:errordata=>console.log(errordata)
      })
    }
  }
  incrementQuantity(){
    this.quantity++;
  }
  decrementQuantity(){
    this.quantity--;
  }
  updateBasket(){
    if(this.product){
      if(this.quantity>this.quantityInBasket)
      {
        const itemsToAdd=this.quantity-this.quantityInBasket;
        this.quantityInBasket+=itemsToAdd;
        this.basketService.addItemToBasket(this.product,itemsToAdd);
      }
      else{
        const itemsToRemove=this.quantityInBasket-this.quantity;
        this.quantityInBasket-=itemsToRemove;
        this.basketService.removeItemFromBasket(this.product.id,itemsToRemove);
      }
    }   
  }

  //getter for text name on button based on item quantity in basket
  get buttonText()
  {
    return this.quantityInBasket===0?'Add to basket':'Update basket';
  }
}