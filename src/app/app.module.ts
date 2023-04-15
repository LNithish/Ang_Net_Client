import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //adding http mudule to access API and get data, need to import httpclient 
    HttpClientModule,
    //adding newly created core module to use nav-bar component
    CoreModule,
    //adding shop module to use shop component
    ShopModule,
    //adding home module
    HomeModule
  ],
  //Interceptor has to be added in provider
  providers: [
    //angulare comes with bunch of interceptors to add ours use multi
   {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
   //adding loading interceptor
   {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
   //jwt interceptor to pass in the token of logged in user to API
   {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true}
  ],
  //During angular app starts below component will be started/bootstraped
  bootstrap: [AppComponent]
})
export class AppModule { }
