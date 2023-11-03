import { NONE_TYPE } from '@angular/compiler';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductDetails, productInf } from 'src/app/core/Interfaces/productdetails';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})

export class ProductdetailsComponent implements OnInit {
  //variables
  id: string = ""
  productInfo: any
  loading: boolean = false
  wishListIds: string[] = []
  readonly Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: '#6b8f57',
    background: 'white',
    color: '#6b8f57',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });
  //get product id from parameters, get product details 
  constructor(private _ActivatedRoute: ActivatedRoute, 
    private _ProductService: ProductService, 
    private _CartService: CartService, 
    private _WishlistService: WishlistService) {

    _ActivatedRoute.params.subscribe((data) => {
      this.loading = true
      this.id = data['id']
      this._ProductService.getSpecificProduct(this.id).subscribe({
        next: (data: ProductDetails) => {
          this.loading = false
          this.productInfo = data.data
          //console.log(this.productInfo);
        }
      })
    })
  }

  //get user wishlist while initiating component
  ngOnInit(): void {
    this.getWishList()
  }
  //====to add product to cart 
  addToCart(productId: string) {
    this._CartService.addTocart(productId).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          //console.log(response)
          this._CartService.numCartItems.next(response.numOfCartItems)
          this.Toast.fire({
            icon: 'success',
            title: response.message
          });
        }
      },
      error: (err) => {
        //console.log(err);
      }
    })
  }
  //======add product to wishlist
  addTowishList(productId: string): void {
    this._WishlistService.addToWishList(productId).subscribe({
      next: (data) => {
        //console.log(data);
        if (data.status == 'success') {
          this.Toast.fire({
            icon: 'success',
            title: data.message
          });
          this.ngOnInit()
        }
      }
    });
  }
  //=======get user wishlist
  getWishList() {
    this._WishlistService.getLoggedWishList().subscribe({
      next: (data) => {
        for (let i = 0; i < data.data.length; i++) {
          this.wishListIds.push(data.data[i]._id)
        }
        //console.log("wishh", this.wishListIds);

      }
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: true,
    autoplaySpeed: 300,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: false
  }


}
