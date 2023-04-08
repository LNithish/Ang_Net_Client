import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { debounce, debounceTime, finalize, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  passwordRegex="(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$";
  //to store errors
  errors:string[]|null=null;
  
  //injecting reactive form provided formbuilder service
  constructor(private formBuilder:FormBuilder,private accountService:AccountService
    ,private router:Router){}

    registerForm=this.formBuilder.group({
      displayName:['',Validators.required],
      //added async validation in an array
      email:['',[Validators.required,Validators.email],[this.validateEmailNotTaken()]],
      password:['',[Validators.required,Validators.pattern(this.passwordRegex)]]

    })

    onSubmit(){
      this.accountService.register(this.registerForm.value).subscribe({
        next:()=>this.router.navigateByUrl('/shop'),
        //Capturing the interceptor throwing error and assigning it to errors object
        error:error => this.errors=error.errors
      })
    }

    //Async validation to check if email already in use
    validateEmailNotTaken():AsyncValidatorFn{
      return (control:AbstractControl)=>{
        //debouncing valueChanges so that multiple API request will be avoided everytime user types
        return control.valueChanges.pipe(
          //Wait 1 sec if no changes from user API request will be made
          debounceTime(1000),
          //To take last value emitted/user typed
          take(1),
          //Switchmap provides an observable for function inside it
          switchMap(()=>{
            return this.accountService.checkEmailExists(control.value).pipe(
              //when result is true(emailexist) set emailExists to true, if false passing null ,
              // when null validator passes, value from emailExists will be used in text-input comp from sharedmodule
              map(result=>result?{emailExists:true}:null),
              //adding finalize method to get instant error response (no need to click outside the text box)
              finalize(()=>control.markAsTouched())
            )
          })
        )
        
      }
    }
}
