import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

//route list goes in below array
const routes: Routes = [
  {path:"", component:HomeComponent},
  //below two paths are added in shop routing module as part of Lazy loading
  //{path:"shop", component:ShopComponent},
  //{path:"shop/:id", component:ProductDetailsComponent},
  //using shop routing module
  {path:'shop',loadChildren:()=>import('./shop/shop.module').then(m=>m.ShopModule)},
  //for route that doesn't exist
  {path:"**", redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
