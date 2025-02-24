import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { LivemiltonShopFormService } from 'src/app/services/livemilton-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {


  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  //properties to year and months
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  //populate countries and states
  countries:Country[]=[];

  //set up an array for shipping address states and billing address states
  shippingAddressStates: State[]=[];
  billingAddressStates: State[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private livemiltonShopFormservice: LivemiltonShopFormService
  ) {}

  ngOnInit(): void {
    //formgroup
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required, Validators.minLength(2)]),
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    //populate credit card months

    const startMonth: number = new Date().getMonth() + 1;
    console.log('startMonth: ' + startMonth);

    this.livemiltonShopFormservice
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log('Retrieved credit card months: ' + JSON.stringify(data));
        this.creditCardMonths = data;
      });

    //populate credit card years

    this.livemiltonShopFormservice.getCreditCardyears().subscribe((data) => {
      console.log('Retrieved credit card years: ' + JSON.stringify(data));
      this.creditCardYears = data;
    });

    //populate the countries
    this.livemiltonShopFormservice.getCountries().subscribe(
      data=>{
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries=data;
      }
     
    )




  }

  copyShippingAddressToBillingAddress(event:any) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
            .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      // bug fix for states
      this.billingAddressStates = this.shippingAddressStates;

    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      // bug fix for states
      this.billingAddressStates = [];
    }
    
  }

  //method to purchase
  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log("The email address is " + this.checkoutFormGroup.get('customer')!.value.email);
  
    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress')!.value.country.name);
    console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress')!.value.state.name);
  
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup?.value.expirationYear
    );

    //if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.livemiltonShopFormservice
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log('Retrieved credit card monts: ' + JSON.stringify(data));
        this.creditCardMonths = data;
      });
  }

  //chenge method to event handler of states

  getStates(formGroupName: string) {
    
    const formGroup =this.checkoutFormGroup.get(formGroupName);

    const countryCode= formGroup!.value.country.code;
    const countryName= formGroup!.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    //call service to obtain the states

    this.livemiltonShopFormservice.getStates(countryCode).subscribe(
      data=>{
        if(formGroupName=== 'shippingAddress'){
          this.shippingAddressStates=data;
        }
        else{
          this.billingAddressStates=data;
        }

        //select the first item by default
        formGroup!.get('state')!.setValue(data[0]);
      }
    );

    }

}
