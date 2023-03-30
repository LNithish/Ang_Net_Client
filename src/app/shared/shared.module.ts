import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//adding pagination module from NGX bootstrap in shared module
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent
  ],
  imports: [
    CommonModule,
    //reason for forRoot is paginationmodule is loaded as a singleton
    //so the same instance will be used throughout the application, angular will not create second instance
    PaginationModule.forRoot(),
    //adding Carousel modul for image slider for home page
    CarouselModule.forRoot()
  ],
  //we need to export the shared paginationmodule in order to use it in another module
  exports:[
    PaginationModule,
    //we have to export paging-header,pager component in order to use it in other modules
    PagingHeaderComponent,
    PagerComponent,
    //exporting carousel module to use in home component
    CarouselModule
  ]
})
export class SharedModule { }
