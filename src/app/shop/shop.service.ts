import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { shopParam } from '../shared/models/shopParams';
import { Type } from '../shared/models/type';
import { Observable, map, of } from 'rxjs';

@Injectable({
  //by default service is provided in root,otherwise we will have to add it manually in our root(app) module
  providedIn: 'root'
})
//in angular all service is singleton so when application starts it will be started, and live aslong as application live
export class ShopService {
  baseurl="https://localhost:5001/api/"
  //saving product details to below variable for caching and not to loose data when component is changed in UI
  products:Product[]=[];
  //if we already have brands types it stops API calls and implements client side caching
brands:Brand[]=[];
types:Type[]=[];

//caching paginated data
pagination?:Pagination<Product[]>;
shopParams=new shopParam();

//implementing cache property like API with key value pair
productCache=new Map<string,Pagination<Product[]>>();

  constructor(private http:HttpClient) { }
  //getProducts returns an observable, component using this service method have to subscribe
  //optional parameter
 // getProducts(brandId?:number, typeId?: number,sort?:string)
//  getProducts(shopParams:shopParam)
//  {
//     //capturing the parameters via angular common http module
//     let params=new HttpParams();
//     //to filter the product using brand and type and sorting
//     //if(brandId) params=params.append('brandId',brandId);
//     //if(typeId) params=params.append('typeId',typeId);
//     //if(sort) params=params.append('sort',sort);
//     //adding params as an option
//     if(shopParams.brandId>0) params=params.append('brandId',shopParams.brandId);
//     if(shopParams.typeId) params=params.append('typeId',shopParams.typeId);
//     if(shopParams.sort) params=params.append('sort',shopParams.sort);
//     if(shopParams.pageNumber) params=params.append('pageIndex',shopParams.pageNumber);
//     if(shopParams.pageSize) params=params.append('pageSize',shopParams.pageSize);
//     if(shopParams.search) params=params.append('search',shopParams.search);
//     //using pipe to save data in product variable
//     return this.http.get<Pagination<Product[]>>(this.baseurl+"products",{params}).pipe(
//       map(response=>{
//         //adding products to array of existing products array
//         this.products=[...this.products,...response.items];
//         this.pagination=response;
//         return response;
//       })
//     );
//   }


//adding useCache to decide whether take data from cache or from API, and default value is true
getProducts(useCache=true):Observable<Pagination<Product[]>>
 {
  //resets everything, if user don't want cache
  if(!useCache) this.productCache=new Map();
    
  //checking if we have anything in cache,if it has return from cache
  if(this.productCache.size>0 && useCache){
    //we are getting the key value from the shopParams
    if(this.productCache.has(Object.values(this.shopParams).join('-'))){
      this.pagination=this.productCache.get(Object.values(this.shopParams).join('-'));
      if(this.pagination)return of(this.pagination);
    }
  }
  //if we dont have anything in cache , get it from API
    let params=new HttpParams();
    if(this.shopParams.brandId>0) params=params.append('brandId',this.shopParams.brandId);
    if(this.shopParams.typeId) params=params.append('typeId',this.shopParams.typeId);
    if(this.shopParams.sort) params=params.append('sort',this.shopParams.sort);
    if(this.shopParams.pageNumber) params=params.append('pageIndex',this.shopParams.pageNumber);
    if(this.shopParams.pageSize) params=params.append('pageSize',this.shopParams.pageSize);
    if(this.shopParams.search) params=params.append('search',this.shopParams.search);
    //using pipe to save data in product variable
    return this.http.get<Pagination<Product[]>>(this.baseurl+"products",{params}).pipe(
      map(response=>{
        //adding products to array of existing products array
        this.productCache.set(Object.values(this.shopParams).join('-'),response);
        this.pagination=response;
        return response;
      })
    );
  }

  setShopParams(params:shopParam){
    this.shopParams=params;
  }
  getShopParams(){
    return this.shopParams;
  }
  //gets list of brands
  getBrands()
  {
    // if we have brands available in service variabl avoiding API call and return from variable
    if(this.brands.length>0)return of(this.brands);
    //if brands array is empty get it from API and assign value to array using pipe
    return this.http.get<Brand[]>(this.baseurl+"products/brands").pipe(
      map(brands=>this.brands=brands)
    );
  }
  //gets list of types
  getTypes()
  {
    if(this.types.length>0) return of(this.types);
    return this.http.get<Type[]>(this.baseurl+"products/types").pipe(
      map(types=>this.types=types)
    );
  }
  //To get an individual product
  getProduct(id:number)
  {
    // //getting product if already available in products variable
    // const product=this.products.find(p=>p.id===id);
    // //using rxjs of operator to send it as observable
    // if(product)return of(product);

    //setting all the values(cached products) from produtcache into an array
    const product=[...this.productCache.values()]
    //using reduce method to find the exact product
    .reduce((acc,paginatedResult)=>{
      return{...acc,...paginatedResult.items.find(x=>x.id==id)}
      //if product is not found, it will return an empty object{}
    },{}as Product)
    //to check if product is empty or not
    if(Object.keys(product).length!==0)return of(product);
    return this.http.get<Product>(this.baseurl+'products/'+id);
  }
}
