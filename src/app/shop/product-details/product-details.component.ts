import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
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
  //constructor for service dependency injection and activated route for capturing route parameter
  constructor(protected shopService:ShopService,private activatedRoute:ActivatedRoute)
  {  }
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
        next:productdetail=>this.product=productdetail,
        error:errordata=>console.log(errordata)
      })
    }
  }
}