import {
    OnInit,
    Directive,
    HostListener,
    ElementRef, forwardRef
  } from '@angular/core';
  import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
  import { DecimalPipe } from '@angular/common';

  export const CURRENCY_INPUT_MASK_DIRECTIVE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CurrencyInputMaskDirective),
    multi: true
  };

  @Directive({
    selector: '[appCurrencyInputMask]',
    providers: [
      CURRENCY_INPUT_MASK_DIRECTIVE_VALUE_ACCESSOR,
      DecimalPipe
    ]
  })
  export class CurrencyInputMaskDirective implements ControlValueAccessor, OnInit {
    private el: HTMLInputElement;
    private onModelChange: Function;
    private onModelTouched: Function;
    private lastNumVal: number;
    private DECIMAL_MARK = '.';

    constructor(
      private elementRef: ElementRef,
      private decimalPipe: DecimalPipe,
      // private control : NgControl
    ) { }

    ngOnInit() {
      this.el = this.elementRef.nativeElement;
    }

    @HostListener('focus', ['$event'])
    handleFocus(event: any) {
      const strVal: string = this.getInputValue();
      const unmaskedStr: string = this.getUnmaskedValue(strVal);
      this.updateInputValue(unmaskedStr);
    }

    @HostListener('cut', ['$event'])
    handleCut(event: any) {
      setTimeout(() => {
        this.inputUpdated();
      }, 0);
    }

    @HostListener('keypress', ['$event'])
    handleKeypress(event: any) {
      // Restrict characters
      const newChar: string = String.fromCharCode(event.which);
      const allowedChars: RegExp = /^[\d.]+$/;
      if (!allowedChars.test(newChar)) {
        event.preventDefault();
        return;
      }
      // Handle decimal mark input
      const currentValue: string = event.target.value;
      const separatorIdx: number = currentValue.indexOf(this.DECIMAL_MARK);
      const hasFractionalPart: boolean = (separatorIdx >= 0);
      if (!hasFractionalPart || newChar !== this.DECIMAL_MARK) {
        return;
      }
      const isOutsideSelection = !this.isIdxBetweenSelection(separatorIdx);
      if (isOutsideSelection) {
        const positionAfterMark = separatorIdx + 1;
        this.setCursorPosition(positionAfterMark);
        event.preventDefault();
        return;
      }
    }

    @HostListener('input', ['$event'])
    handleInput(event: any) {
      this.inputUpdated();
    }

    @HostListener('paste', ['$event'])
    handlePaste(event: any) {
      setTimeout(() => {
        this.inputUpdated();
      }, 1);
    }

    @HostListener('blur', ['$event'])
    handleBlur(event: any) {
      const strVal: string = this.getInputValue();
      const numVal: number = this.convertStrToDecimal(strVal);
      this.maskInput(numVal);
      this.onModelTouched.apply(event);
    }

    registerOnChange(callbackFunction: Function): void {
      this.onModelChange = callbackFunction;
    }

    registerOnTouched(callbackFunction: Function): void {
      this.onModelTouched = callbackFunction;
    }

    setDisabledState(value: boolean): void {
      this.el.disabled = value;
    }

    writeValue(numValue: number): void {
      this.maskInput(numValue);
    }

    private maskInput(numVal: number): void {
      if (!this.isNumeric(numVal)) {
        this.updateInputValue('');
        return;
      }
      const strVal: string = this.convertDecimalToStr(numVal);
      const newVal: string = this.transformWithPipe(strVal);
      this.updateInputValue(newVal);
    }

    private inputUpdated() {
      this.restrictDecimalValue();
      const strVal: string = this.getInputValue();
      const unmaskedVal: string = this.getUnmaskedValue(strVal);
      const numVal: number = this.convertStrToDecimal(unmaskedVal);
      if (numVal !== this.lastNumVal) {
        this.lastNumVal = numVal;
        this.onModelChange(numVal);
      }
    }

    private restrictDecimalValue(): void {
      const strVal: string = this.getInputValue();
      const dotIdx: number = strVal.indexOf(this.DECIMAL_MARK);
      const hasFractionalPart: boolean = (dotIdx >= 0);
      if (hasFractionalPart) {
        const fractionalPart: string = strVal.substring(dotIdx + 1);
        if (fractionalPart.length > 2) {
          const choppedVal: string  = strVal.substring(0, dotIdx + 3);
          this.updateInputValue(choppedVal, true);
          return;
        }
      }
    }

    private transformWithPipe(str: string): string {
      // return this.decimalPipe.transform(str, '1.2-3');
      return "₹ " + Number(str).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')

    }

    private getUnmaskedValue(value: string): string {
      return value.replace(/[^-\d\\.]/g, '');
    }

    private updateInputValue(value: string, savePosition = false) {
      if (savePosition) {
        this.saveCursorPosition();
      }
      this.el.value = value;
    }

    private getInputValue(): string {
      return this.el.value;
    }

    private convertStrToDecimal(str: string): number {
      return (this.isNumeric(str)) ? parseFloat(str) : null;
    }

    private convertDecimalToStr(n: number): string {
      return (this.isNumeric(n)) ? n + '' : '';
    }

    private isNumeric(n: any): boolean {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    private saveCursorPosition() {
      const position: number = this.el.selectionStart;
      setTimeout(() => {
        this.setCursorPosition(position);
      }, 1);
    }

    private setCursorPosition(position: number) {
      this.el.selectionStart = position;
      this.el.selectionEnd = position;
    }

    private isIdxBetweenSelection(idx: number) {
      if (this.el.selectionStart === this.el.selectionEnd) {
        return false;
      }
      return (idx >= this.el.selectionStart && idx < this.el.selectionEnd);
    }

  }

  @Directive({
    selector: '[appTwoDigitDecimalNumber]',
  })
  export class TwoDigitDecimaNumberDirective {
    private regex: RegExp = new RegExp(/^\d+[.,]?\d{0,2}$/g);// user can put . or , char.
  // input also cannot start from , or .
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

    constructor(private el: ElementRef) {
    }

    @HostListener('input', ['$event'])
    OnInput(event: KeyboardEvent) {
      if (this.specialKeys.includes(event.key)) {
        return;
      }
      const current: string = this.el.nativeElement.value;
      const position = this.el.nativeElement.selectionStart;
      const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
      if (next && !String(next).match(this.regex)) {
        event.preventDefault();
      }
    }
  }
