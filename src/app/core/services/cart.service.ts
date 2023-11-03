import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numCartItems: BehaviorSubject<number>=new BehaviorSubject(0);
  CartId:BehaviorSubject<string>=new BehaviorSubject("")
  baseUrl: string = "https://ecommerce.routemisr.com/api/v1/cart"
  

  constructor(private _HttpClient:HttpClient) {
   }
   //==========get user cart data
   fetchUserCart()
   {
    this.getLoggedUserCart().subscribe(
      {
      next:(response)=>{
          this.numCartItems.next(response.numOfCartItems)
          this.CartId.next(response.data.cartOwner)
          //console.log("cartService",  this.numCartItems , this.CartId);
        },
        error:(err)=>{//if there is no cart for the user get user id from error to handle all orders
          if(err.error.message.includes("No cart exist"))
          {
            //console.log(err.error.message);
            let userCartId=this.extractUserId(err.error.message);
            this.CartId.next(userCartId)
            
          }

          
        }
      }
    )
   }
   //====== to extract user id from error
 extractUserId(message: string): string  {
    const userIdRegex = /No cart exist for this user: ([^]+)/;
    const match = message.match(userIdRegex);
  
    return match ? match[1]: ""
  }
  
  
  addTocart(productId:string):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}`,{productId})
  }
  getLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}`)
  }
  removeItem(productId:string):Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}/${productId}`)
  }
  updateItemQuantity(productId:string, count:number):Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}/${productId}`,{count})
  }
  checkOut(cartId:string,shippingDetails:any):Observable<any>
  {
    //const encodedHash = encodeURIComponent('#');
    let body={
      shippingAddress:shippingDetails
    }
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,{body})
  }
  emptyCart():Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}`)
  }
}
