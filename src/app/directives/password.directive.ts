import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[password]'
})
export class passwordDirective {

  private specialKeys: Array<string> = [ 'Backspace', 'Tab']; 
  
  constructor(private control : NgControl) { }

  /**** listening to  changes event **/
  @HostListener('input',['$event']) ngOnChanges(e) {
    if (this.specialKeys.indexOf(e.key) !== -1) {
      return;
    }
    let pattern = /^[a-zA-Z0-9_@$%#]*$/;
    /**** check redgex factor for number only **/
    if(!pattern.test(this.control.value)){
      /**** If input text is not integer replace with empty string **/
      let newVal = this.control.value.replace(/[^a-zA-Z0-9_@$%#]/g,'');
      this.control.control.setValue(newVal); 
    }
  }

}
