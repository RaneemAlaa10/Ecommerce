import { Component, OnInit } from '@angular/core';
import { Products, product } from 'src/app/core/Interfaces/product';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //variables 
  productList: product[] = []
  wishListIds: string[] = []
  loading: boolean = false
  pageSize: number = 0
  currentPage: number = 1
  total: number = 0
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



  constructor(private _ProductService: ProductService, private _CartService: CartService, private _WishlistService: WishlistService) { }
  ngOnInit(): void {
    this.loading = true
    this.loadProducts();
  }
  //======== to add product to cart
  addToCart(productId: string) {
    this._CartService.addTocart(productId).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          //console.log(response)
          // change number of cart items to the new number after addition to be changed in navbar
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
  //=====to load products and get page number 
  loadProducts(pageNumber?: number): void {
    const pageToLoad = pageNumber || 1;
    this._ProductService.getAllProducts(pageToLoad).subscribe({
      next: (response: Products) => {
        this.pageSize = response.metadata.limit
        this.currentPage = response.metadata.currentPage
        this.total = response.results
        this.productList = response.data;
        //console.log(this.productList);
        this.getWishList();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    });
  }
  //======to add specific product to wishlist
  addTowishList(productId: string): void {
    this._WishlistService.addToWishList(productId).subscribe({
      next: (data) => {
        //console.log(data);
        if (data.status == 'success') {
          //reload products to apply red color on heart icon of product cart
          this.loadProducts(this.currentPage);
          this.Toast.fire({
            icon: 'success',
            title: data.message
          });
        }
      }
    });
  }
  //=====Get logged user wishlist==
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
  pageChanged(event: any) {
    this.loadProducts(event)
  }
}
