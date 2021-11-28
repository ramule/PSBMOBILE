import { Directive,ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numbersOnly]'
})
export class NumbersOnlyDirective {

  private specialKeys: Array<string> = [ 'Backspace', 'Tab']; 
  
  constructor(private control : NgControl) { }

  /**** listening to  changes event **/
  @HostListener('input',['$event']) ngOnChanges(e) {
    if (this.specialKeys.indexOf(e.key) !== -1) {
      return;
    }
    let pattern = /^[0-9]*$/;
    /**** check redgex factor for number only **/
    if(!pattern.test(this.control.value)){
      /**** If input text is not integer replace with empty string **/
      let newVal = this.control.value.replace(/[^0-9]/g,'');
      this.control.control.setValue(newVal); 
    }
  }

}


@Directive({
  selector: '[digitOnly]'
})
export class DigitOnlyDirective {

  private specialKeys: Array<string> = [ 'Backspace', 'Tab']; 
  
  constructor(private control : NgControl) { }

  /**** listening to  changes event **/
  @HostListener('input',['$event']) ngOnChanges(e) {
    if (this.specialKeys.indexOf(e.key) !== -1) {
      return;
    }
    if(this.control.value){
      /**** If input text is not integer replace with empty string **/
      let newVal = this.control.value.replace(/[^.0-9]+/g,'');
      this.control.control.setValue(newVal); 
    }
  }

}

@Directive({
  selector: '[amountOnly]'
})
export class AmountOnlyDirective {

  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log(this.el.nativeElement.value);
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

}


@Directive({
  selector: 'input[numericOnly]'
})
export class NumberDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}