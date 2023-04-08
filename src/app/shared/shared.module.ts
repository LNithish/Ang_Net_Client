import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//adding pagination module from NGX bootstrap in shared module
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './text-input/text-input.component';

@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    TextInputComponent
  ],
  imports: [
    CommonModule,
    //reason for forRoot is paginationmodule is loaded as a singleton
    //so the same instance will be used throughout the application, angular will not create second instance
    PaginationModule.forRoot(),
    //adding Carousel modul for image slider for home page
    CarouselModule.forRoot(),
    //adding reactive form module in shared module so that it will be accessible in account module when lazy loaded
    //if we add it in app module during lazy loading it will be not accessibl in account module
    ReactiveFormsModule,
    //adding dropdowwn module in shared module, it will be used in navbar
    BsDropdownModule.forRoot()
  ],
  //we need to export the shared paginationmodule in order to use it in another module
  exports:[
    PaginationModule,
    //we have to export paging-header,pager component in order to use it in other modules
    PagingHeaderComponent,
    PagerComponent,
    //exporting carousel module to use in home component
    CarouselModule,
    //exporting order-total module to use in basket and order summary page
    OrderTotalsComponent,
    //exporting reactive form module to use in account module
    ReactiveFormsModule,
    //exporting dropdown module to use in nav bar
    BsDropdownModule,
    //exporting text-input component to use in login form validation
    TextInputComponent
  ]
})
export class SharedModule { }
