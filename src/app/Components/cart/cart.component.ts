import { Component, OnInit } from '@angular/core';
import { Cart, ProductProduct } from 'src/app/core/Interfaces/cart';
import { CartService } from 'src/app/core/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  //variables
  cartData: Cart | null = null  // store user cart items
  loading:boolean=false
  readonly Toast = Swal.mixin({ //sweat alert toaster to show messages 
    toast: true,
    position: 'top-right',
    iconColor: '#6b8f57',
    background:'white',
    color:'#6b8f57',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });
  

  constructor(private _CartService: CartService) { }

  //get logged user cart while intiating 
  ngOnInit(): void {
    this.loading=true
    this._CartService.getLoggedUserCart().subscribe({
      next: (res: Cart) => {
        if(res.numOfCartItems>0)
        {
          this.cartData = res
        }
        else
        {
          this.cartData = null // if cart is empty 
        }
        this.loading=false
      },
      error:(err)=>{
        //console.log(err);
        this.loading=false}
    })
  }
  //====to remove specific item from cart======
  removeItem(productId: string) {
    this._CartService.removeItem(productId).subscribe({
      next: (response:Cart) => {
        if (response.status == "success") {
          //take the new number of items after removing
          this._CartService.numCartItems.next(response.numOfCartItems)
          this.Toast.fire({
            icon: 'success',
            title: 'Product Removed Successfully From Cart'
          });
          if(response.numOfCartItems>0)// if there is items in cart 
          {
            this.cartData = response
          }
          else // if no items in cart
          {
            this.cartData = null
          }
        }
      }
    })
  }

  //=====to update specifi product quantity increasing or decreasing
  updateProductQuantity(productId:string,count:number)
  {
    this._CartService.updateItemQuantity(productId,count).subscribe({
      next:(response)=>{
        if (response.status == "success") {
          this._CartService.numCartItems.next(response.numOfCartItems)
          this.cartData = response
          this.Toast.fire({
            icon: 'success',
            title: 'Product Quantity Successfully Updated'
          });

        }
        
      }
    })
  }

  //====to delete whole cart, when it fires ngtemplate shown in html
  emptyCart()
  {
    this.loading=true
    this._CartService.emptyCart().subscribe({
      next:(response)=>{
        if(response.message=='success')
        {
          this._CartService.numCartItems.next(0)
          this.cartData=null
          this.loading=false
          this.Toast.fire({
            icon: 'success',
            title: 'Cart Deleted Successfully'
          });
        }
      }
    })
  }
}
