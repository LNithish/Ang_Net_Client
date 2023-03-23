import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';



@NgModule({
  //declaring shopcomponent as a part of core module
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    //importing shared module for pagination
    SharedModule,
    //adding routing module for routerlink
    //RouterModule
    //replacing routing module with ShopRoutingModule as part of lazy loading
    ShopRoutingModule
  ],
  //we need to export components in order to use it in another module
  exports:[
    ShopComponent
  ]
})
export class ShopModule { }
