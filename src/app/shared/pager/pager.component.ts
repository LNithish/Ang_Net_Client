import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
@Input() totalCount?: number;
@Input() pageSize?: number;
//to pass value to the parent component , we have to utilize output property
@Output() pageChanged = new EventEmitter<number>();
onPagerChanged(event:any)
{
  //emitting number of the page
  this.pageChanged.emit(event.page);
}
}
