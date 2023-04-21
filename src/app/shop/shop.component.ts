import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Product } from '../shared/models/product';
import { shopParam } from '../shared/models/shopParams';
import { Type } from '../shared/models/type';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  //using viewchild property to access template variable in the component
  @ViewChild('search') searchTerm?: ElementRef;
  products:Product[]=[];
  brands:Brand[]=[];
  types:Type[]=[];
  //to filter based on brand and type id
  //brandIdSelected=0;
  //typeIdSelected=0;
  //to sort based on
  //sortSelected='name';
  shopParams:shopParam
  sortOptions=[
    //value contains the API value
    {name:'Alphabetical',value:'name'},
    {name:'Price : Low to High',value:'priceAsc'},
    {name:'Price : High to Low',value:'priceDesc'}    
  ]
  //total product count
  totalCount=0;

  constructor(private shopservice:ShopService){
    this.shopParams=shopservice.getShopParams();
  }
  ngOnInit(): void {
    /*this.shopservice.getProducts().subscribe({
      next:response=>this.products=response.items,
      error:error=>console.log(error)
    })*/
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts()
  {
    //passing optional parameters brandId and typeId for filtering
    //this.shopservice.getProducts(this.brandIdSelected,this.typeIdSelected,this.sortSelected).subscribe({
      this.shopservice.getProducts().subscribe({
      next:response=>
      {
        this.products=response.items,
        // //getting pagenumber and pagesize from the paginated response data
        // this.shopParams.pageNumber=response.pageIndex,
        // this.shopParams.pageSize=response.pageSize,
        this.totalCount=response.count
      },
      error:error=>console.log(error)
    })
  }
  getBrands()
  {
    this.shopservice.getBrands().subscribe({
      //we dont need response.items here as it is not paginated array, just a brands array
      //next:response=>this.brands=response,
      //Below line adds an ID 0 record into respons array and assign it to brands array
      next:response=>this.brands=[{id:0,name:"All"},...response],
      error:error=>console.log(error)
    })
  }
  getTypes()
  {
    this.shopservice.getTypes().subscribe({
      //we dont need response.items here as it is not paginated array, just a types array
      //next:response=>this.types=response,
      //Below line adds an ID 0 record into respons array and assign it to types array
      next:response=>this.types=[{id:0,name:"All"},...response],
      error:error=>console.log(error)
    })
  }
  //brand filter
  onBrandSlected(brandId:number)
  {
  //  // this.brandIdSelected=brandId;
  //  this.shopParams.brandId=brandId;
  //  //setting up the pagenumber as 1 to avoid rror NG0100: ExpressionChangedAfterItHasBeenCheckedError: 
  //  //Expression has changed after it was checked. Previous value: '2'. Current value: '1'.
  //  this.shopParams.pageNumber=1;
  //   this.getProducts();
    const params=this.shopservice.getShopParams();
    params.brandId=brandId;
    params.pageNumber=1;
    this.shopservice.setShopParams(params);
    this.shopParams=params;
     this.getProducts();
  }
  //type filter
  onTypeSlected(typeId:number)
  {
    // //this.typeIdSelected=typeId;
    // this.shopParams.typeId=typeId;
    // this.shopParams.pageNumber=1;
    // this.getProducts();

    const params=this.shopservice.getShopParams();
    params.typeId=typeId;
    params.pageNumber=1;
    this.shopservice.setShopParams(params);
    this.shopParams=params;
    this.getProducts();
  }
  //sorting
  onSortSelected(event:any)
  {
    // //this.sortSelected=event.target.value;
    // this.shopParams.sort=event.target.value;
    // this.getProducts();

    const params=this.shopservice.getShopParams();
    //this.sortSelected=event.target.value;
    params.sort=event.target.value;
    this.shopservice.setShopParams(params);
    this.shopParams=params;
    this.getProducts();
  }
  //Pagination page change method
  onPageChanged(event:any)
  {
    // //if condition is for checking if we are currently updating our page number
    // if(this.shopParams.pageNumber!==event)
    // {
    //   this.shopParams.pageNumber=event;
    //   this.getProducts();
    // }

    const params=this.shopservice.getShopParams();
    if(params.pageNumber!==event)
    {
      params.pageNumber=event;
      this.shopservice.setShopParams(params);
      this.shopParams=params;
      this.getProducts();
    }
  }
  //search functionality
  onSearch()
  {
    // this.shopParams.search=this.searchTerm?.nativeElement.value;
    // this.shopParams.pageNumber=1;
    // this.getProducts();

    const params=this.shopservice.getShopParams();
    params.search=this.searchTerm?.nativeElement.value;
    params.pageNumber=1;
    this.shopservice.setShopParams(params);
    this.shopParams=params;
    this.getProducts();
  }
  onReset()
  {
    if(this.searchTerm)
    {
      this.searchTerm.nativeElement.value='';
      // this.shopParams=new shopParam();
      this.shopParams=new shopParam();
      this.shopservice.setShopParams(this.shopParams);
      this.getProducts();
    }
  }
}
