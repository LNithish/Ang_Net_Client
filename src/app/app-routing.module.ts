import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

//route list goes in below array
const routes: Routes = [
  //adding data for breadcrumb
  {path:'', component:HomeComponent,data:{breadcrumb:'Home'}},
  {path:"test-error", component:TestErrorComponent},
  {path:"not-found",component:NotFoundComponent},
  {path:"server-error",component:ServerErrorComponent},
  //below two paths are added in shop routing module as part of Lazy loading
  //{path:"shop", component:ShopComponent},
  //{path:"shop/:id", component:ProductDetailsComponent},
  //using shop routing module
  {path:'shop',loadChildren:()=>import('./shop/shop.module').then(m=>m.ShopModule)},
  //Using basket routing module(Lazy loading)
  {path:'basket',loadChildren:()=>import('./basket/basket.module').then(m=>m.BasketModule)},
  //using checkout routing module
  {
  path:'checkout',
  //adding authguard to restrict only logged in users to access this page
  canActivate:[AuthGuard],
  loadChildren:()=>import('./checkout/checkout.module').then(m=>m.CheckoutModule)},
   //Using account routing module(Lazy loading)
   {path:'account',loadChildren:()=>import('./account/account.module').then(m=>m.AccountModule)},
   //using order routing module
  {path:'order',
  canActivate:[AuthGuard],
  loadChildren:()=>import('./order/order.module').then(m=>m.OrderModule)},
  //for route that doesn't exist
  {path:"**", redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
