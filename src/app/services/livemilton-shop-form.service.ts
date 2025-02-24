import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map} from 'rxjs';
import {of} from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class LivemiltonShopFormService {

  //service for countries and states
  private countriesUrl= 'http://localhost:8080/api/countries';
  private statesUrl='http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }

  //get countries observable
  getCountries(): Observable<Country[]>{

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]>{
    //search url
    const searchStatesUrl=`${this.statesUrl}/search/findbyCountryCode?code=${theCountryCode}`;

    //call 
    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }

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


interface GetResponseCountries{
  _embedded:{
    countries: Country[];
  }
}

interface GetResponseStates{
  _embedded:{
    states: State[];
  }

}
  
