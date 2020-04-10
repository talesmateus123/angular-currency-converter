import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ConversionResponse, Conversion, Currency } from '../../models';
import { CurrencyService, ConverterService } from '../../services';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  @ViewChild("conversionForm", { static: true }) conversionForm: NgForm;

  currencies: Currency[];
  conversion: Conversion;
  hasError: boolean;
  conversionResponse: ConversionResponse;

  constructor(private currencyService: CurrencyService, private converterService: ConverterService) { }

  ngOnInit(): void {
    this.currencies = this.currencyService.listAll();
    this.init();
  }

  /**
   * Perform call for value conversion
   * @returns void
   */
  init(): void{
    this.conversion = new Conversion('USD', 'BRL', null);
    this.hasError = false;
  }

  /**
   * Perform call for value conversion
   * @returns void
   */
  toConvert(): void{
    if(this.conversionForm.form.valid){
      this.converterService.toConvert(this.conversion)
        .subscribe(
          response => this.conversionResponse,
          error => this.hasError = true
        );
    }
  }

}
