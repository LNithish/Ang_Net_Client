import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
//implementing onInit interface to get the address details during address component load
export class CheckoutComponent implements OnInit{

  //injecting formbuilder service to create the forms needed for different checkout components
  //account service to get address details
  constructor(private fb:FormBuilder,private accountservice:AccountService){}

  ngOnInit(): void {
    this.getAddressFormValues();
  }

  //single form for checkout module and it will have multiple group inside
  //each group will be belong to different checkout component
  checkoutForm=this.fb.group({
    addressForm:this.fb.group({
      //below are form controls
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      street:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      zipcode:['',Validators.required]
    }),
    deliveryForm:this.fb.group({
      deliveryMethod:['',Validators.required]
    }),
    paymentForm:this.fb.group({
      nameOnCard:['',Validators.required]
    })
  })

  getAddressFormValues(){
    this.accountservice.getUserAddress().subscribe({
      next:address=>{
       //To check if address is not mpty
        address &&
          //to load the form with address values
          this.checkoutForm.get("addressForm")?.patchValue(address);       
      }
    })
  }
}
