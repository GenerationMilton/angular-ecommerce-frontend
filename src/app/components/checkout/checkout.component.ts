import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements Oninit{

  checkoutFromGroup: FormGroup | undefined;


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

}
