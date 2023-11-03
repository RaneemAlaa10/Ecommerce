import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = "https://ecommerce.routemisr.com/api/v1/products"

  constructor(private _HttpClient:HttpClient) { }
  
  getAllProducts(page:number=1):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}?page=${page}`)
  }
  getSpecificProduct(id:string):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/${id}`)
  }
}
