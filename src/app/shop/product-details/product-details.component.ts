import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
//below import will give error
//import { BreadcrumbService } from 'xng-breadcrumb/lib/breadcrumb.service';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
//implemeting onInit interface
export class ProductDetailsComponent implements OnInit{

  //due to strict mode using ? for optional parameter
  product?:Product
  //constructor for service dependency injection and activated route for capturing route parameter,
  //breadcrumb service
  constructor(protected shopService:ShopService,private activatedRoute:ActivatedRoute
    ,private bcService:BreadcrumbService)
  { 
    //there is a issu where productID or previous product nam will be shown in the title
    //setting the initial value to avoid incorrect values in productname of breadcrumb title
    this.bcService.set('@productDetails',' ')
  }
  ngOnInit(): void {
    this.loadProduct()
  }
  loadProduct()
  {
    //to avoid null/string valus being passed
    const id=this.activatedRoute.snapshot.paramMap.get('id')
    
      //using + symbol to cast it as number      
    if(id)
    {
      this.shopService.getProduct(+id).subscribe({
        next:productdetail=>{
          this.product=productdetail,
          //breadcrumb alias setup from shop.routing module for 
          this.bcService.set('@productDetails',productdetail.name)
        },
        error:errordata=>console.log(errordata)
      })
    }
  }
}