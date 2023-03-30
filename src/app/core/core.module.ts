import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  //declaring nav-bar as a part of core module
  declarations: [
    NavBarComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SectionHeaderComponent
  ],
  imports: [
    CommonModule,
    //adding routing as it is required for routerLink
    RouterModule,
    //adding toastr module for notification,using global configuration forroot
    ToastrModule.forRoot({
      //position where notification to be displayed
      positionClass:'toast-bottom-center',
      //to avoid multiple notification for more than one error
      preventDuplicates:true
    }),
    //importing breadcrumb module to use it in sectionHeader component
    BreadcrumbModule,
    //importing ngx-spinner module
    NgxSpinnerModule
  ],
  //we need to export components in order to use it in another module
  exports:[
    NavBarComponent,
    SectionHeaderComponent,
    //exporting ngxspinner module as it will be used in app module
    NgxSpinnerModule
  ]
})
export class CoreModule { }
