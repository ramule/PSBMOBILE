
import { Component, OnInit, NgZone, Self, HostListener, ViewChildren, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormValidationService } from '../../../../services/form-validation.service';
//import {FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AppConstants } from 'src/app/app.constant';
import { Location } from '@angular/common';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TermsConditonsComponent } from 'src/app/pages/common-ui/terms-conditons/terms-conditons.component';
declare var showToastMessage: any;
@Component({
  selector: 'app-more-services',
  templateUrl: './more-services.component.html',
  styleUrls: ['./more-services.component.scss']
})
export class MoreServicesComponent implements OnInit { 
  
  constructor(
    private router:Router, 
    public DataService: DataService,
    private constant: AppConstants,
    private location: Location,
    public commonMethods: CommonMethods,
    private httpClient: HttpClient,
    private formValidation: FormValidationService,
    public datePipe: DatePipe,
  ) { }
  isPSBCustomer:boolean = false;
  resultmsg
  errormsg
  loanForm: FormGroup;
  loantype=["Retail" , "Corporate"]
  LeadSubCategory=["Savings (Digital)" , "NRE", "NRO", "Others" ]
  CategoryList=["Savings" , "Current", "CC", "OD"]
  todayDate: any;
  fromSubmitFlag:boolean =false;
  commonPageComponent = {
    'headerType': 'notLoginPrelogin',
    'sidebarNAv': false,
    'footer': 'innerFooter',
    'currentpageRoute': '/contactus'
  }
  termsConditionType : any ='';

  @ViewChild(TermsConditonsComponent) childTermsReg: TermsConditonsComponent;

  loanEnquiryMsgBody
  ngOnInit(): void {
    this.DataService.changeMessage(this.commonPageComponent);
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.buildForm()
  }
  openLoanLeadpopup(){
    this.commonMethods.openPopup('div.loanLead')

  }
  closePopup(){
    this.commonMethods.closeAllPopup() ;
    this.fromSubmitFlag = false;
    this.loanForm.reset();
   
  }
  goto(route){

    this.DataService.gotpage =  route
    this.router.navigateByUrl('/login');
  }
  buildForm(){
    this.loanForm = new FormGroup({
      FullName :  new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
      mobNumber: new FormControl('',[Validators.required, Validators.pattern(/^[6-9]\d{9}$/), Validators.minLength(10)]),      
      EmailId: new FormControl('', [ Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      DOB: new FormControl('', [Validators.required]),
      LeadSector: new FormControl(this.loantype[0], [Validators.required]),
      LeadCategory: new FormControl(this.CategoryList[0], [Validators.required]),
      AccountNumber: new FormControl('',),
      IsAccount: new FormControl('No', [Validators.required]),
      PresentAddress: new FormControl('', [Validators.required]),
      PresentCountry: new FormControl('', [Validators.required]),
      LeadSubCategory: new FormControl(this.LeadSubCategory[0], [Validators.required]),
    })
  }
  validatesForm() {
    if (this.loanForm.invalid) {
      this.formValidation.markFormGroupTouched(this.loanForm);
      return;
    }
  }
  loanRequest(){


    let  endopintName
    this.validatesForm();
    if(this.loanForm.valid){
        if(this.loanForm.value.LeadSubCategory == "NRE" ||this.loanForm.value.LeadSubCategory == "NRO" ){

          endopintName = this.constant.serviceName_NRIACCTLEAD
        }else{
          endopintName =  this.constant.serviceName_INSTACCLEAD
        }

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "TokenID":this.constant.crm_TOKEN
        })
      };



      this.loanEnquiryMsgBody= {
        "body":{
       
       "LeadSector":this.loanForm.value.LeadSector,
       "LeadCategory":this.loanForm.value.LeadCategory,
       "LeadSubCategory":"Savings (Digital)",
       "IsAccount":this.loanForm.value.IsAccount,
       "AccountNumber":this.loanForm.value.AccountNumber,
       "ModeOfOprn":"Single",
       "FullName":this.loanForm.value.FullName,
       "MobileNumber":this.loanForm.value.MobileNumber,
       "EmailId":this.loanForm.value.EmailId,
       "DOB":this.loanForm.value.DOB,
       "Constitution":"Individual",
       "PresentAddress":this.loanForm.value.PresentAddress,
       "PresentCountry":this.loanForm.value.PresentCountry,
       "PresentState":"",
       "PresentDistrict":"",
       "PresentCity":"",
       "PresentPincode":"",
       "BranchCode":"",
       "BranchName":"",
       "ZoneCode":"",
       "ZoneName":"",
       "AcctClsFlg":"N"
     
       }
      }



      this.httpClient.post(this.constant.publicURL.crmURL + endopintName, this.loanEnquiryMsgBody, httpOptions)
      .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      if( data[0].Success == "200"){
        this.fromSubmitFlag = true
        this.resultmsg = data[0].LeadRefNo 
      }else{
        this.errormsg = "Something Went Wrong!"
      }
      },
      error  => {
      
      console.log("Error", error);
      
      }
      
      );
 
    }

  }
  onTypeChange(type){
   
    if(type == "Yes"){
      this.isPSBCustomer= true
      this.loanForm.get('AccountNumber').setValidators([Validators.required]);
    }else{
      this.loanForm.get('AccountNumber').clearValidators();
      this.isPSBCustomer= false
      
    }
    this.loanForm.get('AccountNumber').updateValueAndValidity();
  }
  closeService(){
    if(this.constant.getPlatform() == "web"){
      this.DataService.routeWithNgZone(this.DataService.previousPageUrl);
    }
    else{
      this.location.back();
    }
    // this._location.back();
    // this.router.navigateByUrl(this.pagesetting.currentpageRoute)
    
  }

  comingSoon(){
    showToastMessage("Coming Soon",  "success");
  }

  openTermsCondition(){
    this.termsConditionType = 'termsConditionMoreServices'
    this.childTermsReg.openPopupTerms() ;
  }

}
