import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTwoDigitDecimaNumberss]'
})
export class TwoDigitDecimaNumberssDirective {

 // Allow decimal numbers and negative values
 private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
 // Allow key codes for special events. Reflect :
 // Backspace, tab, end, home
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
   let current: string = (this.el.nativeElement.value.trim().replace('₹', '')).replace(/,/g, '')
   const position = this.el.nativeElement.selectionStart;
   const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
   if (next.trim() && !String(next.trim()).match(this.regex)) {
     event.preventDefault();
   }
 }

}
