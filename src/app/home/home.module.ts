import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    //importing shared module to use carousel for home
    SharedModule
  ],
  //exporting home component to use it in other module
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
