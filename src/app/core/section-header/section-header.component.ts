import { Component } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent {

  //creating public service to access inside the template, use below to get the title for breadcrumb
  constructor(public bcService:BreadcrumbService){
    
  }
}
