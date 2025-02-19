import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{


  checkoutFromGroup!: FormGroup;

  totalPrice: number=0;
  totalQuantity: number=0;

  constructor( private formBuilder: FormBuilder){}

  ngOnInit(): void{
    
    //formgroup
    this.checkoutFromGroup =this.formBuilder.group({

      customer: this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress: this.formBuilder.group({
        country:[''],
        street:[''],
        city:[''],
        state:[''],
        zipCode:[''],

      }),
      billingAddress: this.formBuilder.group({
        country:[''],
        street:[''],
        city:[''],
        state:[''],
        zipCode:[''],

      }),
      creditCard: this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:[''],

      }),
    });
  }

  //checkbox to validate and copy
  copyShippingAddressToBillingAddress(event: Event): void {
    if(event.target!.checked){
      this.checkoutFromGroup.controls['billingAddress']
        .setValue(this.checkoutFromGroup.controls['shippingAddress'].value);
      }
      else {
        this.checkoutFromGroup.controls['billingAddress'].reset();
      }
    }

  //method to purchase
  onSubmit(){
    console.log("handling the submit button");
    console.log(this.checkoutFromGroup.get('customer')!.value);
    console.log("The email address is "+ this.checkoutFromGroup.get('customer')!.value.email);
  }

 
}
