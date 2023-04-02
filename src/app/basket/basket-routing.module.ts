import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { RouterModule, Routes } from '@angular/router';


//Lazy loading(adding routing specific to this modules)
const routes:Routes=[
  {path:"", component:BasketComponent}
  //creating alias for ProductDetailsComponent to use in breadcrumb 
 // {path:":id", component:ProductDetailsComponent,data:{breadcrumb:{alias:'productDetails'}}}
]

@NgModule({
  declarations: [],
  imports: [
    //CommonModule,Bloww line is required in order to route properly
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class BasketRoutingModule { }
