import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';

const routes:Routes=[
  {path:'',component:CheckoutComponent},
  {path:'success',component:CheckoutSuccessComponent}
]

@NgModule({
  declarations: [],
  imports: [
    //CommonModule
    //Routermodule for lazy loading
    RouterModule.forChild(routes)
  ],
  //exporting router module
  exports:[RouterModule]
})
export class CheckoutRoutingModule { }
