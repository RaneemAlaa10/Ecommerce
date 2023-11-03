import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  //variables
  cartId: string = "" //store user cart id
  loading: boolean = false

  constructor(private _CartService: CartService, private _ActivateRoute: ActivatedRoute) {
    //get user cart from route parameters
    _ActivateRoute.params.subscribe((data) => {
      this.cartId = data['cartId']
    })
  }

  //check out form used to send shipping details
  checkOutForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9-@]{6,}$/)]),
    city: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  })

  //=====to send shipping data to api and redirect user to payment page
  checkOut(shippingAddress: FormGroup) {
    this.loading = true
    this._CartService.checkOut(this.cartId, shippingAddress.value).subscribe({
      next: (response) => {
        //console.log(response);
        this.loading=false
        window.location.href=response.session.url
      },
      error:(err)=>{
        //console.log(err.error.message);
        
      }
    })
  }
}
