import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
//form validation
export class TextInputComponent implements ControlValueAccessor{
  
  //User input type
  @Input() type='text';
  @Input() label='';

  //when we inject something in controller, angular will reuse if that already exist,
  //to have unique service for our each input self decorator is used
  //w will be using controlDir inside our template
  constructor(@Self() public controlDir:NgControl){
    //assigning controlDir to its value accessor
    this.controlDir.valueAccessor=this;
  }

  //angular native form functionality will effectively pass through below functions,
  // and do the original functions on the text input we are using
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  //we cannot use controlDir in template as it is
  get control():FormControl {
    return this.controlDir.control as FormControl
  }
}
