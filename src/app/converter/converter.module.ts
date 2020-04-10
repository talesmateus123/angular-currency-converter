import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ConverterComponent, ModalQuotationComponent } from './components';
import { CurrencyService, ConverterService } from './services';
import { NumberDirective } from './directives';

@NgModule({
  declarations: [
    ConverterComponent,
    NumberDirective,
    ModalQuotationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    ConverterComponent,
    ModalQuotationComponent
  ],
  providers: [
    CurrencyService,
    ConverterService
  ]
})
export class ConverterModule { }
