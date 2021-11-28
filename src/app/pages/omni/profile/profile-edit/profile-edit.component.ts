import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Injector, Input, NgZone, OnDestroy, OnInit, Output, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from 'src/app/services/data.service';
import { AppConstants } from 'src/app/app.constant';
import {ProfileEditService} from '../profile-edit/profile-edit.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { timer, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
declare var showToastMessage: any;

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  sessionDecryptKey: any;
  isuserNameVerfied: any = false;
  userAvailabilityChecked: any = false;
  isuseravailable: any = false;


  @Input() profileModuleType = '';
  @Output() prevEvent = new EventEmitter<string>();
  @Output() emailToSend = new EventEmitter<string>();

  usernameForm: FormGroup;
  emailForm: FormGroup;
  addressForm: FormGroup;
  aadharForm: FormGroup;
  panForm: FormGroup;
  otpForm: FormGroup;

  custAccountList: any = [];
  lastLogin: any;
  emailId = '';
  profileImage: any = '';
  userName: any;
  mobileNo = '';
  accNo = '';
  showDetails = false;
  communicationAdd = '';
  addharCard: any = '';
  panCard: any = '';
  profileTypeModule = '';
  todayDate: any;
  constructor(
    private constant: AppConstants,
    private router: Router,
    public dataService: DataService,
    private storage: LocalStorageService,
    private http: HttpRestApiService,
    private profileEditService: ProfileEditService,
    private domSanitizer: DomSanitizer,
    private commonMethod: CommonMethods,
    private encryptDecryptService: EncryptDecryptService,
    private datePipe: DatePipe,
    private ngZone: NgZone,
    private injector: Injector,
    private loader: pageLoaderService,
  ) {}

  ngOnInit(): void {
    console.log('tessssssssttttttt :: ', this.profileModuleType);
    this.custAccountList = this.dataService.customerAccountList;
    console.log('list======', this.custAccountList);
    this.userName = this.storage.getLocalStorage(
      this.constant.storage_username
    );
    this.buildForm();
    this.getProfileDetails();
    console.log(this.dataService.profileDetails);
    this.dataService.setShowThemeObservable(true);
    this.dataService.setShowsideNavObservable(true);
    this.dataService.setShowNotificationObservable(true);
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  prevEventSection() {
    this.profileModuleType = '';
    this.prevEvent.next(this.profileModuleType);
  }

  buildForm() {
    this.usernameForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      // newUserName: new FormControl('', [Validators.required]),
    });

    this.emailForm = new FormGroup({
      emailId: new FormControl('', [
        Validators.required,
        Validators.pattern(this.constant.email_regex),Validators.required
      ]),
    });

    this.aadharForm = new FormGroup({
      aadhar: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
      ]),
    });

    this.panForm = new FormGroup({
      pan: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
    });

    this.addressForm = new FormGroup({
      address1: new FormControl('', [Validators.required]),
      address2: new FormControl('', [Validators.required]),
      address3: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [Validators.required]),
      documentNumber: new FormControl('', [Validators.required]),
      // addressProof: new FormControl('', [Validators.required]),
      // termCondition : new FormControl('', [Validators.required]),
    });

    this.otpForm = new FormGroup({
      mobile1: new FormControl('', [Validators.required]),
      mobile2: new FormControl('', [Validators.required]),
      mobile3: new FormControl('', [Validators.required]),
      mobile4: new FormControl('', [Validators.required]),
      mobile5: new FormControl('', [Validators.required]),
      mobile6: new FormControl('', [Validators.required]),
      email1: new FormControl('', [Validators.required]),
      email2: new FormControl('', [Validators.required]),
      email3: new FormControl('', [Validators.required]),
      email4: new FormControl('', [Validators.required]),
      email5: new FormControl('', [Validators.required]),
      email6: new FormControl('', [Validators.required]),
    });
  }

  validateForm(type) {
    switch (type) {
      case 'username':
        if (this.usernameForm.invalid) {
          this.usernameForm.get('username').markAsTouched();
          // this.usernameForm.get('newUserName').markAsTouched();
        }
        break;
      case 'email':
        if (this.emailForm.invalid) {
          this.emailForm.get('emailId').markAsTouched();
        }
        break;
      case 'aadhar':
        if (this.aadharForm.invalid) {
          this.aadharForm.get('aadhar').markAsTouched();
        }
        break;
      case 'pan':
        if (this.panForm.invalid) {
          this.panForm.get('pan').markAsTouched();
        }
        break;
      case 'address':
        if (this.addressForm.invalid) {
          this.addressForm.get('address1').markAsTouched();
          this.addressForm.get('address2').markAsTouched();
          this.addressForm.get('address3').markAsTouched();
          this.addressForm.get('city').markAsTouched();
          this.addressForm.get('state').markAsTouched();
          this.addressForm.get('pinCode').markAsTouched();
          this.addressForm.get('documentNumber').markAsTouched();
          // this.addressForm.get('addressProof').markAsTouched();
          // this.addressForm.get('termCondition').markAsTouched();
        }
        break;
    }
  }

  
  onEditFormSubmit(formValue, type) {
    this.dataService.profileEmailEdit = '';
    switch (type) {
      case 'username':
        if (formValue.valid && this.isuserNameVerfied) {
          // if (
          //   this.usernameForm.value.newUserName !=
          //   this.usernameForm.value.username
          // ) {
          //   showToastMessage('Username and Confirm Username should be same');
          //   return;
          // }
          this.dataService.screenType ='editusername'
          console.log('Username Data : ', formValue);
        
        
          let param = this.profileEditService.getProfileUpdateParamforUsername(
            this.dataService.profileDetails,
            this.usernameForm.value
          );
          this.dataService.request = param;
          this.dataService.endPoint =
            this.constant.serviceName_CUSTPROFILEUPDATE;
          this.dataService.authorizeHeader = 'PROFILE EDIT';
          this.dataService.profileEditObj.newUserName = this.usernameForm.value.username;
          this.dataService.screenType = 'profileDetails';
          this.dataService.editusername=formValue.value.username;
          this.dataService.isUsernameChanged = true;
          this.dataService.otpSessionPreviousPage = this.router.url;
          this.router.navigate(['/otpSession']);

          //this.router.navigate(['/otpSession']);
          // this.updateProfileDetailsForUsername();
        } else {
          this.validateForm(type);
        }
        break;
      case 'email':
        if (this.emailForm.valid) {
          this.emailToSend.next(this.emailForm.value.emailId)
          // this.dataService.profileEmailEdit = this.emailForm.value.emailId.toLowerCase();
          // let param = this.profileEditService.getEmailIdUpdateParam(this.dataService.profileDetails,this.emailForm.value);
          // this.dataService.request = param;
          // this.dataService.endPoint = this.constant.serviceName_EMAILREGISTRATIONCUSTOMER;
          // this.dataService.authorizeHeader = "PROFILE EDIT";
          // this.dataService.profileEditObj.emailId=this.emailForm.value.emailId.toLowerCase();
          // this.dataService.screenType = 'profileDetails';
          // var objCheckFlag = this.dataService.activitySettingData.findIndex(x => x.ACTIVITYNAME == this.dataService.endPoint.split('/')[1]);
          // if(this.dataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y') {
          // this.router.navigate(['/otpSession']);
          // }
        } else {
          this.validateForm(type);
        }
        break;

      case 'address':
        if (this.addressForm.valid) {
          console.log('Address Data : ', formValue);
          let param = this.profileEditService.getProfileUpdateParamforAddress(
            this.dataService.profileDetails,
            this.addressForm.value
          );
          this.dataService.request = param;
          this.dataService.endPoint =
            this.constant.serviceName_CUSTPROFILEUPDATE;
          this.dataService.authorizeHeader = 'PROFILE EDIT';
          this.dataService.profileEditObj.address1 =
            this.addressForm.value.address1;
          this.dataService.profileEditObj.address2 =
            this.addressForm.value.address2;
          this.dataService.profileEditObj.address3 =
            this.addressForm.value.address3;
          this.dataService.profileEditObj.city = this.addressForm.value.city;
          this.dataService.profileEditObj.state = this.addressForm.value.state;
          this.dataService.profileEditObj.pinCode =
            this.addressForm.value.pinCode;
            this.router.navigate(['/otpSession']);
          // this.dataService.profileEditObj.documentNumber=this.addressForm.value.documentNumber;
          //this.dataService.profileEditObj.addressProof=this.addressForm.value.addressProof;
          this.dataService.screenType = 'profileDetails';
          //this.router.navigate(['/otpSession'])
          //this.updateProfileDetailsForAddress();
        } else {
          this.validateForm(type);
        }
        break;
      case 'aadhar':
        if (this.aadharForm.valid) {
          if (this.aadharForm.value.aadhar < 1) {
            showToastMessage('Invalid Aadhaar Number');
            return;
          }
          let param = this.profileEditService.getProfileUpdateParamForAadhar(this.aadharForm.value);
          this.dataService.request = param;
          this.dataService.endPoint = this.constant.serviceName_AADHARUPDATE;

          // this.dataService.request = this.profileEditService.getProfileUpdateParamForAadhar(this.aadharForm.value);
          // this.dataService.endPoint = this.constant.serviceName_UIDAIKYCDETAILS
          this.dataService.authorizeHeader = 'PROFILE EDIT';
          this.dataService.screenType = 'profileDetails';
          // var objCheckFlag = this.dataService.activitySettingData.findIndex(
          //   (x) => x.ACTIVITYNAME == this.dataService.endPoint.split('/')[1]
          // );
          // if (
          //   this.dataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y'
          // ) {
          //   this.validateAadhar();
          //   //this.router.navigate(['/otpSession']);
          // }
          //this.validateAadhar();
          this.router.navigate(['/otpSession']);
        } else {
          this.validateForm(type);
        }
        break;
      case 'pan':
        if (this.panForm.valid) {
          let param = this.profileEditService.getProfileUpdateParamForPAN(
            this.panForm.value
          );
          this.dataService.request = param;
          this.dataService.endPoint = this.constant.serviceName_PANUPDATE;
          this.dataService.authorizeHeader = 'PROFILE EDIT';
          this.dataService.screenType = 'profileDetails';
          this.router.navigate(['/otpSession']);
          
        } else {
          this.validateForm(type);
        }
        break;
      default:
    }
  }

  getProfileDetails() {
    this.lastLogin = this.dataService.userDetails?.webLastLogin;
    let param = this.profileEditService.getProfileDetailsEditParam();
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_CUSTPROFILEDETAILS
      )
      .subscribe((data) => {
        console.log('profile data   ' + JSON.stringify(data));
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          var responseData = data.listofDataset[0].records;
          var limitsData = data.listofDataset[1].records;
          this.mobileNo = responseData[0].mobileNo;
          this.emailId = !this.commonMethod.validateEmpty(
            responseData[0].emailId
          )
            ? responseData[0].emailId
            : '-';
          // this.userName = responseData[0].custName
          this.accNo = responseData[0].accountNo;
          this.communicationAdd = (
            responseData[0].add1 +
            ', ' +
            responseData[0].add2 +
            ', ' +
            responseData[0].cityCode
          ).replace(', ,', ',');
          this.addharCard = !this.commonMethod.validateEmpty(
            responseData[0].aadharNumber
          )
            ? responseData[0].aadharNumber
            : '-';
          this.panCard = !this.commonMethod.validateEmpty(
            responseData[0].panNumber
          )
            ? responseData[0].panNumber
            : '-';
          if (resp?.base64Image != '')
            this.profileImage = this.domSanitizer.bypassSecurityTrustUrl(
              'data:image/png;base64,' + resp?.base64Image
            );
          else this.profileImage = '';

          this.dataService.setDetails({
            profileImg: 'data:image/png;base64,' + resp?.base64Image,
            username: this.userName,
            emailId: this.emailId,
          });
          this.showDetails = true;
          this.dataService.profileDetails = responseData;
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  errorCallBack(subActionId, resp) {
    if (resp.opstatus == '02') {
      showToastMessage(resp.Result, 'error');
    }
  }


  validateAadhar(){
    this.dataService.profile.transactionId = "PSB:OMNI:"+this.commonMethod.genRandomDigit(4)
    var param = this.profileEditService.getAadharValidation(this.aadharForm.value.aadhar,this.dataService.profile.transactionId);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_UIDAIOTPGENERATE).subscribe(data => {
      console.log("=====validateAadharNo=====", data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.dataService.request = this.profileEditService.getValidateAadharValidation(this.aadharForm.value.aadhar,this.dataService.profile.transactionId);
        this.dataService.endPoint = this.constant.serviceName_UIDAIKYCDETAILS
        this.router.navigate(['/otpSession']);
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  updateProfileDetailsForUsername() {
    console.log(this.usernameForm.value);
    let param = this.profileEditService.getProfileUpdateParamforUsername(
      this.dataService.profileDetails,
      this.usernameForm.value.username
    );
    this.updateProfileDetailsApiCall(param);
  }
  updateProfileDetailsApiCall(param) {
    this.dataService.request = param;
    this.dataService.endPoint = this.constant.serviceName_CUSTPROFILEUPDATE;
    //this.router.navigateByUrl('/otpSession');

    // this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_CUSTPROFILEUPDATE).subscribe(data=>{
    //   console.log(data);
    //   var resp = data.responseParameter
    //     if (resp.opstatus == "00") {
    //       console.log(data.responseParameter);
    //
    //   });
  }

  updateProfileDetailsForEmail() {
    console.log(this.emailForm.value);
    let param = this.profileEditService.getProfileUpdateParamforEmail(
      this.dataService.profileDetails,
      this.emailForm.value.emailId
    );
    this.updateProfileDetailsApiCall(param);
  }
  updateProfileDetailsForEmailApiCall(param) {
    //this.router.navigate(['/otpSession']);
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_CUSTPROFILEUPDATE
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          console.log(data.responseParameter);
        }
      });
  }

  updateProfileDetailsForAddress() {
    console.log(this.addressForm.value);
    let param = this.profileEditService.getProfileUpdateParamforAddress(
      this.dataService.profileDetails,
      this.addressForm.value
    );
    this.updateProfileDetailsApiCall(param);
  }
  updateProfileDetailsForAddressApiCall(param) {
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_CUSTPROFILEUPDATE
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          console.log(data.responseParameter);
          // this.router.navigate(['/otpSession']);
        }
      });
  }

  checkAvailability() {
    if (this.usernameForm.get('username').valid) {
      let paramReq = this.profileEditService.getCheckAvaiablityParam(
        this.usernameForm.value.username
      );

      this.userAvailabilityChecked = true;
      // this.notclickedflag = false;
      this.http
        .callBankingAPIService(
          paramReq,
          this.storage.getLocalStorage(this.constant.storage_deviceId),
          this.constant.serviceName_CHECKOMNIUSERNAME
        )
        .subscribe((data) => {
          console.log(data);
          var resp = data.responseParameter;
          if (resp.opstatus == '00') {
            console.log(data.responseParameter);
            this.isuserNameVerfied = true;
          } else {

               this.ngZone.run(() => {
                  this.dataService.information = resp.Result;
                  this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                  this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                  this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                })

           //showToastMessage(resp.Result,'error')
            this.isuserNameVerfied = false;
          }
        });
    } else {
      this.usernameForm.get('username').markAsTouched();
    }
  }
}
