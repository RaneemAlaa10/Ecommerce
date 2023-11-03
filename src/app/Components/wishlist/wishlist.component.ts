import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  //variables
  wishListDetails: any[] = [];
  loading:boolean=false
  readonly Toast = Swal.mixin({
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
  

  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService,
  ) {}

  //get logged user wishlist 
  ngOnInit(): void {
    this.loading=true
    this._WishlistService.getLoggedWishList().subscribe({
      next: (data) => {
        this.wishListDetails = data.data;
        //console.log(this.wishListDetails);
        this.loading=false
      }
    });
  }
  //=======Remove Specific item from wish list
  removeItem(productId: string) {
    this._WishlistService.removeWishListItem(productId).subscribe({
      next: (data) => {
        //console.log(data);
        this.ngOnInit();

      }
    });
  }
  //==========Show message that item is removed
  removeItemFromWishList(productId: string)
  {
    
    this.removeItem(productId)
    this.Toast.fire({
      icon: 'success',
      title: 'Product Removed Successfully From Wish List'
    });
  }
  //=========Add item to cart and remove it from wishlist
  addToCart(productId: string) {
    this._CartService.addTocart(productId).subscribe({
      next: (data) => {
        //update number of cartitems
        this._CartService.numCartItems.next(data.numOfCartItems)
        //console.log(data);
        this.removeItem(productId);
        this.Toast.fire({
          icon: 'success',
          title: 'Product Add Successfully To Your Cart'
        });
      }
    });
  }


}
