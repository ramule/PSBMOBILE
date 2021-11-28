import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { pageLoaderService } from '../../../services/pageloader.service';
import { HttpRestApiService } from '../../../services/http-rest-api.service';
import { AppConstants } from '../../../app.constant';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { ContactUsService } from './contact-us.service';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PluginService } from 'src/app/services/plugin-service';
import { Location } from '@angular/common';
import { FormValidationService } from '../../../services/form-validation.service';
declare var showToastMessage: any;
declare var cordova:any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  callbackForm: FormGroup;
  headerContact:any = [];
  contactCenter:any = [];
  visitedURL = "";
  headOffDepartment:any = [];
  upiHelpline: any;
  commonPageComponent = {
    'headerType': 'notLoginPrelogin',
    'sidebarNAv': false,
    'footer': 'innerFooter',
    'currentpageRoute': '/contactus'
  }
  callbackdata;
  callbackRequestFlag:boolean = false;
  referenceNo;
  tollFreeNumber;
  blockATMDebitCard;
  requestCallback;
  emailID;

  phoneBankingServicesNo;
  balanceEnquiryNo;
  debitFreezeAccountNo;

  constructor(
    public DataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    public localStorage: LocalStorageService,
    private contactUsService: ContactUsService,
    private router: Router,
    public commonMethods: CommonMethods,
    private plugin:PluginService,
    private location: Location,
    private httpClient: HttpClient,
    private formValidation: FormValidationService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    // history.pushState({}, this.DataService.previousPageUrl, this.location.prepareExternalUrl(this.DataService.previousPageUrl));
    // history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    // this.DataService.removePreLoginFooterCss();
    this.ngZone.run(() => {
      if(this.DataService.bezellessIphone) {
        $("#mainDiv").removeClass("pre-login");
      }
    });

   this.DataService.changeMessage(this.commonPageComponent);

    var param = this.contactUsService.getcontactUsParam();
    this.contactUsApiCall(param);
    this.buildForm();
  }
  buildForm(){
    this.callbackForm = new FormGroup({
      mobNumber: new FormControl('',[Validators.required, Validators.pattern(/^[6-9]\d{9}$/), Validators.minLength(10)]),
      language: new FormControl('',[Validators.required]),
      timeSlot: new FormControl('',[Validators.required]),

    })
  }
   /**
   * api call to load contact details
   */
  contactUsApiCall(param){
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETCONTACTUSLIST).subscribe(data => {
      console.log("CONTACT US API RESPONSE => ");
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log("data.set.records" + data.set.records);
        data.set.records.forEach(el => {
          if(el.contactType == "Headers"){
            this.headerContact.push(el);
            console.log("HEADER ::::: ", this.headerContact)
          }else if(el.contactType == "Contact Center"){
            this.contactCenter.push(el);
          }else if(el.contactType == "Head Office Department"){
            this.headOffDepartment.push(el);
          } else if (el.contactType == "Visit URL") {
            this.visitedURL = el.phoneNumber;
          }
        });
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }
  openCallBAckPoupup(){
    this.commonMethods.openPopup('div.collectPhoneNo')
  }
  validatesForm() {
    if (this.callbackForm.invalid) {
      this.formValidation.markFormGroupTouched(this.callbackForm);
      return;
    }
  }
  requestCallbackService(){
    this.validatesForm();


    if(this.callbackForm.valid){
      this.contactUsService.callbackParam(this.callbackForm.value)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "TokenID":this.constant.crm_TOKEN
      })
    };

    this.httpClient.post(this.constant.publicURL.crmURL + this.constant.serviceName_CALLBACK, this.callbackdata, httpOptions)
    .subscribe(
    data  => {
        console.log("POST Request is successful ", data);
        this.referenceNo = data[0].CBRefNo
        this.callbackRequestFlag = true
        },
        error  => {
          this.commonMethods.closePopup('div.collectPhoneNo')
          this.DataService.errorMsg = "Sorry, Something went wrong!"
          this.DataService.primaryBtnText ="Close"
          this.commonMethods.openPopup('div.show-common-error')
          console.log("Error", error);

        }

    );
  }
}
  openWebsite(){
    if (!this.DataService.isCordovaAvailable) window.open("https://punjabandsindbank.co.in");
    else cordova.InAppBrowser.open("https://punjabandsindbank.co.in", '_blank', 'location=no');
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result,"error");
  }

  faqNavigate(){
    this.router.navigateByUrl('/omniFaq');
  }
  /**
   * navigate to login page
   */
   cancelContact(){
    this.location.back();
  }

  openPopup(value){
    switch(value){
      case 'debitFreeze' :
          this.commonMethods.openPopup('div.debit-freeze-popup')
        break ;

      case 'debitCardBlock':
          this.commonMethods.openPopup('div.atm-card-block-popup')
        break ;
    }
  }

 closePopup(){
   this.commonMethods.closeAllPopup() ;
   this.callbackRequestFlag = false
 }

}
