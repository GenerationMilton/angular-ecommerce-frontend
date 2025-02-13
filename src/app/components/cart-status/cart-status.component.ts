import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number=0.00;
  totalQuantity: number=0;

  //inject service
  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.updateCartStatus();
  }

  //helper method to updateCartStatus

  updateCartStatus() {

    //subscribe to te cart totalPrice
    //when new evetns are received, make the assignements to update UI
    this.cartService.totalPrice.subscribe(
      data=> this.totalPrice=data
    );


    //subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data=>this.totalQuantity=data
    )
    

  }

}
