import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';
import { HomeModule } from './home/home.module';

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
  providers: [],
  //During angular app starts below component will be started/bootstraped
  bootstrap: [AppComponent]
})
export class AppModule { }
