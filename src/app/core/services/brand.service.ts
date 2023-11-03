import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  baseUrl: string = "https://ecommerce.routemisr.com/api/v1/brands"

  constructor(private _httpHttpClient:HttpClient) { }
  getAllBrands():Observable<any>
  {
    return this._httpHttpClient.get(`${this.baseUrl}`)
  }
}
