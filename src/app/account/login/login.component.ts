import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //return URL to redirect user based on the URL once logged in
returnUrl:string;

  //creating reactive form
  loginForm=new FormGroup({
    //1st parameter is initial value, 2nd is validaters
    //we can put multiple validation inside []
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required)
  })

  //Injecting account service
  //adding activatedroute service to captur returnURL
  constructor(private accountService:AccountService,private router:Router
    ,private activatedRoute:ActivatedRoute){
      //queryparam returnUrl should match from authguard param name,if returnUrl empty redirecting to shop
      this.returnUrl=activatedRoute.snapshot.queryParams['returnUrl']||'/shop';
    }

  onSubmit(){
    //console.log(this.loginForm.value);
    this.accountService.login(this.loginForm.value).subscribe({
      next:()=>this.router.navigateByUrl(this.returnUrl)
    })
  }
}
