import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomCurrencyPipe } from '../pipes/custom-currency.pipe';
import { getCurrencySymbol } from '@angular/common';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor(private customCurrencyPipe: CustomCurrencyPipe) { }

  /**
   * get all values of the formGroup, loop over them
   * then mark each field as touched
   */
  public markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control['controls']) {
        control['controls'].forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  public markFormGroupUntouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsUntouched();

      if (control['controls']) {
        control['controls'].forEach(c => this.markFormGroupUntouched(c));
      }
    });
  }

  /**
   * common message in case of error
   */
  public validationMessages() {
    const messages = {
      required: '* This field is required',
      email: '* This email address is invalid',
      minlength: '* Length is too short',
      maxlength: '* Length is too long',
      invalid_characters: (matches: any[]) => {

        let matchedCharacters = matches;

        matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
          let string = characterString;
          string += character;

          if (matchedCharacters.length !== index + 1) {
            string += ', ';
          }

          return string;
        }, '');

        return `These characters are not allowed: ${matchedCharacters}`;
      },
    };

    return messages;
  }

  /**
   * Validate form instance
   * check_dirty true will only emit errors if the field is touched
   * check_dirty false will check all fields independent of
   * being touched or not. Use this as the last check before submitting
   */
  public validateForm(formToValidate: FormGroup, formErrors: any, checkDirty?: boolean) {
    const form = formToValidate;
    for (const field in formErrors) {
      if (field) {
        formErrors[field] = '';
        const control = form.get(field);
        const messages = this.validationMessages();
        if (control && !control.valid) {
          if (!checkDirty || (control.dirty || control.touched)) {
            for (const key in control.errors) {
              console.log("======>inside", key);
              if (key && key !== 'invalid_characters') {
                formErrors[field] = formErrors[field] || messages[key];
              } else {
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              }
            }
          }
        }
      }
    }

    return formErrors;
  }

  formatCurrency(value, formGroup: FormGroup, currency?:any) {
    if (value == '0') {
      if (formGroup.contains('amount')) formGroup.get('amount').reset();
      return;
    }
    if (value != '') {
      let updatedCurrency = this.customCurrencyPipe.transform(value.trim(), 'decimal');
      if (updatedCurrency.trim().replace(/[^.0-9]+/g, '') == ' 0.00') {
        if (formGroup.contains('amount')) formGroup.get('amount').reset();
      } else {
        if(updatedCurrency.trim().replace(/[^.0-9]+/g, '') == '0'){
          formGroup.get('amount').reset()
        }else{
          console.log(updatedCurrency);
          formGroup.patchValue({ amount: updatedCurrency });
          //formGroup.patchValue({ amount: updatedCurrency });

        }
      }
      // this.amountInWords = this.commonMethod.convertNumberToWords(value);
    } else {
      // this.amountInWords ="";
      formGroup.get('amount').reset('')
    }
  }

  formatTransLimit(value, formGroup: FormGroup) {
    if (value == '0') {
      if (formGroup.contains('transactionLimit')) formGroup.get('transactionLimit').reset();
      return;
    }
    if (value != '') {
      let updatedCurrency = this.customCurrencyPipe.transform(value.trim(), 'decimal');
      if (updatedCurrency == ' 0.00') {
        if (formGroup.contains('transactionLimit')) formGroup.get('transactionLimit').reset();
      } else {
        if(updatedCurrency.trim() == '0'){
          formGroup.get('transactionLimit').reset()
        }else{
          console.log(updatedCurrency);
          formGroup.patchValue({ transactionLimit:  updatedCurrency });
          //formGroup.patchValue({ amount: updatedCurrency });
        }
      }
      // this.amountInWords = this.commonMethod.convertNumberToWords(value);
    } else {
      // this.amountInWords ="";
      formGroup.get('transactionLimit').reset('')
    }
  }


  formatDynamicCurrency(id,formGroup: FormGroup) {
    if ($('#'+id).val() && $('#'+id).val() != "₹ 0.00") {
      formGroup.patchValue({ amount:$('#'+id).val() });
    } else {
      formGroup.get('amount').reset('')
    }
  }



  deFormatValue(value, formGroup: FormGroup){
    formGroup.patchValue({ amount: value.replace(/[^0-9.]+/g,'') });
  }

  formatAmtCurrency(value, formGroup: FormGroup, ctrlName) {
    if (value == '0') {
      if (formGroup.contains(ctrlName)) formGroup.get(ctrlName).reset();
      return;
    }
    if (value != '') {
      let updatedCurrency = this.customCurrencyPipe.transform(value.trim(), 'decimal');
      if (updatedCurrency == ' 0.00') {
        if (formGroup.contains(ctrlName)) formGroup.get(ctrlName).reset();
      } else {
        if(updatedCurrency.trim() == '0'){
          formGroup.get(ctrlName).reset()
        }else{
        formGroup.controls[ctrlName].patchValue("₹" + updatedCurrency);
        }
      }
      // this.amountInWords = this.commonMethod.convertNumberToWords(value);
    } else {
      // this.amountInWords ="";
      formGroup.get(ctrlName).reset('')
    }
  }
}
