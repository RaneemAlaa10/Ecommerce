import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
declare let $: any
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //variables
  isScrolled: boolean = false;
  isLogin: any = null
  cartItemsNumber: number = 0

//===change padding and nav properties when scroll
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollY = window.scrollY;
    
    const scrollThreshold = 50; 

    if (scrollY > scrollThreshold) {
      $('.nav').removeClass('py-3 px-3').addClass('py-1 px-5 nav-black');
    } else {
      $('.nav').removeClass('py-1 px-5 nav-black').addClass('py-3 px-3');
    }
  }



  constructor(private _AuthService: AuthService, private _CartService: CartService) {
    //get number of cartItems
    _CartService.numCartItems.subscribe({
      next: (ItemsNum) => {
        this.cartItemsNumber = ItemsNum
      }
    })
  }
  //get logged user data and cart
  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next: (data) => {
        this.isLogin = data
        //console.log(this.isLogin);
        
        this._CartService.fetchUserCart()
      }
    })
  }

  logOut() {
    this._AuthService.logOut()
  }
}
