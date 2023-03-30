import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
busyRequestCount=0;
//injjecting ngx-spinner service
  constructor(private spinnerServivce:NgxSpinnerService) {  }
  //starts the spinner
  busy(){
    this.busyRequestCount++;
    //We have mentioned spinner name as undefined
    this.spinnerServivce.show(undefined,{
      type:'timer',
      bdColor:'rgba(255,255,255,0.7)',
      color:'#333333'
    });
  }
  //stops the spinner
  idle()
  {
    this.busyRequestCount--;
    if(this.busyRequestCount<=0)
    {
      this.busyRequestCount=0;
      this.spinnerServivce.hide();
    }
  }
}
