import { Component, NgZone, OnInit, ViewChildren} from '@angular/core';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { AppConstants } from '../../../../app.constant';
import { DataService } from '../../../../services/data.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationService } from '../../../../services/form-validation.service';
import { ProfileUpdateService } from './profile-update.service';
import { PluginService } from 'src/app/services/plugin-service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { timer, Subscription } from "rxjs";
import { ProfileDetailsService } from '../profile-details/profile-details.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { DashboardService } from '../../../omni/dashboard/dashboard.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
declare var showToastMessage: any;
declare var $: any;
declare var cordova:any;

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {
  sessionDecryptKey: any;
  failedAttempts :number=0;
  @ViewChildren('tpinRow') tPinRows: any;
  @ViewChildren('tpinNewRow') newTPinRows: any;
  @ViewChildren('tpinConfirmRow') confirmTPinRows: any;

  @ViewChildren('mpinRow') mPinRows: any;
  @ViewChildren('mpinNewRow') newMPinRows: any;
  @ViewChildren('mpinConfirmRow') confirmMPinRows: any;

  @ViewChildren('otpRow') otpRows: any;

  mpinInput = ['oldMpin1', 'oldMpin2', 'oldMpin3', 'oldMpin4','oldMpin5','oldMpin6']
  mpinNewInput = ['newpMpin1', 'newpMpin2', 'newpMpin3', 'newpMpin4','newpMpin5','newpMpin6']
  mpinConfirmInput = ['confirmMpin1', 'confirmMpin2', 'confirmMpin3', 'confirmMpin4','confirmMpin5','confirmMpin6']

  tpinInput = ['oldTpin1', 'oldTpin2', 'oldTpin3', 'oldTpin4','oldTpin5','oldTpin6']
  tpinNewInput = ['newTpin1', 'newTpin2', 'newTpin3', 'newTpin4','newTpin5','newTpin6']
  tpinConfirmInput = ['confirmTpin1', 'confirmTpin2', 'confirmTpin3', 'confirmTpin4','confirmTpin5','confirmTpin6']

  otpInput = ['otp1', 'otp2', 'otp3', 'otp4','otp5','otp6']

  profileForm : FormGroup;
  mPinForm : FormGroup ;
  tpinForm : FormGroup ;
  otpForm: FormGroup;
  changePasswordForm:FormGroup;
  lastLogin: any;
  selectionValue : any ;
  profileImage: any = "";
  _profileImage: any = "";
  userName: any;
  mobileNo = "";
  accNo="";
  fileToUpload: File = null;

  tpinError = "";
  newTpinError = "";
  newTpinError1 = "";
  confirmTpinError = "";
  mpinError = "";
  newMpinError = "";
  confirmMpinError = "";
  platform:any;
  tabSelection : any ;
  PasswordError="";
  countDown: Subscription;
  counter = 120;
  tick = 1000;
  information = ''
  croppedImageBase64 = '';
  maskedMobileNo: any;
  errorMsg:any = "";

  constructor(
    private form: FormBuilder,
    public constant: AppConstants,
    private router: Router,
    public dataService: DataService,
    private storage: LocalStorageService ,
    private formValidation: FormValidationService,
    private http: HttpRestApiService,
    private profileService : ProfileUpdateService,
    private pluginService : PluginService,
    private commonMethod:CommonMethods,
    private encryptDecryptService: EncryptDecryptService,
    private profileUpdateService:ProfileUpdateService,
    private ngZone:NgZone,
    private profileDtlsService:ProfileDetailsService,
    private domSanitizer : DomSanitizer,
    private dashboardService: DashboardService,
    private idle: Idle,
    ) { }


  ngOnInit() {
    this.dataService.setShowThemeObservable(true);
    this.dataService.setShowsideNavObservable(true);
    this.dataService.setShowNotificationObservable(true);
    let profileTitle = this.dataService.profileTabSelection == 'password' ? 'Change Password' : this.dataService.profileTabSelection == 'mpin' ? 'Change MPIN' : this.dataService.profileTabSelection == 'tpin' ? 'Change TPIN' : 'Profile Update'
    this.dataService.setPageSettings(profileTitle);
    this.dataService.getBreadcrumb('UPDATE_CREDENTIALS' , this.router.url);
    this.maskedMobileNo = this.maskCharacter(this.storage.getLocalStorage(this.constant.storage_mobileNo), 4);
    this.selectionValue = this.dataService.profileTabSelection;
    this. buildForm();
    console.log("platform=========",this.constant.getIsCordova());
    this.platform= this.constant.getIsCordova();
    console.log("username=======", this.dataService.profileDetails[0].webLastLogin);

    //this.selectImageFromGallery();
  }

  openPopup(popupName) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
     //this.getResendOTPSession()
}

  closePopup(popupName) {
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
    this.otpForm.reset();
    this.counter = 120;

    // this.commonMethod.openPopup('div.success12');
    if(popupName == 'success1') {
      this.logoutapp();
    }
  }

  LoginAgain(){
    this.commonMethod.closePopup('div.success12');
    // this.router.navigateByUrl('/login');
    this.logoutapp();
  }

  logoutapp() {
    // need to change after some time
    let logoutReqParams = this.dashboardService.getLogoutParams();
    this.http.callBankingAPIService(logoutReqParams, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOGOUT).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.dataService.isLogOutOmni = true;
        this.idle.stop();
        this.commonMethod.closePopup('div.popup-bottom.timeout1')
        if (this.dataService.isUPILogin) {
          this.router.navigate(['/upiLogin'], { replaceUrl: true });
          this.storage.clearSessionStorage();
        } else {
          this.dataService.isLoggedIn = false;
          this.dataService.setShowThemeObservable(false);
          this.dataService.showDetails = false;
          if (this.constant.getPlatform() == "web") {
            showToastMessage(resp.Result, 'success')
            this.router.navigate(['/login'], { replaceUrl: true });
          }
          else {
            this.router.navigate(['/loginMobile'], { replaceUrl: true });
          }
        }

      }
      else {
        // this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  /**
   * function to intilize form
   */
  buildForm() {

    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    },{
        validators: [this.checkPasswordMisMatch.bind(this), this.checkOldNewPassMisMatch.bind(this)]
      });

    this.mPinForm = new FormGroup({
      oldMpin1: new FormControl('', [Validators.required]),
      oldMpin2: new FormControl('', [Validators.required]),
      oldMpin3: new FormControl('', [Validators.required]),
      oldMpin4: new FormControl('', [Validators.required]),
      oldMpin5: new FormControl('', [Validators.required]),
      oldMpin6: new FormControl('', [Validators.required]),
      newpMpin1: new FormControl('', [Validators.required]),
      newpMpin2: new FormControl('', [Validators.required]),
      newpMpin3: new FormControl('', [Validators.required]),
      newpMpin4: new FormControl('', [Validators.required]),
      newpMpin5: new FormControl('', [Validators.required]),
      newpMpin6: new FormControl('', [Validators.required]),
      confirmMpin1: new FormControl('', [Validators.required]),
      confirmMpin2: new FormControl('', [Validators.required]),
      confirmMpin3: new FormControl('', [Validators.required]),
      confirmMpin4: new FormControl('', [Validators.required]),
      confirmMpin5: new FormControl('', [Validators.required]),
      confirmMpin6: new FormControl('', [Validators.required]),
    },{
      validators: [this.mpinMisMatch.bind(this), this.checkOldNewMpinMismatch.bind(this)]
     });

    this.tpinForm = new FormGroup({
      oldTpin1: new FormControl('', [Validators.required]),
      oldTpin2: new FormControl('', [Validators.required]),
      oldTpin3: new FormControl('', [Validators.required]),
      oldTpin4: new FormControl('', [Validators.required]),
      oldTpin5: new FormControl('', [Validators.required]),
      oldTpin6: new FormControl('', [Validators.required]),
      newTpin1: new FormControl('', [Validators.required]),
      newTpin2: new FormControl('', [Validators.required]),
      newTpin3: new FormControl('', [Validators.required]),
      newTpin4: new FormControl('', [Validators.required]),
      newTpin5: new FormControl('', [Validators.required]),
      newTpin6: new FormControl('', [Validators.required]),
      confirmTpin1: new FormControl('', [Validators.required]),
      confirmTpin2: new FormControl('', [Validators.required]),
      confirmTpin3: new FormControl('', [Validators.required]),
      confirmTpin4: new FormControl('', [Validators.required]),
      confirmTpin5: new FormControl('', [Validators.required]),
      confirmTpin6: new FormControl('', [Validators.required]),
    },{
      validators: [this.tpinMisMatch.bind(this), this.checkOldNewTpinMismatch.bind(this)]
    });

    // OTP Popup Form
    this.otpForm = new FormGroup({
      otp1: new FormControl('', [Validators.required]),
      otp2: new FormControl('', [Validators.required]),
      otp3: new FormControl('', [Validators.required]),
      otp4: new FormControl('', [Validators.required]),
      otp5: new FormControl('', [Validators.required]),
      otp6: new FormControl('', [Validators.required]),

    });
  }


  mpinMisMatch(formGroup: FormGroup) {
    const { value: newMpin1 } = formGroup.get('newpMpin1');
    const { value: newMpin2 } = formGroup.get('newpMpin2');
    const { value: newMpin3 } = formGroup.get('newpMpin3');
    const { value: newMpin4 } = formGroup.get('newpMpin4');
    const { value: newMpin5 } = formGroup.get('newpMpin5');
    const { value: newMpin6 } = formGroup.get('newpMpin6');
    let Mpin = newMpin1 + newMpin2 + newMpin3 + newMpin4 + newMpin5 + newMpin6;

    const { value: confirmMpin1 } = formGroup.get('confirmMpin1');
    const { value: confirmMpin2 } = formGroup.get('confirmMpin2');
    const { value: confirmMpin3 } = formGroup.get('confirmMpin3');
    const { value: confirmMpin4 } = formGroup.get('confirmMpin4');
    const { value: confirmMpin5 } = formGroup.get('confirmMpin5');
    const { value: confirmMpin6 } = formGroup.get('confirmMpin6');
    let confirmMpin = confirmMpin1 + confirmMpin2 + confirmMpin3 + confirmMpin4 + confirmMpin5 + confirmMpin6;

    return Mpin === confirmMpin ? null : { mpinNotMatch: true };
  }

  tpinMisMatch(formGroup: FormGroup) {
    const { value: newTpin1 } = formGroup.get('newTpin1');
    const { value: newTpin2 } = formGroup.get('newTpin2');
    const { value: newTpin3 } = formGroup.get('newTpin3');
    const { value: newTpin4 } = formGroup.get('newTpin4');
    const { value: newTpin5 } = formGroup.get('newTpin5');
    const { value: newTpin6 } = formGroup.get('newTpin6');
    let Tpin = newTpin1 + newTpin2 + newTpin3 + newTpin4 + newTpin5 + newTpin6;

    const { value: confirmTpin1 } = formGroup.get('confirmTpin1');
    const { value: confirmTpin2 } = formGroup.get('confirmTpin2');
    const { value: confirmTpin3 } = formGroup.get('confirmTpin3');
    const { value: confirmTpin4 } = formGroup.get('confirmTpin4');
    const { value: confirmTpin5 } = formGroup.get('confirmTpin5');
    const { value: confirmTpin6 } = formGroup.get('confirmTpin6');
    let confirmTpin = confirmTpin1 + confirmTpin2 + confirmTpin3 + confirmTpin4 + confirmTpin5 + confirmTpin6;

    return Tpin === confirmTpin ? null : { tpinNotMatch: true };
  }

  checkOldNewTpinMismatch(formGroup: FormGroup) {

    const { value: oldTpin1 } = formGroup.get('oldTpin1');
    const { value: oldTpin2 } = formGroup.get('oldTpin2');
    const { value: oldTpin3 } = formGroup.get('oldTpin3');
    const { value: oldTpin4 } = formGroup.get('oldTpin4');
    const { value: oldTpin5 } = formGroup.get('oldTpin5');
    const { value: oldTpin6 } = formGroup.get('oldTpin6');
    let oldTpin = oldTpin1 + oldTpin2 + oldTpin3 + oldTpin4 + oldTpin5 + oldTpin6;

    const { value: newTpin1 } = formGroup.get('newTpin1');
    const { value: newTpin2 } = formGroup.get('newTpin2');
    const { value: newTpin3 } = formGroup.get('newTpin3');
    const { value: newTpin4 } = formGroup.get('newTpin4');
    const { value: newTpin5 } = formGroup.get('newTpin5');
    const { value: newTpin6 } = formGroup.get('newTpin6');
    let newTpin = newTpin1 + newTpin2 + newTpin3 + newTpin4 + newTpin5 + newTpin6;

    return oldTpin != newTpin ? null : { oldNewTpinNotMatch: true };
  }



  checkOldNewMpinMismatch(formGroup: FormGroup) {

    const { value: oldMpin1 } = formGroup.get('oldMpin1');
    const { value: oldMpin2 } = formGroup.get('oldMpin2');
    const { value: oldMpin3 } = formGroup.get('oldMpin3');
    const { value: oldMpin4 } = formGroup.get('oldMpin4');
    const { value: oldMpin5 } = formGroup.get('oldMpin5');
    const { value: oldMpin6 } = formGroup.get('oldMpin6');
    let oldMpin = oldMpin1 + oldMpin2 + oldMpin3 + oldMpin4 + oldMpin5 + oldMpin6;

    const { value: newMpin1 } = formGroup.get('newpMpin1');
    const { value: newMpin2 } = formGroup.get('newpMpin2');
    const { value: newMpin3 } = formGroup.get('newpMpin3');
    const { value: newMpin4 } = formGroup.get('newpMpin4');
    const { value: newMpin5 } = formGroup.get('newpMpin5');
    const { value: newMpin6 } = formGroup.get('newpMpin6');
    let newMpin = newMpin1 + newMpin2 + newMpin3 + newMpin4 + newMpin5 + newMpin6;

    return oldMpin != newMpin ? null : { oldNewMpinNotMatch: true };
  }


  checkPasswordMisMatch(formGroup: FormGroup) {
    const { value: newPassword } = formGroup.get('newPassword');
    const { value: confirmNewPassword } = formGroup.get('confirmNewPassword');
    return newPassword === confirmNewPassword ? null : { passwordNotMatch: true };
  }

  checkOldNewPassMisMatch(formGroup: FormGroup) {
    const { value: oldPassword } = formGroup.get('oldPassword');
    const { value: newPassword } = formGroup.get('newPassword');
    return oldPassword != newPassword ? null : { passwordMatch : true };
  }

  /**
   * function to be called on initializion of page
   */
  initialize() {
    this.dataService.setPageSettings('UPDATE_PROFILE');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.buildForm();

  }

  customValidation() {
    if (this.selectionValue == 'mpin') {
      this.mPinForm.controls['oldMpin1'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['oldMpin2'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['oldMpin3'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['oldMpin4'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['oldMpin5'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['oldMpin6'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['newpMpin1'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['newpMpin2'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['newpMpin3'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['newpMpin4'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['newpMpin5'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['newpMpin6'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['confirmMpin1'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['confirmMpin2'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['confirmMpin3'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['confirmMpin4'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['confirmMpin5'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
      this.mPinForm.controls['confirmMpin6'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);

      this.mPinForm.controls['oldMpin1'].updateValueAndValidity();
      this.mPinForm.controls['oldMpin2'].updateValueAndValidity();
      this.mPinForm.controls['oldMpin3'].updateValueAndValidity();
      this.mPinForm.controls['oldMpin4'].updateValueAndValidity();
      this.mPinForm.controls['oldMpin5'].updateValueAndValidity();
      this.mPinForm.controls['oldMpin6'].updateValueAndValidity();
      this.mPinForm.controls['newpMpin1'].updateValueAndValidity();
      this.mPinForm.controls['newpMpin2'].updateValueAndValidity();
      this.mPinForm.controls['newpMpin3'].updateValueAndValidity();
      this.mPinForm.controls['newpMpin4'].updateValueAndValidity();
      this.mPinForm.controls['newpMpin5'].updateValueAndValidity();
      this.mPinForm.controls['newpMpin6'].updateValueAndValidity();
      this.mPinForm.controls['confirmMpin1'].updateValueAndValidity();
      this.mPinForm.controls['confirmMpin2'].updateValueAndValidity();
      this.mPinForm.controls['confirmMpin3'].updateValueAndValidity();
      this.mPinForm.controls['confirmMpin4'].updateValueAndValidity();
      this.mPinForm.controls['confirmMpin5'].updateValueAndValidity();
      this.mPinForm.controls['confirmMpin6'].updateValueAndValidity();
   }
   else {
    this.tpinForm.controls['oldTpin1'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['oldTpin2'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['oldTpin3'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['oldTpin4'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['oldTpin5'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['oldTpin6'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['newTpin1'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['newTpin2'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['newTpin3'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['newTpin4'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['newTpin5'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['newTpin6'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['confirmTpin1'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['confirmTpin2'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['confirmTpin3'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['confirmTpin4'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['confirmTpin5'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);
    this.tpinForm.controls['confirmTpin6'].setValidators([Validators.required,Validators.maxLength(1),Validators.minLength(1)]);

    this.tpinForm.controls['oldTpin1'].updateValueAndValidity();
    this.tpinForm.controls['oldTpin2'].updateValueAndValidity();
    this.tpinForm.controls['oldTpin3'].updateValueAndValidity();
    this.tpinForm.controls['oldTpin4'].updateValueAndValidity();
    this.tpinForm.controls['oldTpin5'].updateValueAndValidity();
    this.tpinForm.controls['oldTpin6'].updateValueAndValidity();
    this.tpinForm.controls['newTpin1'].updateValueAndValidity();
    this.tpinForm.controls['newTpin2'].updateValueAndValidity();
    this.tpinForm.controls['newTpin3'].updateValueAndValidity();
    this.tpinForm.controls['newTpin4'].updateValueAndValidity();
    this.tpinForm.controls['newTpin5'].updateValueAndValidity();
    this.tpinForm.controls['newTpin6'].updateValueAndValidity();
    this.tpinForm.controls['confirmTpin1'].updateValueAndValidity();
    this.tpinForm.controls['confirmTpin2'].updateValueAndValidity();
    this.tpinForm.controls['confirmTpin3'].updateValueAndValidity();
    this.tpinForm.controls['confirmTpin4'].updateValueAndValidity();
    this.tpinForm.controls['confirmTpin5'].updateValueAndValidity();
    this.tpinForm.controls['confirmTpin6'].updateValueAndValidity();
   }
  }


  validateForm() {
    if (this.selectionValue == 'password' && this.changePasswordForm.invalid) {
      this.changePasswordForm.get('oldPassword').markAsTouched();
      this.changePasswordForm.get('newPassword').markAsTouched();
      this.changePasswordForm.get('confirmNewPassword').markAsTouched();
    }
    else if(this.selectionValue == 'mpin' && this.mPinForm.invalid)
    {
      this.mPinForm.get('oldMpin1').markAsTouched();
      this.mPinForm.get('oldMpin2').markAsTouched();
      this.mPinForm.get('oldMpin3').markAsTouched();
      this.mPinForm.get('oldMpin4').markAsTouched();
      this.mPinForm.get('oldMpin5').markAsTouched();
      this.mPinForm.get('oldMpin6').markAsTouched();
      this.mPinForm.get('newpMpin1').markAsTouched();
      this.mPinForm.get('newpMpin2').markAsTouched();
      this.mPinForm.get('newpMpin3').markAsTouched();
      this.mPinForm.get('newpMpin4').markAsTouched();
      this.mPinForm.get('newpMpin5').markAsTouched();
      this.mPinForm.get('newpMpin6').markAsTouched();
      this.mPinForm.get('confirmMpin1').markAsTouched();
      this.mPinForm.get('confirmMpin2').markAsTouched();
      this.mPinForm.get('confirmMpin3').markAsTouched();
      this.mPinForm.get('confirmMpin4').markAsTouched();
      this.mPinForm.get('confirmMpin5').markAsTouched();
      this.mPinForm.get('confirmMpin6').markAsTouched();

    }
    else{
      this.tpinForm.get('oldTpin1').markAsTouched();
      this.tpinForm.get('oldTpin2').markAsTouched();
      this.tpinForm.get('oldTpin3').markAsTouched();
      this.tpinForm.get('oldTpin4').markAsTouched();
      this.tpinForm.get('oldTpin5').markAsTouched();
      this.tpinForm.get('oldTpin6').markAsTouched();
      this.tpinForm.get('newTpin1').markAsTouched();
      this.tpinForm.get('newTpin2').markAsTouched();
      this.tpinForm.get('newTpin3').markAsTouched();
      this.tpinForm.get('newTpin4').markAsTouched();
      this.tpinForm.get('newTpin5').markAsTouched();
      this.tpinForm.get('newTpin6').markAsTouched();
      this.tpinForm.get('confirmTpin1').markAsTouched();
      this.tpinForm.get('confirmTpin2').markAsTouched();
      this.tpinForm.get('confirmTpin3').markAsTouched();
      this.tpinForm.get('confirmTpin4').markAsTouched();
      this.tpinForm.get('confirmTpin5').markAsTouched();
      this.tpinForm.get('confirmTpin6').markAsTouched();
    }
  }

  onUpdate() {
    console.log("onUpdate");
    if(this.selectionValue == 'password' && this.changePasswordForm.valid) {

      if(this.changePasswordForm.value.oldPassword != this.changePasswordForm.value.newPassword){
        if(this.changePasswordForm.value.newPassword == this.changePasswordForm.value.confirmNewPassword) {
          this.openPopup('otp');
          this.getResendOTPSession(this.constant.val_CHANGEPASSWORD);
        }
      }
    }
    else if(this.selectionValue == 'mpin'){

      var oldMpin=this.mPinForm.value.oldMpin1+this.mPinForm.value.oldMpin2+this.mPinForm.value.oldMpin3+this.mPinForm.value.oldMpin4+this.mPinForm.value.oldMpin5+this.mPinForm.value.oldMpin6;
      var newMpin=this.mPinForm.value.newpMpin1+this.mPinForm.value.newpMpin2+this.mPinForm.value.newpMpin3+this.mPinForm.value.newpMpin4+this.mPinForm.value.newpMpin5+this.mPinForm.value.newpMpin6;
      var confirmMpin=this.mPinForm.value.confirmMpin1+this.mPinForm.value.confirmMpin2+this.mPinForm.value.confirmMpin3+this.mPinForm.value.confirmMpin4+this.mPinForm.value.confirmMpin5+this.mPinForm.value.confirmMpin6;

      oldMpin.length == 6 ? this.mpinError = '' : this.mpinError = 'Please Enter Old Mpin';
      newMpin.length == 6 ? this.newMpinError = '' : this.newMpinError = 'Please Enter New Mpin';
      confirmMpin.length == 6 ? this.confirmMpinError = '' : this.confirmMpinError = 'Please Enter Confirm Mpin';

      if(this.mPinForm.valid){
        this.openPopup('otp');
        this.getResendOTPSession(this.constant.val_CHANGEMPIN);
      }

   }
   else if(this.selectionValue == 'tpin') {
    // var recentMpin=this.dataService.regFeildData.mpin1+this.dataService.regFeildData.mpin2+this.dataService.regFeildData.mpin3+this.dataService.regFeildData.mpin4+this.dataService.regFeildData.mpin5+this.dataService.regFeildData.mpin6;
    // console.log("MPIN---->",recentMpin);
    var oldTpin=this.tpinForm.value.oldTpin1+this.tpinForm.value.oldTpin2+this.tpinForm.value.oldTpin3+this.tpinForm.value.oldTpin4+this.tpinForm.value.oldTpin5+this.tpinForm.value.oldTpin6;
    var newTpin=this.tpinForm.value.newTpin1+this.tpinForm.value.newTpin2+this.tpinForm.value.newTpin3+this.tpinForm.value.newTpin4+this.tpinForm.value.newTpin5+this.tpinForm.value.newTpin6;
    var confirmTpin=this.tpinForm.value.confirmTpin1+this.tpinForm.value.confirmTpin2+this.tpinForm.value.confirmTpin3+this.tpinForm.value.confirmTpin4+this.tpinForm.value.confirmTpin5+this.tpinForm.value.confirmTpin6;

    oldTpin.length == 6 ? this.tpinError = '' : this.tpinError = 'Please Enter Old Tpin';
    newTpin.length == 6 ? this.newTpinError = '' : this.newTpinError = 'Please Enter New Tpin';
    // recentMpin == newTpin ? this.newTpinError1 = '':this.newTpinError1 = 'Please Mpin and Tpin should not be same';
    confirmTpin.length == 6 ? this.confirmTpinError = '' : this.confirmTpinError = 'Please Enter Confirm Mpin';

    if(this.tpinForm.valid){
      this.openPopup('otp');
      this.getResendOTPSession(this.constant.val_CHANGETPIN);
    }
  }
  else
  {
    this.validateForm();
  }
}

  /**
   * function to be called on update profile
   */
  updateProfile(param){
    this.dataService.resetTransactionObj();
    this.dataService.request = param;
    this.dataService.endPoint = this.constant.serviceName_CUSTPROFILEUPDATE;
    this.dataService.authorizeHeader = "UPDATE_PROFILE";
    this.dataService.transactionReceiptObj.name =  this.userName;
    this.dataService.transactionReceiptObj.mobileNo = this.profileForm.get('mobileNo').value;
    this.dataService.transactionReceiptObj.emailId = this.profileForm.get('email').value;
    this.dataService.screenType = 'updateProfile';
    this.dataService.profileImg =this.profileImage;
    // if(this.DataService.otpName == 'TPIN'){
    //   this.router.navigateByUrl('/tpin');
    // }
    // else{
      this.router.navigateByUrl("/otpSession");
    // }
  }

   /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    //showToastMessage(resp.Result, "error");
  }


  /**
   * function to call native camera
   */
  camera(){
    // this.pluginService.cameraClick(this.onCameraSuccess,this.onCameraError);
    ($("#modal-changeProfile") as any).modal('hide');
    var self = this;
      this.pluginService.cameraClick().subscribe((result) => {
        self.onCameraSuccess(result);
        self.profileImage = "data:image/jpg;base64,"+result;
        console.log(self.profileImage);
      });
  }



  /**
   * function on camera success
   * @value
   */
  onCameraSuccess(value){

  }


  /**
   * function on camera error
   * @err
   */
  onCameraError(err){
    console.log(err);
  }

  /**
   * function on access device gallery
   * Image picker plugin will be called
   */
  gallery(){

    this.pluginService.openGallery(this.onGalleryOpen,this.OnGalleryError);
    ($("#modal-changeProfile") as any).modal('hide');
  }


  /**
   * function on to be called on gallery success
   * @result
   */
  onGalleryOpen(result){
    console.log(result);
      var content = '';
      for (var i = 0; i < result.length; i++) {
        console.log(result[i]);
        this.profileImage = "data:image/jpg;base64,"+result[i];
      }
  }

  /**
   * function on to be called on gallery success
   * @error
   */
  OnGalleryError(error){
    console.log(error);
  }


  /**
   * function for input feild on browser
   * @files
   */
  handleFileInput(files: FileList) {
    console.log(files);
    if(files[0].type != "image/png" && files[0].type != "image/jpeg" ) {
      return;
    }
    //const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      console.log(reader.result);
      this.profileImage = reader.result;
      ($("#modal-changeProfile") as any).modal('hide');
    };
  }

  /* --------------------------------------------------------------------------- */
  /* New Code for Profile Update TPIN  */
  selection(value) {
    this.selectionValue = value;
    if(this.selectionValue == 'password') {
      this.changePasswordForm.reset();
    }
    else if(this.selectionValue == 'mpin') {
      this.mPinForm.reset();
    }
    else {
      this.tpinError = '';
      this.newTpinError = '';
      this.confirmTpinError = '';
      this.tpinForm.reset();
    }
  }

  // Validating OTP Form
  validateOtp() {

    if (this.otpForm.valid) {

      var otp=this.otpForm.value.otp1+this.otpForm.value.otp2+this.otpForm.value.otp3+this.otpForm.value.otp4+this.otpForm.value.otp5+this.otpForm.value.otp6;
      console.log("otp=====",otp);
      var refNo = this.dataService.accountOpenRRN;
      var param = this.profileUpdateService.getChannelLeadOtpParam(otp);

      this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_VALIDATEOTPSESSION).subscribe((data) => {
          console.log('=====validate otp=====', data);
          var resp = data.responseParameter;
          if (resp.opstatus == '00') {
            console.log(data.responseParameter);
            this.closePopup('otp');
            this.otpForm.reset();
            this.passwordmpinCall();

          } else {
            this.errorCallBack(data.subActionId, resp);
          }
        });

    }

  }

  passwordmpinCall() {
    switch(this.selectionValue) {
    case "password":
      this.getProfileUpdatePasswordChange();
        break
    case "mpin":
            this.getProfileUpdateChangeMPIN();
        break
    case "tpin":
            this.getProfileUpdateChangeTPIN();
      break
    }
  }

  //api call for change password
  getProfileUpdatePasswordChange() {
    var param=this.profileService.getProfileUpdatePasswordChangeParam(this.changePasswordForm.value)
    console.log("value==",this.changePasswordForm.value)
    this.getProfileUpdatePasswordChangeApiCall(param)
  }

  getProfileUpdatePasswordChangeApiCall(param) {
    this.errorMsg = "";
    this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_INTERNETBANKPASSCHANGE).subscribe(data=>{
      console.log(data);
      var resp = data.responseParameter
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
          var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey,resp.Session);
          console.log('sessionKey', sessionKey);
           this.openPopup('success1');
          //  this.changePasswordForm.reset()
          }
          else{
            this.errorMsg = data.responseParameter.Result;
            this.openPopup('error1');
            this.changePasswordForm.reset()
          }
      });
  }

  getProfileUpdateChangeMPIN() {
    var param=this.profileService.getProfileUpdateChangeMPINParam(this.mPinForm.value)
    let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
    this.getProfileUpdateChangeMPINApiCall(param,deviceID)
  }

  getProfileUpdateChangeMPINApiCall(param,deviceID) {
    this.errorMsg = "";
    this.http.callBankingAPIService(param,deviceID,this.constant.serviceName_CHANGEPINS).subscribe(data=>{
      console.log(data);
      var resp = data.responseParameter
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
          var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey,resp.Session);
          console.log('sessionKey', sessionKey);
          this.mPinForm.reset();
          this.openPopup('success1');
           this.mPinForm.reset()
        }
        else{
          this.errorMsg = data.responseParameter.Result;
          this.openPopup('error1');
          this.mPinForm.reset();
        }
      });
  }

  getProfileUpdateChangeTPIN() {
    var param=this.profileService.getProfileUpdateChangeTPINParam(this.tpinForm.value)
    let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
    this.getProfileUpdateChangeTPINApiCall(param,deviceID)
  }

  getProfileUpdateChangeTPINApiCall(param,deviceID) {
    this.errorMsg = "";
    this.http.callBankingAPIService(param,deviceID,this.constant.serviceName_CHANGEPINS).subscribe(data=>{
      console.log(data);
      var resp = data.responseParameter
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
          var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey,resp.Session);
          console.log('sessionKey', sessionKey);
            // this.tpinForm.reset();
            // showToastMessage(resp.Result, 'success');
            // this.router.navigateByUrl('/profileDetails');
          this.openPopup('success1');
          // this.tpinForm.reset()
        }
        else if(resp.opstatus != "00")
        {
          if(this.failedAttempts < 2 )
          {
          console.log(data.responseParameter);
          //showToastMessage(resp.Result, 'error');
          this.failedAttempts++;
          this.tpinForm.reset();
          }
          else{
            this.router.navigateByUrl('/resetTpin');
            this.failedAttempts == 0;
          }
        }
        else{
          this.errorMsg = data.responseParameter.Result;
          this.openPopup('error1');
          this.tpinForm.reset()
        }
    });
  }

  getResendOTPSession(serviceType) {
    var param=this.profileService.getResendOTPSessionParam(serviceType);
    let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
    this.getResendOTPSessionApiCall(param,deviceID)
   }
   getResendOTPSessionApiCall(param,deviceID)
   {
    this.http.callBankingAPIService(param,deviceID,this.constant.serviceName_RESENDOTPSESSION ).subscribe(data=>{
      console.log(data);
      var resp = data.responseParameter
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);

          this.startCounter();
          this.otpForm.reset();
        }
     });
  }

  startCounter(){
    this.counter = 120;
    if (this.countDown  && !this.countDown.closed) { this.countDown.unsubscribe(); }
    this.countDown = timer(0, this.tick).subscribe(() => { if(this.counter == 1) this.countDown.unsubscribe(); --this.counter });
  }

  Cancel() {
    if(this.selectionValue == 'password'){
    this.changePasswordForm.reset();
   }
     else if(this.selectionValue == 'mpin'){
     this.mPinForm.reset();
   }
     else{
     this.tpinForm.reset();
   }
    this.router.navigateByUrl('/profileDetails');
  }

  ResendOTP(){
    if(this.selectionValue == 'password') {
      this.getResendOTPSession(this.constant.val_CHANGEPASSWORD);
    }
    else if(this.selectionValue == 'mpin'){
      this.getResendOTPSession(this.constant.val_CHANGEMPIN);
    }
    else if(this.selectionValue == 'tpin') {
      this.getResendOTPSession(this.constant.val_CHANGETPIN);
    }
  }

  onSearchChange(value,inputPlace){
      if(inputPlace == 1)
      {
         if(value.length == 1)
         document.getElementById("spassword2").focus();
      }
      else if(inputPlace == 2)
      {
        if(value.length == 1)
        document.getElementById("spassword3").focus();
        else if(value.length == 0)
        document.getElementById("spassword1").focus();
      }
      else if(inputPlace == 3)
      {
        if(value.length == 1)
        document.getElementById("spassword4").focus();
        else if(value.length == 0)
        document.getElementById("spassword2").focus();

      }
      else if(inputPlace == 4)
      {
        if(value.length == 1)
        document.getElementById("spassword5").focus();
        else if(value.length == 0)
        document.getElementById("spassword3").focus();

      }
      else if(inputPlace == 5)
      {
        if(value.length == 1)
        document.getElementById("spassword6").focus();
        else if(value.length == 0)
        document.getElementById("spassword4").focus();

      }
      else if(inputPlace == 6)
      {
        if(value.length == 0)
        document.getElementById("spassword5").focus();

      }
    }

    // OMNI


      /**
   * Select image from gallery and crop image in OMNI
   */
   selectImageFromGallery() {
    console.log("selectImageFromGallery");
    var self = this;
    self.closePopup('div.popup-bottom.profile1');
    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      cordova.plugins.diagnostic.requestExternalStorageAuthorization(function (status) {
        switch (status) {
          case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            self.pluginService.checkImagePickerReadPermission().subscribe((isPermissionAvailable) => {
              if (isPermissionAvailable) {
                self.pluginService.pickImage().subscribe((filePath) => {
                  self.pluginService.cropImage(filePath).then((fileUri) => {
                    console.log("fileUri",fileUri);
                    if (fileUri) {
                      self.commonMethod.getFileContentAsBase64(fileUri, function (base64Image) {
                        self.croppedImageBase64 = base64Image;
                        console.log('selectImageFromGallery base64 ', base64Image);
                        self.setUpdateProfile();
                      });
                    }
                  });
                },(err)=>{
                  console.log(err);
                });
              }
            });
            break;
          // case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
          //   window['imagePicker'].requestReadPermission();
          //   break;
          case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            self.ngZone.run(() => {
              self.information = 'ENABLE_STORAGE_PERMISSION_MSG';
              self.commonMethod.openPopup('div.popup-bottom.header-info');
            })
            // case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
            //   window['imagePicker'].requestReadPermission();
            //   break; self.commonMethods.openPopup('div.popup-bottom.header-info');
            break;
          default:
            break;
        }
      }, function (error) {
        console.error(error);
      });
    }
    else{
      self.pluginService.openCameraGallery().then((fileUri) => {
        self.pluginService.cropImage(fileUri).then((fileUri) => {
          if (fileUri) {
            self.commonMethod.getFileContentAsBase64(fileUri, function (base64Image) {
              self.croppedImageBase64 = base64Image;
              console.log('selectImageFromGallery base64 ', base64Image);
              self.setUpdateProfile();
            });
          }
        },(err)=>{
          console.log(err);
        });
      },(err)=>{
        console.log(err);
      })
    }

    // window['imagePicker'].requestReadPermission();

  }

  /**
   * Common Profile Update Api call
   */
   setUpdateProfile() {
    var profileDetails, self = this;
    if (this.dataService.isUPILogin) {
      profileDetails = { address: '', email: this.dataService.upiUserEmailAdress };
    } else {
      // profileDetails = this.profileForm.value;
    }
    var param = this.profileService.getProfileUpdateParam(profileDetails, this.dataService.userName, this.croppedImageBase64, true);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CUSTPROFILEUPDATE).subscribe(data => {
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.information = resp.Result;
        this.dataService.fetchUPIProfileDetails = true;
        this.getProfileDetails();
        console.log(data);
      } else {
        this.ngZone.run(() => {
          this.information = resp.Result;
          this.commonMethod.openPopup('div.popup-bottom.header-info');
        });
      }
    });
  }


  /**
   * function to get profile details and display
   * api call for frofile
   */
   getProfileDetails() {
    let param = this.profileDtlsService.getProfileDetailsParam(true);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CUSTPROFILEDETAILS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.ngZone.run(() => {
          this.commonMethod.openPopup('div.popup-bottom.header-info');
          this.dataService.profileImage =  this.domSanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + resp.base64Image);
          this.dataService.setUPIDetails(resp);
        });
      }
      // else {
      //   this.errorCallBack(data.subActionId, resp);
      // }
    });
  }


  /**
   * Take photo from camera and crop image and update profile picture in UPI
   */
  takePhoto() {
    var self = this;
    self.closePopup('div.popup-bottom.profile1');
    cordova.plugins.diagnostic.requestCameraAuthorization(function (status) {
      switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
          self.pluginService.openCamera().then((result) => {
            console.log(result);
              self.pluginService.cropImage(result).then((fileUri) => {
              if (fileUri) {
                self.commonMethod.getFileContentAsBase64(fileUri, function (base64Image) {
                  self.croppedImageBase64 = base64Image;
                  console.log('takePhoto base64 ', base64Image);
                  self.setUpdateProfile();
                });
              }
            });
          })
          break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
          self.ngZone.run(() => {
            self.information = 'ENABLE_CAMERA_PERMISSION_MSG';
            self.commonMethod.openPopup('div.popup-bottom.header-info');
          });
          return;
        default:
          break;
      }
    }, function (error) {
      console.error(error);
    });

  }

  closeProfilePopUp() {
    this.closePopup('div.popup-bottom.profile1');
  }

  removeProfilePopUp() {
    var self = this;
    self.closeProfilePopUp();
    console.log("delete-profile-pic");
    self.commonMethod.openPopup('div.popup-bottom.delete-profile-pic-1');
  }

  // closePopup(popupName) {
  //   this.commonMethod.closePopup(popupName);
  // }

  closeRemoveProfilePopUp() {
    this.closePopup('div.popup-bottom.delete-profile-pic-1');
  }


  /**
   * Remove profile picture in UPI
   */
   removeProfilePicture() {
    this.croppedImageBase64 = "";
    this.closeRemoveProfilePopUp();
    this.setUpdateProfile();
  }

  selectProfile(){
    // alert("inside alert");
  }

  goBack(){
    if(this.constant.getIsCordova() == "web"){
      this.router.navigateByUrl('/dashboard');
    }
    else{
      this.router.navigateByUrl('/dashboardMobile');
    }
  }


  onKeyUpEvent(index: any, event: any, type: any) {
    const eventCode = event.which || event.keyCode;

    if (this.getSpasswordElement(index, type).value.length === 1) {
      if (index !== 7) {
        this.getSpasswordElement(index + 1, type).focus();
      } else {
        this.getSpasswordElement(index, type).blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, type).focus();
    }


    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        if (type == 'mpin') {
          this.mPinForm.get(this.mpinInput[index])?.setValue("");
        } else if (type == 'newMpin') {
          this.mPinForm.get(this.mpinNewInput[index])?.setValue("");
        }else if (type == 'cMpin') {
          this.mPinForm.get(this.mpinConfirmInput[index])?.setValue("");
        }

        else if (type == 'tpin') {
          this.tpinForm.get(this.tpinInput[index])?.setValue("");
        } else if (type == 'newTpin') {
          this.tpinForm.get(this.tpinNewInput[index])?.setValue("");
        }else if (type == 'cTpin') {
          this.tpinForm.get(this.tpinConfirmInput[index])?.setValue("");
        }
        else if (type == 'otp') {
          this.otpForm.get(this.otpInput[index])?.setValue("");
        }
        this.getSpasswordElement(index - 1, type).focus();
      }
    }

  }

  onFocusEvent(index: any, type: any) {

    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  getSpasswordElement(index: any, type: any) {
    if (type == 'mpin') {
      return this.mPinRows._results[index].nativeElement;
    }else if (type == 'newMpin') {
      return this.newMPinRows._results[index].nativeElement;
    } else   if (type == 'cMpin') {
      return this.confirmMPinRows._results[index].nativeElement;
    } else if (type == 'tpin') {
      return this.tPinRows._results[index].nativeElement;
    }else   if (type == 'newTpin') {
      return this.newTPinRows._results[index].nativeElement;
    } else   if (type == 'cTpin') {
      return this.confirmTPinRows._results[index].nativeElement;
    } else if(type == 'otp'){
      return this.otpRows._results[index].nativeElement;
    }
  }

  closeAllPopup(){
    this.commonMethod.closeAllPopup() ;
  }

  close(){
    this.commonMethod.closeAllPopup() ;
    this.goToPage('profileDetails') ;
  }
  
  closeSuccessPopup(){
    if(this.selectionValue == 'tpin'){
      this.commonMethod.openPopup('div.popup-bottom.success1');
      this.tpinForm.reset();
    }
    else{
      var gotoPage = this.constant.getPlatform() == "web" ? 'login' : 'loginMobile'
      this.goToPage(gotoPage) ;
    }
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  maskCharacter(str, n) {
    // Slice the string and replace with
    // mask then add remaining string
    return ('' + str).slice(0, -n).replace(/./g, 'X') + ('' + str).slice(-n);
  }


  uploadImage(event) {
    var self = this;
    console.log(event);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // console.log(reader.result);
      var profileImage = reader.result;
      // var param = self.profileDtlsService.getProfileImageParam(self.emailId, self.userName, self.communicationAdd, profileImage);
      // self.dataService.request = param;
      // self.dataService.endPoint = self.constant.serviceName_CUSTPROFILEUPDATE;
      // self.dataService.authorizeHeader = "Profile Update";
      // self.dataService.screenType = 'profileUpdate';
      // this.router.navigate(['/otpSession']);
      var param = self.profileDtlsService.getProfileImageParam(this.dataService.emailIdProfile, self.userName, this.dataService.communicationAddress, profileImage);
      self.http.callBankingAPIService(param, self.storage.getLocalStorage(self.constant.storage_deviceId), self.constant.serviceName_CUSTPROFILEIMGUPDATE).subscribe(data => {
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          self.dataService.profileImage = reader.result;
        } else {
        }
      });
    };
  }

  selectImage(){
    this.commonMethod.openPopup('div.popup-bottom.profile-dtl');
  }

}


