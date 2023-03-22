import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  //declaring shopcomponent as a part of core module
  declarations: [
    ShopComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    //importing pagination module
    SharedModule
  ],
  //we need to export components in order to use it in another module
  exports:[
    ShopComponent
  ]
})
export class ShopModule { }
