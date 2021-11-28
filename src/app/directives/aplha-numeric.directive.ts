import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[alphaNumeric]'
})
export class alphaNumericDirective {

  private specialKeys: Array<string> = [ 'Backspace', 'Tab']; 
  
  constructor(private control : NgControl) { }

  /**** listening to  changes event **/
  @HostListener('input',['$event']) ngOnChanges(e) {
    if (this.specialKeys.indexOf(e.key) !== -1) {
      return;
    }
    let pattern = /^[a-zA-Z0-9_]*$/;
    /**** check redgex factor for number only **/
    if(!pattern.test(this.control.value)){
      /**** If input text is not integer replace with empty string **/
      let newVal = this.control.value.replace(/[^a-zA-Z0-9]/g,'');
      this.control.control.setValue(newVal); 
    }
  }

}


@Directive({
  selector: '[alphaNumericAllowedSpecialChars]'
})
export class AlphaNumericAllowedSpecialChars {

  private specialKeys: Array<string> = [ 'Backspace', 'Tab']; 
  
  constructor(private control : NgControl) { }

  /**** listening to  changes event **/
  @HostListener('input',['$event']) onInputChange(e) {
    if (this.specialKeys.indexOf(e.key) !== -1) {
      return;
    }
    let pattern = /^([\w,.'\s\-]*)$/;
    /**** check redgex factor for number only **/
    if(!pattern.test(this.control.value)){
      /**** If input text is not integer replace with empty string **/
            let newVal = this.control.value.replace(/([^\w,.'\s\-]*)/g, '');
      this.control.control.setValue(newVal); 
    }
  }

}