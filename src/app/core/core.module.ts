import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  //declaring nav-bar as a part of core module
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    //adding routing as it is required for routerLink
    RouterModule
  ],
  //we need to export components in order to use it in another module
  exports:[
    NavBarComponent
  ]
})
export class CoreModule { }
