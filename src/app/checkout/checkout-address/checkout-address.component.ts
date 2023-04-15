import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent {

  //formgroup will be received as a input from checkout component
  @Input() checkoutForm?: FormGroup;

  //injecting account service to update the address,adding toaster to give a notification for address update
  constructor(private as:AccountService,private toastr:ToastrService){}

  //update user address
  saveUserAddress(){
    this.as.updateUserAddress(this.checkoutForm?.get('addressForm')?.value).subscribe({
      next:()=>{
        this.toastr.success('Address saved');
        //resetting the address form after update, so that the save option will be disable after updating
        //it will be enabled once another changed were made
        this.checkoutForm?.get('addressForm')?.reset(this.checkoutForm?.get('addressForm')?.value);
      }
    })
  }

}
