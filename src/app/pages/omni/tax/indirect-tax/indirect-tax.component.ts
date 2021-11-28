import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-indirect-tax',
  templateUrl: './indirect-tax.component.html',
  styleUrls: ['./indirect-tax.component.scss']
})
export class IndirectTaxComponent implements OnInit {

  constructor( private router:Router, public dataService: DataService) { }

  customExciseLink = 'https://epayment.icegate.gov.in/epayment/locationAction.action'

  gstLink ='https://services.gst.gov.in/services/login'

  ngOnInit(): void {
    this.dataService.setPageSettings('INDIRECT_TAX');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('INDIRECT_TAX' , this.router.url)
    this.buildForm() ;
  }

  indirectTaxForm : FormGroup ;
  gstPaymentForm : FormGroup ;

    buildForm() {
      this.indirectTaxForm = new FormGroup({
        termsCondition: new FormControl('', [Validators.required]),
      });

      this.gstPaymentForm = new FormGroup({
        termsCondition: new FormControl('', [Validators.required]),
      });
    }
  
    validateForm(value){
      switch(value) {
        case 'customDuty' :
          if (this.indirectTaxForm.invalid) {
            this.indirectTaxForm.get('termsCondition').markAsTouched();
          }
          break;

        case 'gstPayment' :
          if (this.gstPaymentForm.invalid) {
            this.gstPaymentForm.get('termsCondition').markAsTouched();
          }
          break ;
      }
    }

  indirectTaxSubmit(linkType : any){

    switch(linkType){
      case  'customDuty' : 
        if(this.indirectTaxForm.valid){
          this.router.navigate([]).then(result => {  window.open(this.customExciseLink, '_blank'); });
        } else{
          this.validateForm('customDuty') ;
        }

      break ;

      case 'gstPayment' :
        if(this.gstPaymentForm.valid){
          this.router.navigate([]).then(result => {  window.open(this.gstLink, '_blank'); });
        } else{
          this.validateForm('gstPayment') ;
        }

        break ;
    }

  }
}
