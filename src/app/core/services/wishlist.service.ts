import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  baseUrl: string = 'https://ecommerce.routemisr.com'
  
  constructor(private _HttpClient:HttpClient) { }

  addToWishList(productId:string):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`,{productId:productId})
  }
  getLoggedWishList():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`)
  }
  removeWishListItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${productId}`)
  }
}
