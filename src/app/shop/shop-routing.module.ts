import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

//Lazy loading(adding routing in specific modules)
const routes:Routes=[
  {path:"", component:ShopComponent},
  //creating alias for ProductDetailsComponent to use in breadcrumb 
  {path:":id", component:ProductDetailsComponent,data:{breadcrumb:{alias:'productDetails'}}}
]

@NgModule({
  declarations: [],
  imports: [
    //no need of commomModule
    //CommonModule
    //adding routing module, using forchild as routes in this module is child routes
    RouterModule.forChild(routes)
  ],
  exports:[
    //exxporting child routing module
    RouterModule
  ]
})
export class ShopRoutingModule { }
