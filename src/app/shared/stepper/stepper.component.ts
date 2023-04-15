import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  //to get full functionality of CdkStepper, add the provider
  providers:[{provide:CdkStepper,useExisting:StepperComponent}]
})
//extending CdkStepper to use its functionality
export class StepperComponent extends CdkStepper implements OnInit{

//in linear mode each previous step has to be completed to go further
@Input() linearModeSelected=true;

ngOnInit(): void {
  this.linear=this.linearModeSelected;
}

onClick(index:number){
  //this.selectedIndex is a extended property from CdkStepper
  this.selectedIndex=index;
}
}
