import { Component, OnInit } from '@angular/core';
import { CartItem, Order } from 'src/app/core/Interfaces/order';
import { CartService } from 'src/app/core/services/cart.service';
import { OrdersService } from 'src/app/core/services/orders.service';
declare let $: any

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {

  //variables
  cartId: string = ""
  allOrders: Order[] = [] // to store all orders of the user
  cartItems: CartItem[] = [] // to store order items details 
  loading: boolean = false
  selectedOrder: any; // to store selected order to show modal for it

  constructor(private _CartService: CartService, private _OrdersService: OrdersService) {
    
  }
  //========to get user orders when the component initiating========
  ngOnInit(): void {
    this.getUserOrders();
  }
  //====== get all user orders===========
  getUserOrders() {
    this.loading = true;
    this._CartService.CartId.subscribe({
      next: (id) => {
        this.cartId = id;
        if (this.cartId) {
          this._OrdersService.getUserOrders(this.cartId).subscribe({
            next: (res) => {
              this.loading = false;
              this.allOrders = res;
              //console.log(this.allOrders);
            }
          });
        }
      }
    });
  }
  
  // ====================to open the modal and set the selected order=============
  openModal(order: any) {
    this.selectedOrder = order;
    this.cartItems = order.cartItems
    //console.log(this.cartItems);
    $(".cardContainer").removeClass("d-none")


  }

  //============to close the modal===========
  closeModal() {
    $(".cardContainer").addClass("d-none")
  }
//=============prevent hide when click on modal card==================
  preventHide(event: Event): void {
    event.stopPropagation();
  }
}