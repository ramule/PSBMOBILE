import { Component, OnInit, ViewChild, ElementRef, NgZone, ViewChildren } from '@angular/core';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { AppConstants } from '../../../../app.constant';
import { DataService } from '../../../../services/data.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { ProfileDetailsService } from './profile-details.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PluginService } from 'src/app/services/plugin-service';
import { Location } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileEditService } from '../profile-edit/profile-edit.service';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { CustomCurrencyPipe } from '../../../../pipes/custom-currency.pipe';
// import { ImageCroppedEvent } from 'ngx-image-cropper';
import { LinkAccountService } from '../../link-delink-account/link-account/link-account.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { DashboardService } from '../../dashboard/dashboard.service';
import { Idle } from '@ng-idle/core';

declare var showToastMessage: any;
declare var $: any;
declare var rangeSlider: any;
declare var cordova: any;
declare var OSREC: any;

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  maskedMobileNo: any;
  maskedEmailId: any;
  maskedAddharCard:any;
  maskedPanCard:any;
  otpfailMsg: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  limitsUpdateInfo: any = "";
  authMode = 'OTP';
  commonPageComponent = {
    'headerType': 'innerHeader',
    'sidebarNAv': 'OmniNAv',
    // 'footer': 'innerFooter',
    'currentpageRoute': '/dashboard',
    'footertype': 'omniDashboardFooter'
  }



  countDown: Subscription;
  mobileCountDown: Subscription;
  counter = 120 ;
  mobileCounter = 120 ;
  tick = 1000;
  resendOtpLinkEmail: any;
  @ViewChildren('mobileOTPRow') mobileOTPRows: any;
  @ViewChildren('emailOTPRow') emailOTPRows: any;
  @ViewChildren('otpRow') otpRow: any;
  @ViewChild(ProfileEditComponent) child: ProfileEditComponent;
  otpForm: FormGroup;
  otpFormLimit: FormGroup;

  mobileInput = ['mobile1', 'mobile2' ,'mobile3' , 'mobile4', 'mobile5', 'mobile6'];
  emailInput = ['email1', 'email2' ,'email3' , 'email4', 'email5', 'email6'];
  otpInput = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6'];

  custAccountList: any = [];
  selectedAccount: any = [];
  accountList: any = [];
  lastLogin: any;
  emailId = "";
  receivedEmailId: any = "";
  url1 = "";
  profileImage: any = "";
  userName: any;
  custName: any;
  mobileNo = "";
  accNo = "";
  //accountNO="";
  showDetails = false;
  communicationAdd = "";
  permanentAdd = "";
  profileTypeModule = "";
  // platform:any;
  platform:any = 'web';
  storageMobileNo: any = '';
  fileToUpload: any;
  imageUrl: any;
  information:any;
  setlimitsview:any;
  addharCard: any = ""
  panCard: any = ""
  mbLimits: any = ""
  ibLimits: any = ""
  wbLimits: any = ""
  upiLimits: any = ""
  amountText:any=""
  amountText1:any=""
  amountText2:any=""
  amountText3:any="";
  authType = "O";
  linkDelinkItem;
  type: any = "";
  mobileOtp:any;
  responsevalidate:any;
  responsevalid:boolean=false;
  linkDelinkList:any
  userInfo:any = "";

  buttonDisabled :boolean=true;
  constructor(
    public constant: AppConstants,
    private router: Router,
    public dataService: DataService,
    private storage: LocalStorageService,
    private http: HttpRestApiService,
    private profileDtlsService: ProfileDetailsService,
    private domSanitizer: DomSanitizer,
    private commonMethod: CommonMethods,
    private pluginService: PluginService,
    private ngZone: NgZone,
    private location: Location,
    private profileEditService: ProfileEditService,
    private customCurrencyPipe: CustomCurrencyPipe,
    public elem: ElementRef,
    public linkAccService: LinkAccountService,
    public translatePipe: TranslatePipe,
    private dashboardService: DashboardService,
    private idle: Idle,
     ) {

  }

  ngOnInit() {

    this.maskedMobileNo = this.maskCharacter(this.storage.getLocalStorage(this.constant.storage_mobileNo), 4);
    console.log('masked mobile number: ', this.maskedMobileNo);
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('PROFILE_DETAILS' , this.router.url)
    var backUrl = this.dataService.isCordovaAvailable ? 'dashboardMobile' : 'dashboard'
    this.lastLogin = this.dataService.isCordovaAvailable ?  this.dataService.userDetails.mobileLastLogin  :  this.dataService.userDetails?.webLastLogin;
    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    //rangeSlider();
    this.setLimits();
    this.dataService.setPageSettings('PROFILE_DETAILS');
    this.initialize();
    this.buildForm();
    this.accountList = this.dataService.customerOperativeAccList;
    console.log("accountlist======", this.accountList);
    this.authMode = this.dataService.otpName;

    this.custAccountList = this.dataService.customerAccountList;
    console.log("list======", this.custAccountList);


    this.mobileNo = this.dataService.userDetails.MobileNo;
    this.userName = this.storage.getLocalStorage(this.constant.storage_username);
    console.log("this.userName =====>",this.userName);
    this.platform = this.constant.getPlatform();

    this.countDown = timer(0, this.tick)
    .subscribe(() => --this.counter);
    this.mobileCountDown = timer(0, this.tick)
    .subscribe(() => --this.mobileCounter);

    setTimeout(() => {
      const inputElements = document.querySelectorAll('[type="range"]');

      const handleInput = (inputElement) => {
        let isChanging = false;

        const setCSSProperty = () => {
          const percent =
            ((inputElement.value - inputElement.min) /
            (inputElement.max - inputElement.min)) *
            100;
          // Here comes the magic 🦄🌈
          inputElement.style.setProperty("--webkitProgressPercent", `${percent}%`);
        }

        // Set event listeners
        const handleMove = () => {
          if (!isChanging) return;
          setCSSProperty();
        };
        const handleUpAndLeave = () => isChanging = false;
        const handleDown = () => isChanging = true;

        inputElement.addEventListener("mousemove", handleMove);
        inputElement.addEventListener("mousedown", handleDown);
        inputElement.addEventListener("mouseup", handleUpAndLeave);
        inputElement.addEventListener("mouseleave", handleUpAndLeave);
        inputElement.addEventListener("click", setCSSProperty);

        // Init input
        setCSSProperty();
      }

      inputElements.forEach(handleInput)
    }, 1000);
    this.fetchLinkDelinkAccountList();
    this.dataService.otpSessionPreviousPage = this.router.url;
  }

  buildForm() {
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
    this.otpFormLimit = new FormGroup({
      otp1: new FormControl('', [Validators.required]),
      otp2: new FormControl('', [Validators.required]),
      otp3: new FormControl('', [Validators.required]),
      otp4: new FormControl('', [Validators.required]),
      otp5: new FormControl('', [Validators.required]),
      otp6: new FormControl('', [Validators.required]),
    });
  }

  /**
   * function on page initialize
   */
  initialize() {
   this.dataService.setPageSettings('PROFILE');
   this.dataService.setShowThemeObservable(true)
   this.dataService.setShowsideNavObservable(true)
    this.getProfileDetails();
    console.log(this.dataService.userDetails)
    this.linkDelinkItem=this.dataService.userDetails
    this.storageMobileNo = this.storage.getLocalStorage(this.constant.storage_mobileNo);
  }

  /**
     * function to navigate to next page
     * @location
     */
  routeTo(location) {
    this.router.navigate([location]);
  }


  /**
   * function to get profile details and display
   * api call for frofile
   */
  getProfileDetails() {

    let param = this.profileDtlsService.getProfileDetailsParam();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CUSTPROFILEDETAILS).subscribe(data => {
      console.log("data of  getProfileDetails " + JSON.stringify(data));
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        var responseData = data.listofDataset[0].records;
        var limitsData = data.listofDataset[1].records;
        this.mobileNo = !this.commonMethod.validateEmpty(responseData[0].mobileNo) ? responseData[0].mobileNo : '-';
        this.emailId = !this.commonMethod.validateEmpty(responseData[0].emailId) ? responseData[0].emailId : '-';
        this.custName = !this.commonMethod.validateEmpty(responseData[0].custName) ? responseData[0].custName : '-';
        this.accNo = this.dataService.primaryAccountDtl.sbAccount;
        this.communicationAdd = (responseData[0].add1 + ', ' + responseData[0].add2 + ", " + this.dataService.custProfileStateCityObj.city +" "+ this.dataService.custProfileStateCityObj.state+ ", " + responseData[0].pin).replace(", ,", ",");
        this.permanentAdd = (responseData[0].permenantAdd1 + ', ' + responseData[0].permenantAdd2 + ", "+ responseData[0].permenantStateCode + ", "+ responseData[0].permenantCityCode + ", "+ responseData[0].permenantPin) == ', , , , ' ? '-'
                        :  (responseData[0].permenantAdd1 + ', ' + responseData[0].permenantAdd2 + ", "+ responseData[0].permenantStateCode + ", "+ responseData[0].permenantCityCode + ", "+ responseData[0].permenantPin).replace(", ,", ",");
        this.addharCard = !this.commonMethod.validateEmpty(responseData[0].aadharNumber) ? responseData[0].aadharNumber : '-';
        this.panCard = !this.commonMethod.validateEmpty(responseData[0].panNumber) ? responseData[0].panNumber : '-';
        // limitsData.forEach(element => {
        //   if (element.DESCRIPTION == "Mobile Banking")
        //     this.mbLimits = element
        //   else if (element.DESCRIPTION == "Internet Banking")
        //     this.ibLimits = element
        //   else if (element.DESCRIPTION == "Wearable Banking")
        //     this.wbLimits = element
        //   else if (element.DESCRIPTION == "UPI Transaction")
        //     this.upiLimits = element
        // });
        this.maskedEmailId = this.maskCharacter(this.emailId, 12);
        this.maskedAddharCard=this.maskCharacter(this.addharCard,4);
        this.maskedPanCard=this.maskCharacter(this.panCard,4);
        this.dataService.userName = resp.userName;
        this.storage.setLocalStorage("username", resp.userName);

        // this.dataService.userName = resp.userName;
        if (resp?.base64Image != "")
          this.dataService.profileImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + resp?.base64Image);
        else
          this.dataService.profileImage = ""

        this.dataService.setDetails({ 'profileImg': 'data:image/png;base64,' + resp?.base64Image, 'username': this.userName, 'emailId': this.emailId });
        this.showDetails = true;
        this.dataService.profileDetails = responseData
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    console.log(resp);
    if (resp.opstatus == "02") {
      showToastMessage(resp.Result, "error");
    }
  }

  goToPage(routeName, routeType) {
    this.dataService.profileTabSelection = routeType;
    console.log("Tab Selection in Profile details :: ", routeType)

    this.router.navigateByUrl('/' + routeName);
  }

  profileEdit(profileEditValue) {
    this.dataService.profileEmailEdit = '';
    if (profileEditValue == 'primaryAccount') {
      this.commonMethod.openPopup('div.opt-verification.popup1')
    } else if (profileEditValue == 'username') {
      if (this.dataService.profileDetails[0].emailId == "") {
        showToastMessage("Please update emailId")
        //return
      }


      this.profileTypeModule = profileEditValue
      console.log(this.profileTypeModule)
    }
    else if (profileEditValue == 'aadhar') {
      this.profileTypeModule = profileEditValue
    }
    else {
      this.profileTypeModule = profileEditValue
      console.log(this.profileTypeModule);
    }

  }

  backToProfile(event) {
    this.profileTypeModule = event
  }

  closePopup() {
    this.commonMethod.closeAllPopup()
  }

  _closePopup(popupName) {
    // if(popupName == 'div.popup-bottom.update-auth-data'){
    //   this.logoutapp();
    // }
    this.commonMethod.closePopup(popupName);
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

  //   onAccountNoChange(accountNumber) {
  //     if (accountNumber != '') {
  //  this.selectedAccount = this.accountList.find(i => i.accountNo == accountNumber);
  //       console.log("selectedAccount===",this.selectedAccount)
  //     }
  //   }


  onAccountNoChange() {
    var accountNO;
    $('radio[name="account"]').change(function () {
      accountNO = this.value;
    });

  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url1 = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }



  ibchange(event) {
    console.log(event);
    console.log(event.target.value)
    this.ibLimits.custSetlimit = event.target.value
    // this.amountText = '₹'+this.ibLimits.custSetlimit
    this.amountText = OSREC.CurrencyFormatter.format(this.ibLimits.custSetlimit, { currency: 'INR', symbol: '₹' });
    var amt = parseInt(this.amountText.replace('₹',''))
     var amt1 = parseInt(this.amountText1.replace('₹',''))
     var amt2 = parseInt(this.amountText2.replace('₹',''))
     var amt3 = parseInt(this.amountText3.replace('₹',''))
     if(amt>=0 && amt1>=0 && amt2>=0 && amt3>=0)
     this.buttonDisabled=false;
     else
     this.buttonDisabled=true;
  }

  IBblur()
  {
    this.amountText = OSREC.CurrencyFormatter.format(this.ibLimits.custSetlimit, { currency: 'INR', symbol: '₹' });
  }

  mbchange(event) {
    console.log(event.target.value)
    this.mbLimits.custSetlimit = event.target.value
    // this.amountText1 = '₹'+this.mbLimits.custSetlimit
    this.amountText1 = OSREC.CurrencyFormatter.format(this.mbLimits.custSetlimit, { currency: 'INR', symbol: '₹' });
    var amt = parseInt(this.amountText.replace('₹',''))
     var amt1 = parseInt(this.amountText1.replace('₹',''))
     var amt2 = parseInt(this.amountText2.replace('₹',''))
     var amt3 = parseInt(this.amountText3.replace('₹',''))
     if(amt>=0 && amt1>=0 && amt2>=0 && amt3>=0)
     this.buttonDisabled=false;
     else
     this.buttonDisabled=true;
  }

  MBblur()
  {
    this.amountText1 = OSREC.CurrencyFormatter.format(parseFloat(this.mbLimits.custSetlimit.replace(/,/g, '')), { currency: 'INR', symbol: '₹' });
  }

  upichange(event) {
    console.log(event.target.value)
    this.upiLimits.custSetlimit = event.target.value
      // this.amountText2 = '₹'+this.upiLimits.custSetlimit
     this.amountText2 = OSREC.CurrencyFormatter.format(this.upiLimits.custSetlimit, { currency: 'INR', symbol: '₹' });
    //  let updatedCurrency = this.customCurrencyPipe.transform(this.amountText2.trim(), 'noDecimal').replace(/(\.[0-9]*?)0+/g, '');
    //  console.log("updatedvaluefirst",updatedCurrency)
    //  let updatedCurrencyss = updatedCurrency.trim().replace(/[^0-9]+/g, '')
    //  let newcurrency=updatedCurrencyss.substring(0, updatedCurrencyss.length - 2)
    //  console.log("updatedvalue",newcurrency)
    // replace(/[^0-9.]+/g,'');
    var amt = parseInt(this.amountText.replace('₹',''))
     var amt1 = parseInt(this.amountText1.replace('₹',''))
     var amt2 = parseInt(this.amountText2.replace('₹',''))
     var amt3 = parseInt(this.amountText3.replace('₹',''))
     if(amt>=0 && amt1>=0 && amt2>=0 && amt3>=0)
     this.buttonDisabled=false;
     else
     this.buttonDisabled=true;
  }

  UBblur()
  {
    this.amountText2 = OSREC.CurrencyFormatter.format(parseFloat(this.upiLimits.custSetlimit.replace(/,/g, '')), { currency: 'INR', symbol: '₹' });
  }

  focusRangeSlider(el, type ){
    // var lasttrim = el.substr(-2);
    // if (lasttrim == "00") {
    //   this.amountText = el.substr(0, el.length - 3)
    // }

    switch(type){
      case 'internetBanking':
        this.amountText = this.amountText.replace(/^\₹|,|\.\d*$/gm, '')

        break;

      case 'mobileBanking':
        this.amountText1 = this.amountText1.replace(/^\₹|,|\.\d*$/gm, '')
        break;

        case 'upiTransaction':
          this.amountText2 = this.amountText2.replace(/^\₹|,|\.\d*$/gm, '')
          break;

          case 'watchBanking':
            this.amountText3 = this.amountText3.replace(/^\₹|,|\.\d*$/gm, '')
            break;
    }

    // alert(this.amountText)
  }

  wbchange(event) {
    console.log(event.target.value)
    this.wbLimits.custSetlimit = event.target.value
    // this.amountText3 = '₹'+this.wbLimits.custSetlimit
    this.amountText3 = OSREC.CurrencyFormatter.format(this.wbLimits.custSetlimit, { currency: 'INR', symbol: '₹' });
    var amt = parseInt(this.amountText.replace('₹',''))
     var amt1 = parseInt(this.amountText1.replace('₹',''))
     var amt2 = parseInt(this.amountText2.replace('₹',''))
     var amt3 = parseInt(this.amountText3.replace('₹',''))
     if(amt>=0 && amt1>=0 && amt2>=0 && amt3>=0)
     this.buttonDisabled=false;
     else
     this.buttonDisabled=true;
  }

  WBblur()
  {
    this.amountText3 = OSREC.CurrencyFormatter.format( parseFloat(this.upiLimits.custSetlimit.replace(/,/g, '')), { currency: 'INR', symbol: '₹' });
  }



  uploadImage(event) {
    var self = this;
    this.dataService.emailIdProfile = self.emailId
    this.dataService.communicationAddress = self.communicationAdd
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
      var param = self.profileDtlsService.getProfileImageParam(self.emailId, self.userName, self.communicationAdd, profileImage);
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

  /**
   * Select image from gallery and crop image in UPI for profile image upload
   */
  selectImageFromGallery() {
    console.log("selectImageFromGallery");
    var self = this;
    self._closePopup('div.popup-bottom.profile-dtl');

    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      cordova.plugins.diagnostic.requestExternalStorageAuthorization(function (status) {
        switch (status) {
          case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            self.pluginService.checkImagePickerReadPermission().subscribe((isPermissionAvailable) => {
              if (isPermissionAvailable) {
                self.pluginService.pickImage().subscribe((filePath) => {
                  self.pluginService.cropImage(filePath).then((fileUri) => {
                    console.log("fileUri", fileUri);
                    if (fileUri) {
                      self.commonMethod._getResizeBase64(fileUri).then((base64Image) => {
                        // var param = self.profileDtlsService.getProfileImageParam(self.emailId, self.userName, self.communicationAdd, base64Image);
                        // self.dataService.request = param;
                        // self.dataService.endPoint = self.constant.serviceName_CUSTPROFILEUPDATE;
                        // self.dataService.authorizeHeader = "Profile Update";
                        // self.dataService.screenType = 'profileUpdate';
                        // this.router.navigate(['/otpSession']);

                        var param = self.profileDtlsService.getProfileImageParam(self.emailId, self.userName, self.communicationAdd, base64Image);
                        self.http.callBankingAPIService(param, self.storage.getLocalStorage(self.constant.storage_deviceId), self.constant.serviceName_CUSTPROFILEIMGUPDATE).subscribe(data => {
                          var resp = data.responseParameter
                          if (resp.opstatus == "00") {
                            self.dataService.profileImage = base64Image;
                          } else {
                          }
                        });
                      });
                    }
                  }, (err) => {
                    console.log(err);
                  });
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
              self.commonMethod.openPopup('div.popup-bottom.camera-info');
            })
            // case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
            //   window['imagePicker'].requestReadPermission();
            //   break; self.commonMethods.openPopup('div.popup-bottom.camera-info');
            break;
          default:
            break;
        }
      }, function (error) {
        console.error(error);
      });
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
      this.getGalleryAccessStatusIos();
    } else {
      console.log("unknown platform..");
    }

    // window['imagePicker'].requestReadPermission();

  }

  getGalleryAccessStatusIos() {
    let self = this;
    cordova.plugins.diagnostic.getCameraRollAuthorizationStatus(function(status){
      console.log('getCameraRollAuthorizationStatus = ', status);
      switch(status){
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
          console.log("Permission not requested");
          self.requestCameraRollAccessIos();
        break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
          console.log("Permission denied");
          //TODO: go to settings
          self.ngZone.run(() => {
            self.information = 'ENABLE_PHOTOS_PERMISSION_MSG';
            self.commonMethod.openPopup('div.popup-bottom.header-info');
          });
          break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
          console.log("Permission granted, opening gallery");
          self.openGalleryIos();
        break;
        default:
          console.log("Default => ", status);
        break;
      }
    }, function(error){
        console.error("The following error occurred: "+error);
    });
  }

  requestCameraRollAccessIos() {
    let self = this;
    cordova.plugins.diagnostic.requestCameraRollAuthorization(function(status){
      console.log("Authorization request for camera roll was " + (status == cordova.plugins.diagnostic.permissionStatus.GRANTED ? "granted" : "denied"));
      if(status == cordova.plugins.diagnostic.permissionStatus.GRANTED) {
        self.openGalleryIos();
      } else {
        self.getGalleryAccessStatusIos();
      }
    }, function(error){
        console.error(error);
    });
  }


  openGalleryIos(){
    var self = this;
    self.pluginService.openCameraGallery().then((fileUri) => {
      console.log("ios fileUri");
      self.dataService.imageUploadSelected = true;
      self.ngZone.run(() => {
        if(this.dataService.bezellessIphone) {
          $("#mainDiv").removeClass("pre-login");
        }
      });
      self.pluginService.cropImage(fileUri).then((fileUri) => {
        if (fileUri) {
          self.commonMethod._getResizeBase64(fileUri).then((base64Image) => {
            // var param = self.profileDtlsService.getProfileImageParam(self.emailId, self.userName, self.communicationAdd, base64Image);
            // self.dataService.request = param;
            // self.dataService.endPoint = self.constant.serviceName_CUSTPROFILEUPDATE;
            // self.dataService.authorizeHeader = "Profile Update";
            // self.dataService.screenType = 'profileUpdate';
            // this.router.navigate(['/otpSession']);

            var param = self.profileDtlsService.getProfileImageParam(self.emailId, self.userName, self.communicationAdd, base64Image);
            self.http.callBankingAPIService(param, self.storage.getLocalStorage(self.constant.storage_deviceId), self.constant.serviceName_CUSTPROFILEIMGUPDATE).subscribe(data => {
              var resp = data.responseParameter
              if (resp.opstatus == "00") {
                console.log("======  It is working ========");
                self.dataService.profileImage = this.domSanitizer.bypassSecurityTrustUrl(base64Image);
              } else {
              }
            });
          });
          // self.commonMethods._getFileContentAsBase64(fileUri).then((base64Image) => {
          //   self.croppedImageBase64 = base64Image;
          //   console.log('takePhoto base64 ios', base64Image);
          //   self.setUpdateProfile();
          // });
        }
      }, (err) => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    })
  }



  /**
   * Take photo from camera and crop image and update profile picture in UPI
   */
  takePhoto() {
    var self = this;
    self._closePopup('div.popup-bottom.profile-dtl');
    cordova.plugins.diagnostic.requestCameraAuthorization(function (status) {
      switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
          self.pluginService.openCamera().then((result) => {
            console.log(result);
            self.pluginService.cropImage(result).then((fileUri) => {
              if (fileUri) {
                console.log("fileUri 2 ==>" + fileUri);
                self.commonMethod._getResizeBase64(fileUri).then((base64Image) => {
                  // var param = self.profileDtlsService.getProfileImageParam(self.emailId, self.userName, self.communicationAdd, base64Image);
                  // self.dataService.request = param;
                  // self.dataService.endPoint = self.constant.serviceName_CUSTPROFILEUPDATE;
                  // self.dataService.authorizeHeader = "Profile Update";
                  // self.dataService.screenType = 'profileUpdate';
                  // this.router.navigate(['/otpSession']);

                  var param = self.profileDtlsService.getProfileImageParam(self.emailId, self.userName, self.communicationAdd, base64Image);
                  self.http.callBankingAPIService(param, self.storage.getLocalStorage(self.constant.storage_deviceId), self.constant.serviceName_CUSTPROFILEIMGUPDATE).subscribe(data => {
                    var resp = data.responseParameter
                    if (resp.opstatus == "00") {
                      self.dataService.profileImage = base64Image;
                    } else {
                    }
                  });
                });
              }
            }, (err) => {
              console.log(err);
            });
          }, (error) => {
            console.error('camera ', error);
          });
          break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
          self.ngZone.run(() => {
            self.information = 'ENABLE_CAMERA_PERMISSION_MSG';
            self.commonMethod.openPopup('div.popup-bottom.camera-info');
          });
          return;
        default:
          break;
      }
    }, function (error) {
      console.error(error);
    });

  }


  sliderInput(event)
  {


    var amoutVal = this.amountText.replace('₹','')
    console.log(amoutVal)
    if(parseFloat(amoutVal.replace(/,/g, '')) <= +this.ibLimits.maxAmount)
    {

      // this.ibLimits.custSetlimit = parseFloat(amoutVal.replace(/,/g, ''))
      // $(".maxmin").val("₹"+amoutVal)
      // $('.maxmin').autoNumeric('init', { aSign: "₹ " });

      this.ibLimits.custSetlimit = amoutVal;
    }

     else if(amoutVal == ''){
      this.ibLimits.custSetlimit = 0;
     }else{

      this.ibLimits.custSetlimit = this.ibLimits.maxAmount
      this.amountText = this.ibLimits.custSetlimit
      $(".maxmin").val("₹"+this.ibLimits.maxAmount)
      // $('.maxmin').autoNumeric('init', { aSign: "₹ " });
     // showToastMessage("Transaction Limit can not exceed "+this.ibLimits.maxAmount)
     }

     var amt = parseInt(this.amountText.replace('₹',''))
     var amt1 = parseInt(this.amountText1.replace('₹',''))
     var amt2 = parseInt(this.amountText2.replace('₹',''))
     var amt3 = parseInt(this.amountText3.replace('₹',''))
     if(amt>=0 && amt1>=0 && amt2>=0 && amt3>=0)
     this.buttonDisabled=false;
     else
     this.buttonDisabled=true;

     if(this.amountText=="")
     $(".maxmin").val("₹");
     else
     {
      if(this.amountText.indexOf(".")<0)
      $(".maxmin").val("₹"+this.amountText.replace('.',''))
     }
  }



  sliderInput1(event)
  {
    var amoutVal = this.amountText1.replace('₹','')
    if(parseFloat(amoutVal.replace(/,/g, '')) <= +this.mbLimits.maxAmount)
    {
      this.mbLimits.custSetlimit = amoutVal

    }
    else if(amoutVal == ''){
      this.mbLimits.custSetlimit = 0;
     }
     else
     {
      this.mbLimits.custSetlimit = this.mbLimits.maxAmount
      this.amountText1 = this.mbLimits.custSetlimit
      $(".maxmin1").val("₹"+this.mbLimits.maxAmount)
      //showToastMessage("Transaction Limit can not exceed "+this.mbLimits.maxAmount)
     }

     var amt = parseInt(this.amountText.replace('₹',''))
     var amt1 = parseInt(this.amountText1.replace('₹',''))
     var amt2 = parseInt(this.amountText2.replace('₹',''))
     var amt3 = parseInt(this.amountText3.replace('₹',''))
     if(amt>=0 && amt1>=0 && amt2>=0 && amt3>=0)
     this.buttonDisabled=false;
     else
     this.buttonDisabled=true;

     if(this.amountText1=="")
     $(".maxmin1").val("₹")
     else
     {
      if(this.amountText1.indexOf(".")<0)
      $(".maxmin1").val("₹"+this.amountText1.replace('.',''))
     }
  }

  sliderInput2(event)
  {
    var amoutVal = this.amountText2.replace('₹','')
    if(parseFloat(amoutVal.replace(/,/g, '')) <= +this.upiLimits.maxAmount)
    {
      this.upiLimits.custSetlimit = amoutVal

    }

    else if(amoutVal == ''){
      this.upiLimits.custSetlimit = 0;
     }else{
      this.upiLimits.custSetlimit = this.upiLimits.maxAmount
      this.amountText2 = this.upiLimits.custSetlimit
      $(".maxmin2").val("₹"+this.upiLimits.maxAmount)
      //showToastMessage("Transaction Limit can not exceed "+this.upiLimits.maxAmount)
     }

     var amt = parseInt(this.amountText.replace('₹',''))
     var amt1 = parseInt(this.amountText1.replace('₹',''))
     var amt2 = parseInt(this.amountText2.replace('₹',''))
     var amt3 = parseInt(this.amountText3.replace('₹',''))
     if(amt>=0 && amt1>=0 && amt2>=0 && amt3>=0)
     this.buttonDisabled=false;
     else
     this.buttonDisabled=true;

     if(this.amountText2=="")
     $(".maxmin2").val("₹")
     else
     {
      if(this.amountText2.indexOf(".")<0)
      $(".maxmin2").val("₹"+this.amountText2.replace('.',''))
     }
  }

  sliderInput3(event)
  {
    var amoutVal = this.amountText3.replace('₹','')
    if(parseFloat(amoutVal.replace(/,/g, '')) <= +this.wbLimits.maxAmount)
    {
      this.wbLimits.custSetlimit = amoutVal

    }
    else if(amoutVal == ''){
      this.wbLimits.custSetlimit = 0;
     }
     else
     {
      this.wbLimits.custSetlimit = this.wbLimits.maxAmount
      this.amountText3 = this.wbLimits.custSetlimit
      $(".maxmin3").val("₹"+this.wbLimits.maxAmount)
      //showToastMessage("Transaction Limit can not exceed "+this.wbLimits.maxAmount)
     }

     var amt = parseInt(this.amountText.replace('₹',''))
     var amt1 = parseInt(this.amountText1.replace('₹',''))
     var amt2 = parseInt(this.amountText2.replace('₹',''))
     var amt3 = parseInt(this.amountText3.replace('₹',''))
     if(amt>=0 && amt1>=0 && amt2>=0 && amt3>=0)
     this.buttonDisabled=false;
     else
     this.buttonDisabled=true;

     if(this.amountText3=="")
     $(".maxmin3").val("₹")
     else
     {
      if(this.amountText3.indexOf(".")<0)
      $(".maxmin3").val("₹"+this.amountText3.replace('.',''))
     }
  }

  goBack(){
    if(this.constant.getIsCordova() == "web"){
      this.router.navigateByUrl('/dashboard');
    }
    else{
      this.router.navigateByUrl('/dashboardMobile');
    }
  }


setLimits(){
    var param = this.profileDtlsService.limitsView();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ADDLIMITMASTERDETAILS).subscribe(data => {
      console.log(data);
       this.setlimitsview=data.set.records;
       console.log("setlimitsview", this.setlimitsview)
       this.setlimitsview.forEach(element => {
        if (element.limitName == "MOBILELIMIT")
            {this.mbLimits = element
              // this.amountText1 = '₹'+ this.mbLimits.custSetlimit
              this.amountText1 =  OSREC.CurrencyFormatter.format(this.mbLimits.custSetlimit, { currency: 'INR', symbol: '₹' });

            }
          else if (element.limitName == "IBLIMIT")
            {this.ibLimits = element
            //  this.amountText = '₹'+ this.ibLimits.custSetlimit
            this.amountText =  OSREC.CurrencyFormatter.format(this.ibLimits.custSetlimit, { currency: 'INR', symbol: '₹' });
            }
          else if (element.limitName == "WATCHLIMIT")
            {this.wbLimits = element
              // this.amountText3 = '₹'+ this.wbLimits.custSetlimit
              this.amountText3 = OSREC.CurrencyFormatter.format(this.wbLimits.custSetlimit, { currency: 'INR', symbol: '₹' });
            }
          else if (element.limitName == "UPILIMIT")
            {this.upiLimits = element
              // this.amountText2 = '₹'+ this.upiLimits.custSetlimit
              this.amountText2 =  OSREC.CurrencyFormatter.format(this.upiLimits.custSetlimit, { currency: 'INR', symbol: '₹' });
              // OSREC.CurrencyFormatter.format(this.upiLimits.custSetlimit, { currency: 'INR', symbol: '₹' });
            }
       });

      var resp = data.responseParameter;
      if (resp.opstatus == "00") {

        //  this.result = data.responseParameter.Result;
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })
  }


   addLimitsss(){
    this.buttonDisabled = true;
    this.otpFormLimit.reset()
    this.commonMethod.openPopup('div.otp-popuplimit');
    this.getResendOTPSession()
   }



  resendLeadsOtpSession() {

    this.startCounter();
    this.startMobileCounter();
    this.openPopup('otp-popup');

    // var resendLeadsOtpSessionParam = this.profileEditService.getResendLeadsOtpSessionCall(this.emailForm.value.emailId);
    // this.http
    // .callBankingAPIService(
    //   resendLeadsOtpSessionParam,
    //   this.constant.deviceID,
    //   this.constant.serviceName_RESENDLEADSOTP
    // )
    // .subscribe((data) => {
    //   var resp = data.responseParameter;
    //   this.tick = 1000;
    //   this.counter = 120;
    //   this.mobileCounter = 120;
    //   if (data.responseParameter.opstatus == '00') {
    //     showToastMessage(resp.Result, 'success');
    //     this.startCounter();
    //     this.startMobileCounter();
    //     this.resendOtpLinkEmail = emailId;
    //     this.openPopup('otp-popup');
    //   }
    //   else {
    //   }
    // });
  }

  openPopup(popupName) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }

  closeOtpPopup(popupName, formname) {
    this.commonMethod.closePopup('div.popup-bottom');
    if(formname == 'otpForm'){
      this.otpForm.reset();
      this.counter = 120;
      this.mobileCounter = 120;
    } else if(formname == 'otpFormLimit'){
      this.buttonDisabled = false;
      this.otpFormLimit.reset();
      this.counter = 120;
    }

    this.otpfailMsg = "";
  }

  startCounter(){
    this.counter = 120;
    if (this.countDown  && !this.countDown.closed) { this.countDown.unsubscribe(); }
    this.countDown = timer(0, this.tick).subscribe(() => { if(this.counter == 1) this.countDown.unsubscribe(); --this.counter });
  }

  startMobileCounter() {
    this.mobileCounter = 120;
    if (this.mobileCountDown  && !this.mobileCountDown.closed) { this.mobileCountDown.unsubscribe(); }
    this.mobileCountDown = timer(0, this.tick).subscribe(() => { if(this.mobileCounter == 1) this.mobileCountDown.unsubscribe(); --this.mobileCounter });
  }

  onKeyUpEventOtp(index: any, event: any, type: any) {
    const eventCode = event.which || event.keyCode;

    if (this.getSpasswordElementOtp(index, type).value.length === 1) {
      if (index !== 6) {
        this.getSpasswordElementOtp(index + 1, type).focus();
      } else {
        this.getSpasswordElementOtp(index, type).blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElementOtp(index - 1, type).focus();
    }
    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        if (type == 'mobile') {
          this.otpForm.get(this.mobileInput[index])?.setValue("");
        }
        else  if (type == 'email')
        {
          this.otpForm.get(this.emailInput[index])?.setValue("");
        }
        else  if (type == 'otp')
        {
          this.otpFormLimit.get(this.otpInput[index])?.setValue("");
        }
        this.getSpasswordElementOtp(index - 1, type).focus();
      }
    }
  }

  onFocusEvent(index, type) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElementOtp(item, type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  getSpasswordElementOtp(index: any, type: any) {
    if (type == 'mobile') {
      return this.mobileOTPRows._results[index].nativeElement;
    }
    else if(type == 'otp'){
      return this.otpRow._results[index].nativeElement;
    }
    else{
      return this.emailOTPRows._results[index].nativeElement;
    }
  }

  resendOTPLink(type) {

    var resendOTPReq = this.profileEditService.getResendLeadsOtpSessionCall(this.receivedEmailId, type);
    this.http
    .callBankingAPIService(
      resendOTPReq,
      this.storage.getLocalStorage(this.constant.storage_deviceId),
      this.constant.serviceName_RESENDLEADSOTPSESSION
    )
    .subscribe((data) => {
      var resp = data.responseParameter;
      if (data.responseParameter.opstatus == '00') {
        showToastMessage(resp.Result, 'success');

        if(type == 'email') {
          this.counter = 120;
          this.startCounter();
          this.otpForm.get('email1').reset();
          this.otpForm.get('email2').reset();
          this.otpForm.get('email3').reset();
          this.otpForm.get('email4').reset();
          this.otpForm.get('email5').reset();
          this.otpForm.get('email6').reset();
        }
        else if(type == 'mobile') {
          this.mobileCounter = 120;
          this.startMobileCounter();
          this.otpForm.get('mobile1').reset();
          this.otpForm.get('mobile2').reset();
          this.otpForm.get('mobile3').reset();
          this.otpForm.get('mobile4').reset();
          this.otpForm.get('mobile5').reset();
          this.otpForm.get('mobile6').reset();
        }
      }
      else {
        showToastMessage(data.responseParameter.Result, 'error');
      }
    });
  }

  validateOtp() {
    if (this.otpForm.valid) {
      var mobileOtp =
        this.otpForm.value.mobile1 +
        this.otpForm.value.mobile2 +
        this.otpForm.value.mobile3 +
        this.otpForm.value.mobile4 +
        this.otpForm.value.mobile5 +
        this.otpForm.value.mobile6;
      var emailOtp =
        this.otpForm.value.email1 +
        this.otpForm.value.email2 +
        this.otpForm.value.email3 +
        this.otpForm.value.email4 +
        this.otpForm.value.email5 +
        this.otpForm.value.email6;

      var param = this.profileEditService.getValidateLeadsOtpSessionCall(mobileOtp, emailOtp, this.receivedEmailId);

      this.http.callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_VALIDATELEADSOTPSESSION
      ).subscribe((data) => {
        console.log('=====validate otp=====', data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          this.closeOtpPopup('otp-popup','');
          console.log(data.responseParameter);
          this.changeEmail();
        }
        else {
          this.otpfailMsg = resp.Result;
        }
        this.otpForm.reset();
      });
    }
  }

  changeEmail() {
    var param = this.profileDtlsService.getEmailIdUpdateParam(this.receivedEmailId);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_EMAILREGISTRATIONCUSTOMER).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        showToastMessage(resp.Result, 'success');
        this.commonMethod.openPopup('div.success-popup')
        this.getProfileDetails();
        this.child.prevEventSection();
      }
    })
  }

  onReceivedEmailId(event) {
    this.receivedEmailId = event;
    console.log('received email Id: ', this.receivedEmailId);
    this.maskedEmailId = this.maskCharacter(this.receivedEmailId, 12);
    console.log('masked email id: ', this.maskedEmailId);
    var reqParam = this.profileEditService.getResendLeadsOtpSessionCall(this.receivedEmailId, 'all');
    this.getResendLeadsOtpSession(reqParam);
  }

  getResendLeadsOtpSession(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_RESENDLEADSOTPSESSION).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {

        this.counter = 120;
        this.mobileCounter = 120;
        this.tick = 1000;
        this.startCounter();
        this.startMobileCounter();
        this.commonMethod.openPopup('div.otp-popup');
      }
    })
  }

  maskCharacter(str, n) {
    // Slice the string and replace with
    // mask then add remaining string
    return ('' + str).slice(0, -n).replace(/./g, 'X') + ('' + str).slice(-n);
  }

  ngOnDestroy(){
    this.countDown=null;
    this.mobileCountDown=null;
  }

  // validateOtpAddlimit(){
  //  this.addLimitNewimplement();

  //   }
    ResendOTP(){
      this.getResendOTPSession();
    }

  validateOtpAddlimit(){
    if(this.otpFormLimit.valid){
    var mobileOtp =
      this.otpFormLimit.value.otp1 +
      this.otpFormLimit.value.otp2 +
      this.otpFormLimit.value.otp3 +
      this.otpFormLimit.value.otp4 +
      this.otpFormLimit.value.otp5 +
      this.otpFormLimit.value.otp6;
      var param = this.profileDtlsService.getChannelLeadOtpParamlimit(mobileOtp);
      this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_VALIDATEOTPSESSION).subscribe((data) => {
        console.log('=====validate otp=====', data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          console.log(data.responseParameter);
          this.addLimitnew();
        }
         else {
          // this.errorCallBack(data.subActionId, resp);
            this.otpfailMsg =resp.Result
            this.otpFormLimit.reset();
        }
      });
    }
  }

  addLimitnew(){
    var param = this.profileDtlsService.addLimitsNew(this.ibLimits.custSetlimit,this.mbLimits.custSetlimit,this.upiLimits.custSetlimit,this.wbLimits.custSetlimit);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ADDLIMITS).subscribe(data => {
      console.log(data);
      // this.setlimitsview=data.set.records;
      // console.log("setlimitsview", this.setlimitsview)
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        // showToastMessage(resp.Result, 'success');
         this.setLimits();
         this.commonMethod.closePopup('div.popup-bottom');
         this.buttonDisabled=true;
         this.otpfailMsg ="";
         this.limitsUpdateInfo = resp.Result;
         this.commonMethod.openPopup('div.popup-bottom.profile-limit-info');
        //  this.result = data.responseParameter.Result;
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })
  }

  closeLimitPopup() {
    this.commonMethod.closeAllPopup();
    this.limitsUpdateInfo = "";
  }

  getResendOTPSession() {
    var param=this.profileDtlsService.getResendOTPSessionParam(this.constant.val_UPDATETRANSATIONLIMIT);
    let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
    this.getResendOTPSessionApiCall(param,deviceID)
  }

   getResendOTPSessionApiCall(param,deviceID) {
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


  saveAuthMode(){
    var param = this.profileDtlsService.getSaveAuthenticationMode(this.authType);
    this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_UPDATETOKENFORCUSTOMER ).subscribe(data=>{
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.userInfo = this.translatePipe.transform('AUTHENTICATION_UPDATED_SUCCESSFULLY');
        this.commonMethod.openPopup('div.popup-bottom.update-auth-data');
        console.log(data.responseParameter);
      }
    });
  }

  selModeAuth(type){
    this.authType = type;
  }

fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}


  fetchLinkDelinkAccountList() {
    var param = this.linkAccService.linkDelinkFetchAccountsList();
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.key_deviceId),
        this.constant.serviceName_LINKDELINKFETCHACCOUNT
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          this.linkDelinkList = [];
          var dataSet = data.set?.records;
          dataSet.forEach((element) => {
            if (
              element.MobileNo != '' &&
              element.LinkDelingFLG == 'P'
            ) {
              this.linkDelinkList.push(element);
              this.maskedMobileNo = this.maskCharacter(this.linkDelinkList[0].MobileNo, 4);
            }
          });
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  goToResetTpin(route) {
    this.router.navigateByUrl('/'+ route);
  }

// imageCropped(event: ImageCroppedEvent) {
//     this.croppedImage = event.base64;

// }
imageLoaded() {
    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}

close(){
  this.commonMethod.closeAllPopup() ;
}
}
