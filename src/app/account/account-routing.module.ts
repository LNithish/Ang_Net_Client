import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes:Routes=[
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent}
]

@NgModule({
  declarations: [],
  imports: [
    //CommonModule
    //importing required router module
    RouterModule.forChild(routes)
  ],
  exports:[
    //Exporting router module to use in app routing module
    RouterModule
  ]
})
export class AccountRoutingModule { }
