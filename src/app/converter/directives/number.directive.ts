import { Directive, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';



@Directive({
  selector: '[number]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NumberDirective,
    multi: true
  }]
})
export class NumberDirective implements ControlValueAccessor{
  onChange: any;
  onTouched: any;
  constructor(private el: ElementRef) { }

  /**
   * Implements an keyup event for a directive element.
   * @param any $event 
   */
  @HostListener('keyup', ['$event'])
  onKeyUp($event: any){
    let value = $event.target.value;
    let positionDecimals = value.indexOf('.');

    // Removing all, except numbers
    value = value.replace(/[\D]/g, '');

    if(positionDecimals > 0){
      value =value.substr(0, positionDecimals)+'.'+
      value.substr(positionDecimals);
    }

    $event.target.value = value;
    this.onChange(value);
  }

   /**
   * Registra função a ser chamada para atualizar 
   * valor na model.
   * 
   * @param any fn
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registra função a ser chamada para atualizar 
   * valor na model para evento touched.
   * 
   * @param any fn
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Obtém o valor contido na model.
   * 
   * @param any value
   */
  writeValue(value: any): void {
  	this.el.nativeElement.value = value;
  }
}
