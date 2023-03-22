import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss']
})
export class PagingHeaderComponent {
  //reading data from parent component to this child component
  //we've set the property optional to avoid angular giving error for undefined property due to strict mode
@Input() pageNumber?:number;
@Input() pageSize?:number;
@Input() totalCount?:number;
}
