import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //cartItem array
  cartItems: CartItem[]=[];

  //total price and total quantity objects
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number>= new Subject<number>();

  constructor() { }

  //method add to cart to pass item
  addToCart(theCartItem: CartItem){

    //check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if(this.cartItems.length > 0){
      //find the item in the cart based on item id

      for(let tempCartItem of this.cartItems){
        if(tempCartItem.id=== theCartItem.id){
          existingCartItem= tempCartItem;
          break;
        }
      }

      //check if we found it
      alreadyExistsInCart =(existingCartItem != undefined);

      if(alreadyExistsInCart){
        //increment the quantity
        existingCartItem.quantity++;
      } else{
        //just add the item to the array
        this.cartItems.push(theCartItem);
      }

      //compute cart total price and total wuantity
      this.computeCartTotals();


    }
    

   


  }


}
