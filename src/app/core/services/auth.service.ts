import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ObservableInput, lastValueFrom } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = "https://ecommerce.routemisr.com/api/v1/auth/"
  userData: BehaviorSubject<any> = new BehaviorSubject(null)
  
  constructor(private _HttpClient: HttpClient, private _Router:Router,private _CartService:CartService) {
    if (localStorage.getItem("token")) {//*if there is token decode it to get user data
      let token: string | null = localStorage.getItem("token")
      if (token != null) {
        let data = jwtDecode(token)
        this.saveUserData(data)
      }
    }
  }
 
  //*Register 
  register(form: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}signup`, form)

  }
  //*Login 
  login(form: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}signin`, form)
  }

  //* to save user data after login
  saveUserData(data: any) {
    this.userData.next(data)
  }
  //*logout function
  logOut(){
    localStorage.removeItem('token')
    this.saveUserData(null)
    this._CartService.numCartItems.next(0)
    this._CartService.CartId.next("")

    this._Router.navigate(['/login'])
  }
  forgotPass(form: any): Observable<any> {
  
    return this._HttpClient.post(`${this.baseUrl}forgotPasswords`, form)
  }
  resetCode(form:any):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}verifyResetCode`, form)
  }
  resetPass(form:any):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}resetPassword`, form)
  }
}
