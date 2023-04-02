import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';

const routes:Routes=[
  {path:'',component:CheckoutComponent}
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
