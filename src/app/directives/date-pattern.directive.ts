import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  BACKSPACE = 8
}

@Directive({
  selector: '[datePattern]'
})
export class DatePatternDirective {

  private specialKeys: Array<string> = ['Backspace', 'Tab'];

  constructor(private control: NgControl) { }

  /**** listening to  keyup event **/
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event.keyCode);
    if (event.keyCode === KEY_CODE.BACKSPACE) {
      return;
    }

    let pattern = /^[0-9]*\/?[0-9]*$/;
    /**** check redgex factor for number only **/
    if (!pattern.test(this.control.value)) {
      /**** If input text is not integer replace with empty string **/
      let newVal = this.control.value.replace(/[^0-9]/g, '');
      this.control.control.setValue(newVal);
    }
    else{
      if(this.control.value.length == 2 && (this.control.value > 12 || this.control.value < 1)){
        /**** If input month is more than 12 replace with empty string **/
        this.control.control.setValue('');
      }
      else if(this.control.value.length == 2){
        let newVal = this.control.value.concat('/');
        this.control.control.setValue(newVal);
      }
    }
  }

}
