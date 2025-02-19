import { Injectable } from '@angular/core';

import { Observable} from 'rxjs';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivemiltonShopFormService {

  constructor() { }

  //return an observable array
  getCreditCardMonths(startMonth: number): Observable<number[]>{

    let data: number[] = [];

    //build an array for "Month" dropdown list
    //- start at desired startMonth and loop until 12
    //

    for(let theMonth=startMonth; theMonth<=12; theMonth++){
      data.push(theMonth);
    }
    //the of operator from rxjs, will wrap an object as an observable

    return of(data);
  }

  getCreditCardyears(): Observable<number[]>{
    let data: number[]=[];

      //build an array for "year" dropdown list
    //- start at current year and loop for next 10
    //

    //get the current year--if current year is 2020 will return 2020
    const startYear: number = new Date().getFullYear();
    const endyear: number= startYear+10;

    for(let theYear = startYear; theYear<=endyear; theYear++){
      data.push(theYear);
    }
  //the of operator from rxjs, will wrap an object as an observable
    return of (data);
  }
}
