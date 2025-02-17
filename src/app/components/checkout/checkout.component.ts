import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  checkoutFromGroup!: FormGroup;


  constructor( private formBuilder: FormBuilder){}

  ngOnInit(): void{
    
    //formgroup
    this.checkoutFromGroup =this.formBuilder.group({

      customer: this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      })
    });
  }

  //method to purchase
  onSubmit(){
    console.log("handling the submit button");
    console.log(this.checkoutFromGroup.get('customer')!.value);
    console.log("The email address is "+ this.checkoutFromGroup.get('customer')!.value.email);
  }
}
