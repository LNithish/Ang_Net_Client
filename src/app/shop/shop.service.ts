import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { shopParam } from '../shared/models/shopParams';
import { Type } from '../shared/models/type';

@Injectable({
  //by default service is provided in root,otherwise we will have to add it manually in our root(app) module
  providedIn: 'root'
})
export class ShopService {
  baseurl="https://localhost:5001/api/"
  constructor(private http:HttpClient) { }
  //getProducts returns an observable, component using this service method have to subscribe
  //optional parameter
 // getProducts(brandId?:number, typeId?: number,sort?:string)
 getProducts(shopParams:shopParam)
 {
    //capturing the parameters via angular common http module
    let params=new HttpParams();
    //to filter the product using brand and type and sorting
    //if(brandId) params=params.append('brandId',brandId);
    //if(typeId) params=params.append('typeId',typeId);
    //if(sort) params=params.append('sort',sort);
    //adding params as an option
    if(shopParams.brandId>0) params=params.append('brandId',shopParams.brandId);
    if(shopParams.typeId) params=params.append('typeId',shopParams.typeId);
    if(shopParams.sort) params=params.append('sort',shopParams.sort);
    if(shopParams.pageNumber) params=params.append('pageIndex',shopParams.pageNumber);
    if(shopParams.pageSize) params=params.append('pageSize',shopParams.pageSize);
    if(shopParams.search) params=params.append('search',shopParams.search);
    return this.http.get<Pagination<Product[]>>(this.baseurl+"products",{params});
  }
  //gets list of brands
  getBrands()
  {
    return this.http.get<Brand[]>(this.baseurl+"products/brands");
  }
  //gets list of types
  getTypes()
  {
    return this.http.get<Type[]>(this.baseurl+"products/types");
  }
}
