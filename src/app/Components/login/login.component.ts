import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //variables
  errorMessage:string=""
  loading:boolean=false

  constructor(private _AuthService:AuthService,private _Router:Router,private _CartService:CartService){}
  //login form to get user email and password
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9-@]{6,}$/)])//must be at least 8 digists or chars 
  })
  //==== send user email and password to api
  handleLogin(form:FormGroup)
  {
    this.loading=true//*show loading overlay
    this._AuthService.login(form.value).subscribe({
      next:(response)=>{
        if(response.message=='success')
        {
          this._AuthService.saveUserData(response.user)
          localStorage.setItem('token',response.token)//*save user token in local storage 
          this.loading=false //*stop loading overlay 
          this._CartService.fetchUserCart()//*get user cart data 
          this._Router.navigate(['/home'])//navigate to home after successful login
        }
      },
      error:(err)=>{
        this.errorMessage = err.error.message
        this.loading=false
      }
    })
  }
}
