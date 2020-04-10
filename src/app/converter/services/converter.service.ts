import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Conversion, ConversionResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  private readonly BASE_URL = "http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3";

  constructor(private http: HttpClient) { }

  /**
   * Perform the call to currencies conversion API 
   * @param conversion 
   * @returns Observable<ConversionResponse>
   */
  toConvert(conversion: Conversion): Observable<ConversionResponse>{
    let params = `?base=${conversion.sourceCurrency}&symbols=${conversion.targetCurrency}`;

    return this.http
      .get(this.BASE_URL+params)
      .map((response: Response) => <ConversionResponse>response.json())
      //.map(response => response.toString() as ConversionResponse)
      .catch(error => Observable.throw(error));
      
  }

  /**
   * Returns the quote for a response data.
   * @param conversionResponse 
   * @param conversion 
   * @returns number
   */
  quoteFor(conversionResponse: ConversionResponse, conversion: Conversion): number{
    if(conversionResponse === undefined){
      return 0;
    }
    return conversionResponse.rates[conversion.targetCurrency];
  }


  /**
   * Returns the quote of a response data.
   * @param conversionResponse 
   * @param conversion 
   * @returns number
   */
  quoteOf(conversionResponse: ConversionResponse, conversion: Conversion): number{
    if(conversionResponse === undefined){
      return 0;
    }
    return (1+conversionResponse.rates[conversion.sourceCurrency]).toFixed(4);
  }
  
  /**
   * Returns the quote date for a response data.
   * @param conversionResponse 
   * @param conversion 
   * @returns string
   */
  quoteDate(conversionResponse: ConversionResponse): string{
    if(conversionResponse === undefined){
      return '';
    }
    return conversionResponse.date;
  }

}
