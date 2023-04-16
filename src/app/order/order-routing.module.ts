import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

//Lazy loading(adding routing in specific modules)
const routes:Routes=[
  {path:"", component:OrdersComponent},
  //creating alias for ProductDetailsComponent to use in breadcrumb 
  {path:":id", component:OrderDetailComponent,data:{breadcrumb:{alias:'orderDetails'}}}
]


@NgModule({
  declarations: [],
  imports: [
   // CommonModule
   RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class OrderRoutingModule { }
