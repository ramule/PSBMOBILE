import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Component({
  selector: 'app-terms-conditons',
  templateUrl: './terms-conditons.component.html',
  styleUrls: ['./terms-conditons.component.scss']
})
export class TermsConditonsComponent implements OnInit {

  constructor(
    private commonMethods : CommonMethods,
    public dataService : DataService
  ) { }

  @Input() termsConditionType;

  termsConditionForm : FormGroup
  
  ngOnInit(): void {
    this.buildForm();
    console.log("Rgistration Type :: ", this.termsConditionType)
  }

  openPopupTerms(){
    this.commonMethods.openPopup('div.terms-conditions-popup')
  }

  closeTerms(){
    this.commonMethods.closeAllPopup();
  }

  buildForm(){
    if(this.termsConditionType != 'termsConditionRegistration'){
      this.termsConditionForm = new FormGroup({
        terms: new FormControl('', [Validators.required])
      })
    }else{
      this.termsConditionForm = new FormGroup({
        terms: new FormControl('')
      })
    }
  
  }

  validateForm(){
    if(this.termsConditionForm.invalid){
      this.termsConditionForm.get('terms').markAsTouched();
  }
}

submit(){
  if(this.termsConditionForm.valid){
    this.commonMethods.termAccepted(this.termsConditionForm.value.terms);
    this.closeTerms()
   
  }else{
    this.validateForm();
  }
}
}
