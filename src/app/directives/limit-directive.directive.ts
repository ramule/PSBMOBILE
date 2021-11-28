import { Directive, Input, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CommonMethods } from '../utilities/common-methods';

@Directive({
  selector: '[limit-to]'
})
export class LimitDirectiveDirective {
  
  private specialKeys: Array<string> = [ 'Backspace', 'Tab'];
  constructor(private control : NgControl, private commonMethods : CommonMethods) { }
  @Input('limit-to') limitTo; /***  Input parameter **/

  /**** listening to  changes event **/
  @HostListener('input',['$event']) ngOnChanges(e) {
    const limit = +this.limitTo;
    if (this.specialKeys.indexOf(e.key) !== -1 || this.commonMethods.validateEmpty(this.control.value)) {
      return;
    }

    if (this.control.value.length >= limit) {/**** If length exceeds **/
      let newVal = this.control.value.substring(0,limit)
      this.control.control.setValue(newVal)
    }
  }

}
