import { Component, OnInit, ChangeDetectorRef, ɵConsole ,HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { OtpAPIService } from './otp.service'
import { AppConstants } from '../../../../app.constant';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { FormValidationService } from '../../../../services/form-validation.service';
declare var showToastMessage: any;
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  otpForm: FormGroup;
  mobNumber :any;

  public formErrors = {
    otpnumber: ''
  };
  commonPageComponent = {
    'headerType': 'none',
    'sidebarNAv' :false,
    'footer':'none',
  } 
  //listner for all focusout event
  @HostListener("focusout")
  onBlur() {
    //call form validarion on focus out
    this.formErrors = this.formValidation.validateForm(this.otpForm, this.formErrors, true);
  }

  constructor(private form: FormBuilder,private formValidation: FormValidationService , private router: Router, private chRef: ChangeDetectorRef, public DataService: DataService, private commonMethod: CommonMethods, private psbApiService: HttpRestApiService, private otpService: OtpAPIService, private constant: AppConstants, private localStorage: LocalStorageService,private storage:LocalStorageService) {

  }

  ngOnInit() {
    this.initialization();
  }

  ngAfterViewInit(){
    this.resendotp();
  }


  initialization(){
     this.DataService.changeMessage(this.commonPageComponent);
    this.mobNumber = this.commonMethod.maskMobileNumber(this.storage.getLocalStorage(this.constant.storage_mobileNo));
    this.buildForm();
  }

  buildForm(){
    this.otpForm = new FormGroup({
      otpnumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(4) ,Validators.maxLength(4), Validators.maxLength(4)]),
    });

  }

  /**
   * Form Validation function
   */
  validateForm() {
    if (this.otpForm.invalid) {
      this.otpForm.get('otpnumber').markAsTouched();
      this.otpForm.valueChanges.subscribe((data)=>{
        this.formErrors = this.formValidation.validateForm(this.otpForm, this.formErrors, true);
      })
      return;
    }
  }

  /**
   * otp cancel function
   */
  otpcancel() {
    this.DataService.loginData.mobnumber = "";
    this.DataService.loginData.tab = "user";
    this.router.navigate([this.DataService.otpPreviousPage]);
  }

  /**
   * To resend otp
   */
  resendotp() {
    console.log("resendotp");
    this.otpForm.reset();
    var resendOTPReq = this.otpService.getResendOTPReq(this.DataService.otpPreviousPage);
    console.log(this.localStorage.getLocalStorage("deviceId"),resendOTPReq);
    this.invokeBankingService(resendOTPReq, this.localStorage.getLocalStorage("deviceId"), this.constant.serviceName_RESENDOTP);
  }


  /**
   * Handle send otp and resend otp in this function
   * @param inputData 
   * @param deviceId 
   * @param endPoint 
   */
  invokeBankingService(inputData, deviceId, endPoint) {
    this.psbApiService.callBankingAPIService(inputData, deviceId, endPoint).subscribe((result) => {
      console.log(result);
      if (result.responseParameter.opstatus == "00") {
        switch (true) {
          case endPoint == this.constant.serviceName_RESENDOTP:
            showToastMessage(result.responseParameter.Result, 'success');
            break;
          case endPoint == this.constant.serviceName_VALIDATEOTP:
            if(result.hasOwnProperty('set')){
              let resp = result.responseParameter;
              this.DataService.customerAccountList = result.set.records;
              this.DataService.customerAccountList.forEach(el => {
                if(el.accountCategory == "SAVING" || el.accountCategory == "CURRENT"){
                  this.DataService.customerCanTransferAccountList.push(el);
                }
              });
              this.DataService.themeName = resp.themeName;
              this.DataService.setTheme(resp.themeName);
              this.DataService.setThemeDetails({themeName:resp.themeName,sideBarColor:resp.themeSideColor,sideBarBg:resp.themeSideBackground,menuOption:resp.themeMenuOption});
            }
            if(this.DataService.otpPreviousPage == "/login" || this.DataService.otpPreviousPage == "/loginMobile"){
              this.DataService.userDetails = result.responseParameter;
              this.DataService.userDetails.totalAssets = result.responseParameter.totalAssets;
              this.DataService.userDetails.totalLiabilities = result.responseParameter.totalLiabilities;
              this.storage.setSessionStorage("isLoggedIn", "true");
              this.DataService.loginData.mobnumber = result.responseParameter.MobileNo;  
            }
            if(this.DataService.otpPreviousPage == "/registrationMobCheck" && result.responseParameter.ISCBS == "N"){
              this.DataService.otpNextPage ="/nonRegistered"
            }
            
            this.router.navigate([this.DataService.otpNextPage]);
            break;
          default:
            break;
        }
      }

      else {
        if (result.responseParameter.Result != "") {
          showToastMessage(result.responseParameter.Result);
        }
      }

    });
  }

  /**
   * Send OTP function
   */
  sendotp() {
    this.validateForm()
    if (this.otpForm.valid) {
      console.log(this.otpForm.value)
      var sendOTPReq = this.otpService.getSendOTPReq(this.otpForm.value.otpnumber,this.DataService.otpPreviousPage); 
      this.invokeBankingService(sendOTPReq, this.localStorage.getLocalStorage("deviceId"), this.constant.serviceName_VALIDATEOTP);
    } 
  }


}
