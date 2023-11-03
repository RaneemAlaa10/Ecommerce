import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl: string = "https://ecommerce.routemisr.com/api/v1/orders/user/"
  
  constructor(private _HttpClient: HttpClient) { }

  getUserOrders(cartId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${cartId}`)
  }
}
