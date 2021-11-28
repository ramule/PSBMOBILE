import { AbstractControl, ValidationErrors } from "@angular/forms"

export const PasswordStrengthValidator = function (control: AbstractControl): ValidationErrors | null {

  let value: string = control.value || '';
  let msg = "";
  if (!value) {
    return null
  }

  let upperCaseCharacters = /[A-Z]+/g;
  let lowerCaseCharacters = /[a-z]+/g;
  let numberCharacters = /[0-9]+/g;
  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (upperCaseCharacters.test(value) === false || lowerCaseCharacters.test(value) === false || numberCharacters.test(value) === false || specialCharacters.test(value) === false) {
    return {
      passwordStrength: 'PASSWORD_VALIDATION_MSG'
    }

  }

  /*let upperCaseCharacters = /[A-Z]+/g
  if (upperCaseCharacters.test(value) === false) {
    return { passwordStrength: `Upper case required` };
  }

  let lowerCaseCharacters = /[a-z]+/g
  if (lowerCaseCharacters.test(value) === false) {
    return { passwordStrength: `lower case required` };
  }


  let numberCharacters = /[0-9]+/g
  if (numberCharacters.test(value) === false) {
    return { passwordStrength: `number required` };
  }

  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
  if (specialCharacters.test(value) === false) {
    return { passwordStrength: `Special char required` };
  }
   return { 
    passwordStrength:null  
  }*/

}