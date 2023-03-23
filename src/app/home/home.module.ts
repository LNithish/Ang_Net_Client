import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule
  ],
  //xporting home component to use it in other module
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
