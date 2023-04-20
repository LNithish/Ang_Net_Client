import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent {

  //input for template reference variable from chcout component
  @Input() appStepper?:CdkStepper;

  constructor(private basketService:BasketService,private toastr:ToastrService){}

  createPaymentIntent(){
    this.basketService.createPaymentIntent().subscribe({
      next:()=>{
        this.toastr.success('Payment Intent is created'),
        //following does the functionality of cdkStepperNext from the HTML(moves to next checkout form)
        this.appStepper?.next();
      },
      error:error=>this.toastr.error(error.message)
    })
  }

}
