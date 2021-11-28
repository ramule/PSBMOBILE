import { Injectable, Injector, NgZone } from '@angular/core';
import { AppConstants } from '../app.constant';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { LocalStorageService } from './local-storage-service.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subject, BehaviorSubject, Observable, ReplaySubject , timer, scheduled } from 'rxjs';
import { Router } from '@angular/router';
import { Location, TitleCasePipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { CustomCurrencyPipe } from '../pipes/custom-currency.pipe';
import { addresslist, UPIAccoutDetail2, UPIAccoutDetail, UPITransaction } from '../../app/utilities/app-interface';
import * as _ from 'lodash';
import * as moment from 'moment';
import { PendingByPayer, PendingWithMe } from '../models/pending-request.model';
import { Complaint } from '../models/complaint-model';
import { RaiseComplaint } from '../models/raise-complaint.model';
import { TrackStatus } from '../models/track-status.model';
import { Mandate, MandateList, MandatePayment, MandateRequest } from '../models/mandate-model';
import { CommonMethods } from '../utilities/common-methods';


declare var device: any;
declare var google:any;
declare var nativegeocoder: any;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  disableBack = false;
  private addPayeeConfirmSource = new BehaviorSubject({});
  private updateThemeSource = new BehaviorSubject({});
  private setThemeSource = new BehaviorSubject("");
  private commonBehaviorSource = new BehaviorSubject("");
  private userNameAutocomplete = new BehaviorSubject("");
  private showThemeSubject = new BehaviorSubject(false);
  private showSideNavSubject = new BehaviorSubject(false);
  private showNotificationSubject = new BehaviorSubject(false);
  public collectReqSource = new BehaviorSubject("");
  public vpaListSubject = new BehaviorSubject({});
  public upiLogoutSource = new Subject();
  private upiCommonBehaviorSource = new BehaviorSubject({});
  private upiBiometricCheckSource = new BehaviorSubject(false);
  private upiCommonNPCISource = new BehaviorSubject({});
  public intentCallbackSource = new BehaviorSubject({});
  private updateIconBehaviourSource = new BehaviorSubject("");
  public updateVerifyVPABehaviourSource = new Subject();

  addPayeeConfirmObservable = this.addPayeeConfirmSource.asObservable();
  updateThemeObservable = this.updateThemeSource.asObservable();
  setThemeObservable = this.setThemeSource.asObservable();
  commonBehaviorObservable = this.commonBehaviorSource.asObservable();
  $showthemeObservable = this.showThemeSubject.asObservable();
  $showSideNavObservable = this.showSideNavSubject.asObservable();
  $showNotificationObservable  = this.showNotificationSubject.asObservable();
  $userNameAutocomplete = this.userNameAutocomplete.asObservable();
  vpaListObservable = this.vpaListSubject.asObservable();
  upiCommonObservable = this.upiCommonBehaviorSource.asObservable();
  upiBiometricCheckObservable = this.upiBiometricCheckSource.asObservable();
  upiLogoutObservable = this.upiLogoutSource.asObservable();
  upiCommonNPCIObservable = this.upiCommonNPCISource.asObservable();
  intentCallbackObservable = this.intentCallbackSource.asObservable();
  updateIconsObservable = this.updateIconBehaviourSource.asObservable();
  updateVerifyVPAObservable = this.updateVerifyVPABehaviourSource.asObservable();

  constructor(private constants: AppConstants, private encryptService: EncryptDecryptService, private storage: LocalStorageService, private router: Router, private ngZone: NgZone, private location: Location, private customCurrencyPipe: CustomCurrencyPipe, private commonMethod: CommonMethods, private injector: Injector,
    private encryptDecryptService: EncryptDecryptService,
    private common: CommonMethods,
  ) { }
  upiStandAlone = false; //TODO: For only UPI release use 'true' for both use 'false'
  omniByPassSim = false; //TODO: To By pass sim binding in omni
  isBackClick = false;
  userDetails: any;
  userProfile: any = "";
  apyPensionDetails: any = [];
  bezellessIphone: boolean = false;
  imageUploadSelected: boolean = false;
  cameraPermissionGrantedIos: boolean = false;
  isFromAccountDetails = false;
  lienAccSel :any;
  fromForgotMPIN = false;
  // /cardLists: any;
  // frequentTransact: any;
  accDetails: any;
  accDetailsIdx: any;
  cardDetailsFrom:any;
  loginType: any;
  // MobNumberLoginForm: any;
  LoginForm: any;
  favouritePayeeToSend:any;
  mobStaticEncKey: any;
  fromInstantPay = false;
  instaSelectedTab = '';
  request: any;
  authorizeHeader: any;
  debitCardIssuedData = "";
  cardServiceType = "";
  endPoint: any;
  addPayeeSelectedBankType: any;
  themeName: string = "";
  sideBarColor: string = "";
  routefrom:string = '';
  sideBarBg: string = "";
  payEMIHeader:string = "";
  menuOption: string = "";
  bankTypeCode: string = "";
  updateLanguageCode: string = "";
  profileDetails: any;
  emailIdProfile : any ;
  communicationAddress: any;
  isCardUpgrade:boolean = false;
  regRefId: string = "";
  otpCode: any;
  beneficiaryType:any = "1";
  email: any;
  cityList = [];
  stateList = [];
  activitySettingData: any = [];
  public latitude = null;
  public longitude = null;
  public userLocationName = null;
  userLocation: any;
  isFromOtp: boolean = false;
  isFromMpinPage: boolean = false;
  isLogOut: boolean = false; // Will not trigger Onload biometric login in ios if logout manually
  isLogOutOmni: boolean = false;
  ipAddress = "";
  bankingType = "IB"; //IB - Internet Banking, MB - Mobile Banking
  //******** Dynamic page components ************
  public componentchange: any = [];
  public subject = new Subject<any>();
  private messageSource = new BehaviorSubject(this.componentchange);
  currentMessage = this.messageSource.asObservable();
  showDetails = false;
  fundTransferRouteURL = "";
  isNavFromMyAccounts = false;
  recentBeneficiaryList = [];
  accountOpenIsAtStep:any;
  payeeDtl:any;
  backURLCollectVPAList ="";
  isLatLongFetched = false;
  primaryAccountDtl:any;
  paymentType:any = '';
  initialAccBalance:any = '';
  profile:any={};
  fromAccInfoAccNumber:any = ''
  fromAccountInfo = false;
  isEditPayee = false;
  regType:any;
  refId:any;
  fundTransferTabType = 'self'
  errorResult:any = "";
  isAddPayeeFrompage:any;

  fistTimeLoad: boolean = false;
  selectedDataCard:any;
  physicalCard:any;
  billerValueMob : any = ''
  billtype:any;
  billcategory:any;
  // ***************************************************
  fromManagePayee = {
    isfromMangepayee: false,
    valuefromMagepayee: ''
  }
  linkedAccountDetails: any;
  pendingByPayer: PendingByPayer;
  pendingWithMe: PendingWithMe;
  pendingReqBlockUPIResp: any;
  pendingReqRejectResp: any;
  validateAddressResp: any;
  pendingBlockSuccessURL = "";
  upiCollectSelectedVpa = [];
  upiSearchCollectPayeeList = [];
  reportSpam: any;
  favPayeeList = [];
  benficiaryListData = [];
  confmpin = '';
  upiCollectsearchType = "";
  profileImg: "";
  gotpage="";
  isLoggedIn = false;
  isUPILogin = false;
  isOmniLogin = false;
  lastLoginDate:number;
  loanType = "";
  loanDetails: any;
  selLoanAccDtlNo:any;
  loanUserDtl:any;
  loanAmount:any;
  billPayObj: any;
  previousPageUrl: any;
  currentPageUrl: any;
  baseStartUrl: any;
  preApprovedPreviousPageUrl: any;
  vpaDtls: any;
  isSetVpaDtl: boolean = false;
  fetchUPIProfileDetails = true;
  fetchUPIbenificiaryLists = true;
  isUPILoginFlow = false;
  profileTabSelection : any  = '';
  profileEmailEdit:any = ''
  receiptmsg:any= "";
  receipdRefID:any = "";
  dateFormat:any="";
  amountFormat:any = "";
  accountNumberss:any=""
  timeFormat = "h:mm:ss a";
  transactionLimitAmount = "200000"
  isOTPMaxAttempts = false;
  isPayeeSelected = false;
  singleChequeInquiryList:any = [];
  bulkChequeInquiryList:any = [];
  singleChequeNumber:any = '';
  crmReferenceNumber:any='';
  debitCardList:any=[];
  postivePayData:any;
  inwardchecklistvalue=[];
  inwardCheckDetailL=[];
  profiledateDetails:any=[];
  omniProfileName = ''
  nomineeDetailsData : any = [];
  loanAccNo:any;
  dellinkAccountnumber:any;
  editusername:any=[]
  isUsernameChanged: boolean = false;
  isUPIInstantPay = false;
  reissuedCardObj={
  debitCardNumber:'',
  accountNumber:'',
  reason:'',
  msg:'',
  rrn:'',
  response:'',
}
///////////////////////////// billDESK //////////////////////////////////////////////
electricBillObj={
  custID :'',
  billerID: '',
  billername:''
}
selectedNomineeAccNo="";
billerdata:any;
billHistoryDetails:any
unpaidbilldetail:any
finalBilldata:any
mobilePrepaidDetails:any;
allregisteredBillerList:any
allUnpaidBillerList:any
finalRecentTransList:any
///////////////////////////// billDESK //////////////////////////////////////////////
//forgotPassUsername
hotlistCardObj={
  debitCardNumber:'',
  accountNumber:'',
  reason:'',
  msg:'',
  rrn:'',
  response:'',
  cardNo:'',
  cardType:''
}
fromInstaPay = false;
  umn:any ='';
  cardDetailsObj={
  selAcc:'',
  name:''
  }

  listCountObj={
  itemsPerPage: 10,
  currentPage: 1,
   }
paymentReminderType = ''

  freezeReceiptObj = {
    msg:'',
    RRN:'',
    receiptType: '',
    refID:'',
    accountNumber:'',
    typeOfFreeze:'',
    remarks:'',
    date:''
  }
  reqcheqbookObj ={
    accNumber:'',
    checkPageNo:'',
    commAddress: '',

  }

  donationReceiptObj = {
    msg:'',
    RRN:'',
    receiptType: '',
    refID:'',
    accountNumber:'',
    to_acc:'',
    amount:'',
    remarks:'',
    date:'',
    payeeName:''
  }

  openFDReceiptObj = {
    depositType : '',
    depositScheme : '',
    interestPayout : '',
    depositorType :'',
    depositAmount : '',
    tenure : '',
    interestRate : '',
    maturityAmount : '',
    maturityDate :'',
    modeOfOperation : '',
    maturityInstruction :'',
    maturityPayoutAccount : '',
    nomineeName :'',
    tenureMonth:'',
    tenureDays:'',
  }

  openRDReceiptObj = {
    depositType :'',
    depositorType:'',
    installmentAmount :'',
    tenure:'',
    interestRate:'',
    monthlyDebitDate:'',
    maturityAmount:'',
    maturityDate:'',
    modeOfOperation:'',
    debitAccount:'',
    maturityInstructions:'',
    maturityPayoutAccount:'',
    nomineeName:'',
    tenureMonths :'',
    paymentFrequency:''
  }

  physicalCardObj:any;

  pmjjbyDetailsOverviewObj: any = {
    scheme: '',
    name: '',
    dob: '',
    nomineeName: '',
    debitAccount: '',
    premiumAmount: '',
    dateOfEnrollment: ''
  }

  pmsbyDetailsOverviewObj: any = {
    scheme: '',
    name: '',
    dob: '',
    nomineeName: '',
    debitAccount: '',
    premiumAmount: '',
    dateOfEnrollment: '',
  }

  closeFDObj: any = {
    depositType: '',
    depositScheme: '',
    depositorType: '',
    FDAccNumber: '',
    rateOfInterest: '',
    depositAmount: '',
    currentMaturityAmount: '',
    creditToClose: '',
    maturityDate: '',
    maturityPayoutAccount: '',
    remarks:''
  }

  closeRDObj: any = {
    depositType: '',
    depositScheme: '',
    depositorType: '',
    RDAccNumber: '',
    rateOfInterest: '',
    depositAmount: '',
    currentMaturityAmount: '',
    creditToClose: '',
    maturityDate: '',
    maturityPayoutAccount: ''
  }

  accTypeSelected:any=""
  subAccTypeSelected : any = ''



leaveFeedbackObj = {
transactionId: '',
type:''
}



  transactionReceiptObj = {
    date: undefined,
    msg: '',
    trans_Id: '',
    from_acc: '',
    to_acc: "",
    payee_name: '',
    payee_id: '',
    paymentType: '',
    amount: '',
    remarks: '',
    receiptType: '',
    RRN: '',
    redirectUrl: '',
    name: '',
    mobileNo: '',
    emailId: '',
    accountNo: '',
    accountHolderName: '',
    accountNickName: '',
    transferLimit: '',
    ifscCode: '',
    internationalTransfer: '',
    chequeType: '',
    chequeNo: '',
    startCheque: '',
    stopCheque: '',
    branchName: '',
    loanType: '',
    type:'',
    payeeAddr:'',
    payerAddr:'',
    upiOmnifromAcc:'',
    scheduledDate:'',
    scheduledType:'',
    isScheduled : false,
    mmid:'',
    confirmmobilenumber:'',
    modeOfTransfer: '',
    benificaryBankName: '',


    //hotlistcard
    debitCardNumber:'',
    accountNumber:'',
    reason:'',
    rrn:'',
    response:'',
    cardNo:'',
    cardType:'',

    // Add payee Object
    payeeAccNumber: '',
    payeeAccName: '',
    payeeNickname: '',
    payeeIfscCode: '',
    payeeMobileNo: '',
    payeeMMID: '',
    payeeVpa: '',
    payeeTransLimit: '',
    payeeIfsc: '',
    payeeAccNo: '',
    payeeNickName: '',


    // postive pay
    selectedName:'',

    // freeze account
    refID:'',
    typeOfFreeze:'',

    //re-issuecard

    //donation object
    payeeName:'',

    // positive pay
    micr:'',


    //apy object
    dob: '',
    nomineeName: '',
    debitAcc: '',
    pensionAmt: '',
    premiumAmt: '',
    premiumFreq: '',
    dateOfEnroll: '',
    nomineeAge: '',
    pranNo: '',
    premiumAmount: '',

    //request-cheq book
    accNumber:'',
    checkPageNo:'',
    commAddress: '',

    //apply-card
    cardVariant:'',
    isPhysicalApplied: '',

    //quicklock
    operation: '',

    cbsCode:'',
    newCardNo: '',
    cardMode:'',
    cardApplyType:'',
    blockReason:'',

    cardOnOffType: '',
    cardOperationType: '',
    MaskCardNumber:'',
  };



  profileEditObj=
  {username:'',
  newUserName:'',
  emailId:'',
  address1:'',
  address2:'',
  address3:'',
  city:'',
  state:'',
  pinCode:'',
  documentNumber:'',
  addressProof:'',
  accNo:'',
  mobileNo:'',
  profileImage:'',

 }

 withinBankPayeeList:any;
 outsideBankPayeeList:any;
 mmidBankPayeeList:any;
 vpainBankPayeeList:any;
 totalLienAmount:any;

  receiptType: any = '';
  FDRDAccNumber: any = '';

  positivePayReceiptObj = {
    accountNo:'',
    payee_name: '',
    amount:'',
    selectedName:'',
    chequeNo:'',
    date:'',
    micr:'',
    msg:'',
    rrn:'',
    response:'',

  }

  stopChequeReceiptObj ={
    accountNo:'',
    chequeNo:'',
    fromChequeNo:'',
    toChequeNo:'',
    remark:'',
    msg:'',
    rrn:'',
    response:'',
  }

  notificationArray:any=[]

  impsTransactionReceiptObj ={
    accName:'',
    accNumber:'',
    date:'',
    remark:'',
    installment:'',
    frequency:'',
    amount:'',
    RRN:'',
    status:'',
    message:'',
  }

  nomineeReceiptObj ={
    nomineeName : '',
    nomineeRelationship : '',
    address1 : '',
    address2 : '',
    dateOfBirth : '',
    minorFlag : '',
    guardianName : '',
    guardianAddress : '',
    state : '',
    city : '',
    msg:'',
    response:'',
    rrn:'',
  }

  siReceiptObj = {
    msg:'',
    response:'',
    rrn:'',
  }

  custProfileStateCityObj: any = {
    state: '',
    city: '',
    stateId: '',
    cityId: ''
  }

  minorFlagNominee : any ;

  sendNotification(message: string) {
    this.subject.next({ text: message });
}

getNotification(): Observable<any> {
  return this.subject.asObservable();
}
  breadcrumblist = [{'currentRoute':'dashboard' ,"routeName": '/dashboard'}];


  getBreadcrumb(currentRoute , routeName){

    if(routeName != '' ){

      if(currentRoute == "sidenav" || currentRoute == "DASHBOARD"){

        if( '/'+routeName != this.router.url){
          this.breadcrumblist = [{'currentRoute':'dashboard' ,"routeName": '/dashboard'}];
        }
      }else{
        var ind = -1
        ind = this.breadcrumblist.findIndex(function(person) {
          return person.routeName == routeName });
        if(ind == -1){
        this.breadcrumblist.push({'currentRoute':currentRoute ,"routeName": routeName})
        }else{
          this.breadcrumblist.splice(ind + 1, 1);
        }
      }
  }
}



breadcrumroute(routeName){
  this.updateBreadcrumb(this.router.url , routeName)
  this.router.navigateByUrl('/' + routeName);
}

updateBreadcrumb(currentRouteName , clickedRoute){

   var index= this.breadcrumblist.findIndex(function(person) {
      return person.routeName == clickedRoute
    });

    this.breadcrumblist.splice(index, this.breadcrumblist.length - index);
  }

  fromRecentTransaction = false;
  forgotPassUsername: any = "";
  forgotPassDtl:any;
  customerAccountList = [];
  totalLiabilities = 0;
  totalSaving = 0;
  totalAssets = 0;
  customerCanTransferAccountList = [];
  customerLoanAccountList = [];
  customerMyDepostie = [];
  customerBorrowingsList = [];
  isLoanAccount:boolean = false;
  isNRENRO:boolean = false;
  standingInstructionParam:any;
  customerOperativeAccList = [];
  selectedApplyCard;
  currentCardIndex = 0;
  selAccNum:any;
  standingInstructionDtl:any;
  standingInstructionDelete : any ;
  noSIPeriod : any ;
  totalMyDepositBalance = 0;
  totalMyBorrowingsBalance = 0;
  totalMyOperativeBalance = 0;
  loginData = {
    "mobnumber": null,
    "tab": 'user'
  }
  registrationData: any;
  registrationUpiData: any;
  registrationSecQue: any;
  regIsAtStep: number = 1;
  isLoanRegistration:boolean = false;
  showMigrated:boolean = true;
  pendingAtToken:boolean = false;
  isFromOmniReg = {
    isStepI: true,
    isStepII: true,
    isStepIII: true,
    isStepIV: true,
    isStepV: true,
    isStepVI: true,
    isStepVII: true,
    isStepVIII: true,
    isAlreadyRegister: false
  }
  timeoutHeader= ''
  timeoutMsg= ''
  fetchContacts = false;
  userBlocked: boolean;
  fetchContactsFromDevice = false;
  isMigratedUser = false;
  deviceMobileNo = "";
  otpPreviousPage: any; //page to redirect when back event is called
  otpNextPage: any; //page to redirect on next page
  otpSessionPreviousPage: any; //page to redirect when back event is called
  otpSessionNextPage: any; //page to redirect on next page
  screenType: string;
  linkingMobileNumber:string;
  referenceNo: any;
  pendindReqResp: any;
  ominiChannelParam: any = {};
  otplength:any;
  tpinlength:any;
  receiptTransactionDate:any;
  otpName:any = 'OTP'


  customerID:any;

  //TODO : Change this when integration in mobile
  channelType: string = "MOB"; //channel to be selected at the time of registration or login
  isDeepLinkIntentCalled = false;
  isSelfTransfer = false;
  userRegStaus: any;
  userUpiRegStaus: any;
  activityMaster: any;
  collectReceiptObj: any;
  collectReceiptTransId = ""
  regFeildData: any = {
    custId: '',
    accNo: '',
    cardNumber1: '',
    cardNumber2: '',
    cardNumber3: '',
    cardNumber4: '',
    expDate1: '',
    expDate2: '',
    expDate3: '',
    expDate4: '',
    cardPin1: '',
    cardPin2: '',
    cardPin3: '',
    ibUserName: '',
    ibPassword: '',
    ibmpin: '',
    bankToken: '',
    username: '',
    password: '',
    confPassword: '',
    quest1: '',
    ans1: '',
    quest2: '',
    ans2: '',
    quest3: '',
    ans3: '',
    tpin: '',
    confTpin: '',
    mpin1: '',
    mpin2: '',
    mpin3: '',
    mpin4: '',
    mpin5: '',
    mpin6: '',
    confMpin1: '',
    confMpin2: '',
    confMpin3: '',
    confMpin4: '',
    confMpin5: '',
    confMpin6: '',
  };

  mpin: string = "";
  simData;
  selectedSim;
  upiRegistrationFlow: boolean = false;
  omniRegistrationFlow: boolean = false;
  simBindingSuccess: boolean = false;
  omniRegisteredUser: boolean = false;
  mobileBankingRegisteredUser: boolean = false;
  upiRegisteredUser: boolean = false;
  isFromMpinLogin: boolean = false;
  isEnterBankToken: boolean = false;
  activeSimCount: number = 0;
  imei: any;
  uuid: any;
  macAddress: any;
  platform: any = "android";
  // platform: any = "ios";
  devicemodel: any;
  osversion: any;
  isBiometric: any;
  isMPINEnable: any;
  randomValue: any;
  upiCallTransactionHistoryApi = true;
  navigationFromDashboard = false;
  isCordovaAvailable = window.hasOwnProperty('cordova');
  // onlyUpiRegistrationSucecss: boolean;
  bypassSmsSelectSim: boolean = false; // bypass sms send from select sim component
  // public isOffline: Boolean = false; // no network
  // public isOnline: Boolean = true; // network present
  private isOffline = new BehaviorSubject(false);
  private isOnline = new BehaviorSubject(true);
  isOfflineObservable = this.isOffline.asObservable();
  isOnlineObservable = this.isOnline.asObservable();
  offerDetails = "";
  qrScanValue: any;
  activatedRouteArray: any;
  accountProviderList: any;
  selectedOtherBankName: any;
  upiIdDetails: any;
  upiUserEmailAdress = "";
  regMobileAPIResponse: any;
  preApprovedFlowIdentifier: string = "";
  preApprovedBankName: string = "";
  preApprovedAccNo: string = "";
  preApprovedAmount: string = "";
  globalUpiAccountData: any;
  globalUpiFormData: any = {};
  mandateRevokeMsg: string = "";
  pauseUnpauseMsg: string = "";
  socialSecFromDashboard = false;
  quickAccessFromDashboard = false;
  // profileImage: any = "./assets/images/svg/user-profile-w.svg";
  profileImage: any = '';
  recentTransData:any ={};
  userName = "NA";
  simBindingInterval;
  otpSendInterval;
  //VPA List ========
  vpaAddressList: addresslist[] = [];
  upiCollectVpaList = [];
  vpaListCache: boolean; // Cache flag if true use the dataservice vpaAddressList if false then call api and save it in vpaAddressList
  selectedVpaDetailsCollect: any;
  selectedVpaDetailsMandate: any;
  softMPIN: any; // this MPIN is used for Soft login after re
  linkAccSelectedVpaDetails: any;
  isLinkAccountFlow: any;
  migratedVPAList = [];
  feedbackType:any = "";
  apyObj: any = {
    name: '',
    dob: '',
    nomineeName: '',
    debitAcc: '',
    pensionAmt: '',
    premiumAmt: '',
    premiumFreq: '',
    dateOfEnroll: '',
    nomineeAge: '',
    pranNo: ''
  }
  //pay module
  upiPayVpaList = [];
  selectedVpaDetailsPay: any;
  deletedAccountDetails: {};
  payeeObj: any = {};
  addPayeeObj: any = {
    payeeAccNumber: '',
    payeeAccName: '',
    payeeNickname: '',
    payeeIfscCode: '',
    payeeMobileNo: '',
    payeeMMID: '',
    payeeVpa: '',
    payeeTransLimit: '',
    payeeIfsc: '',
  }
 managePayeeToAddpayee = '';
 beneficiaryList:any={
  payeeAccNumber: '',
 }
 beneficiaryTypeValue:any;
 formType:any;
 cardList = [];
 currentCard:any;
  managePayeeToFundTransferData:any = '';
  managePayeeToSend: any= {
    selected:''
  }
  receiptBackPage:any = "";
  payReceiptObj: any;
  payReceiptTransId = "";
  payFetchContacts = false;
  maskRegisternumber = "";
  prevUrlForCreateVpaSuccess = ""
  uniqueVerificationCode = "";
  uniqueMobDeviceID = "";
  mandatePauseFlag: boolean;
  raiseComplaintResp: any;
  actAndIfscPay: any;
  verifyAddressResp: any;
  isRaiseComplaint = false;
  isTrackStatus = false;
  upiModifyMandateCommonURL = "";
  informationLabel = "";
  informationDetails = "";
  primaryBtnText = "";
  simInfoDetails = "";
  mobileContacts = [];

  mobileContactsClone = [];
  upiContactsList = [];
  updatedContacts = [];
  isContactSyncCompleted = false;
  fcmToken: any;
  secondaryBtnText = "";
  // UPI Complaint models
  complaint: Complaint;
  raiseComplaint: RaiseComplaint;
  trackStatus: TrackStatus;
  createMandatePayment: MandatePayment;
  requestMandate: MandateRequest;
  pendingWithMeMandateList: MandateList[] = [];
  approveMandateDetail: Mandate;
  pendingMandateWithPayer: Mandate;
  completedMandate: Mandate;
  createdMandate: Mandate;
  acceptedMandate: Mandate;
  modifyMandateDetails = {
    validyEndDate: '',
    amount: ''
  }
  mobileContactsSorted = [];
  executeMandateResp: any;
  enablePendingWithPayerTab = false;
  upiAccount: UPIAccoutDetail2;
  tempUPIAddList: addresslist;
  payeeRevokeTransId = "";
  // VPA List End
  // TransactionList ========
  upiTransactionList: UPITransaction[] = [];
  tempUPITransaction: UPITransaction;
  upiTransactionSelected: UPITransaction;
  createDefaultVPAFlag: boolean = false;
  notificationCountApiCalled: boolean = false;
  bankList =[];
  bankDetails:any;
  mandateHistoryDetails ={};
  // UPI popup msg variables
  information = "";
  errorMsg = "";
  recentTransactionUPI: any;
  //Search payee type favorite or rec
  upiSearchType = "";
  upiSearchPayeeList = [];
  upiValidatedVpaAdress = "";
  isSetReminderClicked = false;
  isBlockUPIIdClicked = false;
  isRejectClicked = false;
  isAcceptClicked = false;

  // contact previous url for UPI
  contactPrevURL = "";
  isCredCallbackSuccess = false;

  // Mandate Module
  upiMandateVpaList = [];
  dashboardCustomizeMenuArr: any = [];
  createMandateResp: any;
  requestMandateResp: any;
  approveMandateResp: any;
  declineMandateResp: any;
  modifyMandateResp: any;
  fdrdNomineeName: any;

  declineMandateLinkedAccount: any;
  declineMandateLinkedVPA: any;
  accountOpenMobNo: any;
  accountOpenRRN: any;
  accountIFscDetails ="";

  currentLat:any;
  currentLng:any;
  selectedFlow: string = "";
  mandateTypeRouteName = "";
  // User Profile Module
  deleteVpaObj: any;
  VPAAccountDetails: any;
  collectAcceptVPADetails: any;
  /**
   * get check update api call request
   */

  // UPI Benficiary variables
  upiBenfMMId = "";
  upiBenfIfsc = "";
  upiBenfAccNo = "";

  // Self Transfer Module
  selfTransferActList: any;
  selfTransReceiptObj: any;
  selfTransReceiptTransId = "";
  isContactsSyncEnabled = false;
  isVpaZero = false;

  accountDtls = {
    UPI_ADDRESS : '',
    accountNo : '',
    branch_name : '',
    customerID : ''
  }
  omniUPIFlow = false;
  fromOmniLogin = false;
  omniAllRecentPayeeList = [];
  createMandateTxnId: any = "";
  notificationBadge:any=0
  // Scan QRCode Module
  ScanQrCodeData: any = {};

  //UDIR Module
  trackStatusRes: any;

  checkForUpdateCall(isUPI?:boolean) {
    console.log("sha256 ",device.sha256);
    console.log(this.constants.val_mobPlatform);
    const map = {
      [this.constants.key_mobPlatform]: this.isCordovaAvailable ? this.constants.val_mobPlatform : 'web',
      [this.constants.key_entityId]: this.constants.val_entityIDMob,
      [this.constants.key_deviceId]: this.constants.deviceID,
      [this.constants.key_clientAppVersion]: this.platform.toLowerCase() == this.constants.val_android ? this.constants.val_mobileAppVersion_android : this.platform.toLowerCase() == this.constants.val_ios ? this.constants.val_mobileAppVersion_ios : this.constants.val_mobileAppVersion_android,
    }
    if(this.isCordovaAvailable){
      if(this.platform.toLowerCase() == this.constants.val_android){
        map[this.constants.key_checkVersionAuthKey] = device.sha256;
      }
    }
    console.log("CheckForNewVersion Request => " , JSON.stringify(map));
    console.log(map);

    return this.encryptService.encryptText(this.constants.staticKey, JSON.stringify(map));

  }

  getDynamicPageConfig() {
    const map = {
      [this.constants.key_mobPlatform]: this.constants.val_mobPlatform,
      [this.constants.key_entityId]: this.constants.val_entityIDMob
    }
    console.log("map===>" + JSON.stringify(map))
    return this.encryptService.encryptText(this.constants.staticKey, JSON.stringify(map));
  }

  getCustomOptions(){
   let customOptions: OwlOptions= {
    autoplay: false,
    autoplayTimeout: 6000,
    loop: false,
    rewind: false,
    nav: false,
    responsive: {
      0: {
        items: 1
      }
    }
  }
    return customOptions ;
  }
  getAccountCarouselOptions() {
    var autowidth ;
    if(window.innerWidth < 767) {
      autowidth = false
    }else{
      autowidth = true
    }

    let accountCarouselOptions: OwlOptions = {


      margin: 20,
      nav: false,
      autoplay: false,
      autoplayTimeout:3000,
      loop: false,
      rewind: true,
      autoWidth: autowidth,
      dots:false,
      responsive: {
        0:{
          items:1,
          nav:false,
          dots:true,
      },
      600:{
          items:1,
          nav:false,
          dots:true,
      },
      768:{
          items:2,
          nav:false,
           loop:false
      },
      1024:{
          items:2,
          nav:false,
           loop:false
      },
      1200:{
          items:2,
          nav:false,
           loop:false
      },
      1366:{
          items:3,
          nav:false,
           loop:false
      },
      1400:{
          items:3,
          nav:false,
           loop:false
      },
      1600:{
          items:3,
          nav:false,
           loop:false
      },

      }
    }
    return accountCarouselOptions;
  }
  getAccountCarouselOptionsMobile() {

    let accountCarouselOptionsMobile: OwlOptions = {
      loop: false,
      nav: false,
      merge: true,
      dots: true,
      items: 1,
      autoplay: false,
      responsive: {
        0: {
          items: 1,
          nav: true,
          dots: true
        },
        600: {
          items: 3
        },
        900: {
          items: 3
        }
      }
    }
    return accountCarouselOptionsMobile;
  }
  getDashboardMobileServices(){

    let dashboardMobileServices: OwlOptions = {
      loop: false,
      nav: false,
      dots: true,
      margin: 20,
      merge: true,
      autoplay: false,
      navSpeed: 2000,
      responsive: {
        0: {
          items: 4,
          nav: false,
          dots: true
        },
        600: {
          items: 3
        },
        900: {
          items: 3
        }
      }

    }
    return dashboardMobileServices;

  }

  getUpiCarouselOptions() {
    let getUpiCarouselOptions: OwlOptions = {
      autoWidth: true,
      loop: false,
      nav: false,
      merge: true,
      dots: true,
      margin: 20,
      autoplay: false,
      navSpeed: 2000,
      responsive: {
        0: {
          items: 1,
          nav: false,
          dots: true
        },
        600: {
          items: 3
        },
        900: {
          items: 3
        }
      }
    }
    return getUpiCarouselOptions;
  }

  getManageCarouselOptions(startPos?: any) {

    let getManageCarouselOptions: OwlOptions = {
      // margin:15,
      // autoWidth: true,
      // loop: true,
      // nav: false,
      // merge: true,
      // dots: true,
      // margin: 20,
      // autoplay: false,
      // navSpeed: 2000,
      autoplay: false,
      autoWidth: true,
      autoplayTimeout: 3000,
      loop: false,
      dots: true,
      rewind: true,
      nav: false,
      //startPosition: 0,
      responsive: {
        0: {
          items: 1
        },
        480: {
          items: 1
        },
        640: {
          items: 2
        },
        768: {
          items: 2,
          nav: true,
          // loop:false
        },
        1024: {
          items: 3,
          nav: true,
          // loop:false
        },
        1200: {
          items: 3,
          nav: true,
          // loop:false
        },
        1366: {
          items: 3,
          nav: true,
          // loop:false
        },
        1400: {
          items: 3,
          nav: true,
          // loop:false
        },
        1600: {
          items: 4,
          nav: true,
          // loop:false
        }
      }

    }
    return getManageCarouselOptions;
  }

  getProfileCarouselOptions() {
    let getProfileCarouselOptions: OwlOptions = {
      autoWidth: true,
      loop: false,
      nav: false,
      merge: true,
      dots: true,
      margin: 20,
      autoplay: false,
      navSpeed: 2000,
      responsive: {
        0: {
          items: 1,
          nav: false,
          dots: true
        },
        600: {
          items: 3
        },
        900: {
          items: 3
        }
      }
    }
    return getProfileCarouselOptions;
  }
  /**
   * function check if tpin or otp is allowed for a particular page or not
   * @type
   */
  getVerifyAllowedStatus(type) {
    var isRedirectTo: boolean = false;
    var _activityName = this.endPoint;
    var status
    console.log("_activityName====>", _activityName);
    this.activityMaster.forEach(el => {
      status = type == 'otp' ? el.isOtpAllowed : el.isTpinAllowed;
      if (el.activityName == _activityName.split("/")[1] && status == "Y") {
        isRedirectTo = true;
      }
    });

    return isRedirectTo;
  }

  getCustomizeMenuCarouselOptions() {
    let customizeMenuCarouselOptions = {
      autoWidth: true,
      loop: false,
      nav: true,
      merge: true,
      dots: true,
      autoplay: false,
      margin: 15,

      responsive: {
        0: {
          items: 1,
          nav: false,
          dots: false
        },
        600: {
          items: 2
        },
        900: {
          items: 8
        }
      }
    }
    return customizeMenuCarouselOptions;
  }
  getrecommendedCardCarouselOptions() {
    let recommendedCardCarouselOptions = {
      autoWidth: false,
      loop: false,
      nav: true,
      merge: true,
      dots: false,
      autoplay: false,
      items: 7

    }
    return recommendedCardCarouselOptions;
  }
  getrecentTransactionOption() {
    let recommendedCardCarouselOptions = {
      margin: 20,

      autoplay: false,
      autoplayTimeout:3000,
      loop: false,
      rewind: true,
      autoWidth: true,
      dots:false,
      nav: false,
      items: 2



    }
    return recommendedCardCarouselOptions;
  }


  getinvestCarouselOptions() {
    let investCarouselOptions = {
      autoWidth: false,
      loop: false,
      nav: false,
      merge: true,
      dots: true,
      autoplay: false,
      items: 4

    }
    return investCarouselOptions;

  }


  setPayeeConfirmationDetails(details: Object) {
    this.addPayeeConfirmSource.next(details)
  }

  /**
   * This function is invoked to set theme details like theme name, theme bg, theme sidebar
   * @param details
   */
  setThemeDetails(details: Object) {
    this.updateThemeSource.next(details)
  }

  invokeUserNameAutocomplete(username) {
    this.userNameAutocomplete.next(username);
  }

  validateAddressByMobileNo(mobileNo) {
    this.collectReqSource.next(mobileNo);
  }

  setCommonNPCICallback(data) {
    this.upiCommonNPCISource.next(data);
  }

  changeMessage(message: any) {
    this.messageSource.next(message)
  }

  setDetails(details: any) {
    this.commonBehaviorSource.next(details);
  }

  setUPIDetails(details: any) {
    this.upiCommonBehaviorSource.next(details);
  }

  getUpiUserProfileDetails() {
    return this.upiCommonBehaviorSource;
  }

  updateIcons(notificationCount) {
    return this.updateIconBehaviourSource.next(notificationCount);
  }

  invokeBiometricCheck() {
    this.upiBiometricCheckSource.next(true);
  }

  setShowThemeObservable(showThemeMob: boolean) {
    this.showThemeSubject.next(showThemeMob);
  }

  setShowsideNavObservable(showNav: boolean) {
    this.showSideNavSubject.next(showNav);
  }

  setShowNotificationObservable(showNav: boolean) {
    this.showNotificationSubject.next(showNav);
  }


  invokeLogout(msg: string) {
    this.upiLogoutSource.next(msg);
  }

  setIntentCallback(data) {
    this.intentCallbackSource.next(data);
  }

  /**
   * Setting theme using observable
   * @param themeName
   */
  setTheme(themeName: string) {
    this.setThemeSource.next(themeName);
  }

  setOmniChannelReqParam(key, param) {
    this.ominiChannelParam[key] = param;
  }

  getOmniChannelReqParam(key) {
    return this.ominiChannelParam[key];
  }


  verifyOmniVPACallback(payee){
    return this.updateVerifyVPABehaviourSource.next(payee);
  }


  /**
  * @function cancelRegistration
  * description - page to be landed on cancel registration.
  */
  cancelRegistration() {
    if (this.constants.getEntityId() == this.constants.val_Desktop) {
      if (this.constants.getPlatform() == "web") {
        this.router.navigateByUrl('/login');
      }
      else {
        this.router.navigateByUrl('/loginMobile');
      }
    }
    else {
      this.router.navigateByUrl('/LandingPage');
    }
  }

  /**
  * @function getChannelType
  * description - unique function to get channel type
  */
  getChannelType() {
    //only one type of registration
    return this.constants.val_channelValueIB
    // if (window.hasOwnProperty('cordova')) {
    //   if (device.platform == "Android" || device.platform == "iOS") {
    //     return this.channelType
    //   }
    // } else {
    //   return this.constants.val_channelValueIB
    // }
  }

  getCurrentLatLong(countryCodeNeeded?:boolean): Observable<any> {
    var subject = new Subject<any>();
    let myObj = this;
    navigator.geolocation.getCurrentPosition(success, failure, { enableHighAccuracy: true })
    let self = this;
    function success(position) {
      console.log('MY CURRENT position', position);
      self.currentLat = position.coords.latitude;
      self.currentLng = position.coords.longitude;
      myObj.latitude = position.coords.latitude;
      myObj.longitude = position.coords.longitude;
      myObj.isLatLongFetched = true;
      console.log("location lat long " + myObj.latitude + ":::" + myObj.longitude);
      if(countryCodeNeeded){
        myObj.getReverseGeocodingData(myObj.latitude,myObj.longitude,subject,myObj)
      }else{
        subject.next(true);
        subject.complete();
      }
    }

    function failure(error) {
      console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
      subject.next(false);
      subject.complete();
    }

    return subject.asObservable();
  }

   getReverseGeocodingData(lat, lng,subject,myObj) {
    var latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng },  (results, status) =>{
        if (status !== google.maps.GeocoderStatus.OK) {
          subject.next(false);
          subject.complete();
            // alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results);
            var address = (results[0].formatted_address);
            myObj.address = address
            subject.next(true);
            subject.complete();
        }
    });
}

  getUserLocationName(latitude, longitude): Observable<any> {
    var subject = new Subject<any>();
    let myObj = this;
    if (this.isCordovaAvailable) {
      nativegeocoder.reverseGeocode(success, failure, latitude, longitude);

      function success(result) {
        console.log('LOCATION RESULT => ', result);
        if (result[0]) {
          myObj.userLocationName = result[0].subLocality + ", " + result[0].locality + ", " + result[0].countryCode;
        } else {
          myObj.userLocationName = null;
        }
        subject.next(true);
        subject.complete();
      }

      function failure(error) {
        console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        subject.next(false);
        subject.complete();
      }
    } else {
      subject.next(true);
      subject.complete();
    }

    return subject.asObservable();
  }

  routeWithNgZone(routeName) {
    this.ngZone.run(() => {
      this.router.navigate(['/' + routeName]);
    })
  }

  backHandle() {
    this.location.back();
  }

  setPageSettings(title?: string) {
    let pageSettings;
    if (window.innerWidth < 767) {
      console.log("window.innerWidth ======>"+window.innerWidth);
      pageSettings = {
        'headerType': 'backUpiIdHeader',
        'titleName': title,
        'sidebarNAv': false,
        'footer': 'none',
      }
    } else {
      pageSettings = {
        'headerType': 'innerHeader',
        'sidebarNAv': 'OmniNAv',
        'footer': 'innerFooter',
      }
    }
    this.changeMessage(pageSettings);
  }

  setIsOffline(details) {
    this.isOffline.next(details)
  }

  setIsOnline(details) {
    this.isOnline.next(details)
  }

  getAccountListByAccountType(accDetails) {
    let accType = accDetails.accountType;
    var datePipe = new DatePipe("en-US");
    if (accType == 'SAVING' || accType == 'CURRENT' || accType == 'OVER DRAFT') {
      return [
        { 'label': "CUSTOMER_NAME", 'details': accDetails?.accountHolderName, isChecked: false },
        { 'label': "ACCOUNT_TYPE", 'details': accDetails?.accountCategory, isChecked: false },
        { 'label': "ACCOUNT_NUMBER", 'details': accDetails?.accountNumber, isChecked: false },
        { 'label': "CURRENT_RATE_OF_INTEREST", 'details': "-", isChecked: false },
        { 'label': "BRANCH_ADDRESS", 'details': accDetails?.BRANCHADDRESS, isChecked: false },
        { 'label': "IFSC_CODE", 'details': accDetails?.ifsc_code, isChecked: false },
        { 'label': "CUSTOMER_ID", 'details': "-", isChecked: false },
        { 'label': "NOMINEENAME", 'details': "-", isChecked: false },
        { 'label': "REWARDS", 'details': "-", isChecked: false },
        { 'label': "MMID", 'details': "-", isChecked: false },
        { 'label': "VPA", 'details': accDetails.UPI_ADDRESS, isChecked: false }
      ]

    } else if (accType == 'FIXED DEPOSIT') {
      return [
        { 'label': "ACCOUNT_NAME", 'details': accDetails.accountHolderName, isChecked: false },
        { 'label': "ACCOUNT_NICK_NAME", 'details': accDetails.beneficiary_nick_name, isChecked: false },
        { 'label': "ACCOUNT_OPEN_DATE", 'details': datePipe.transform(accDetails.accountOpeningDate), isChecked: false },
        { 'label': "DEPOSIT_START_DATE", 'details': datePipe.transform(accDetails.depositStartDate), isChecked: false },
        { 'label': "DURATION", 'details': accDetails.tenure + " months", isChecked: false },
        { 'label': "DEPOSIT_AMOUNT", 'details': this.customCurrencyPipe.transform(accDetails.depositAmount, 'symbol'), isChecked: false },
        { 'label': "BRANCH_NAME", 'details': accDetails.branch_name, isChecked: false },
        { 'label': "CURRENCY", 'details': accDetails.currency, isChecked: false },
        { 'label': "REPAYMENT_ACC_NO", 'details': accDetails.beneficiaryAccount, isChecked: false },
        { 'label': "AUTO_RENEWAL", 'details': accDetails.autoRenew, isChecked: false },
        { 'label': "AUTO_CLOSER", 'details': accDetails.autoClosure, isChecked: false },
        { 'label': "STATUS", 'details': accDetails.Status == 'Y' ? "Active" : "Inactive", isChecked: false }
      ]
    } else if (accType == 'RECURRING DEPOSIT') {
      return [
        { 'label': "ACCOUNT_NAME", 'details': accDetails.accountHolderName, isChecked: false },
        { 'label': "ACCOUNT_NICK_NAME", 'details': accDetails.beneficiary_nick_name, isChecked: false },
        { 'label': "ACCOUNT_OPEN_DATE", 'details': datePipe.transform(accDetails.accountOpeningDate), isChecked: false },
        { 'label': "DEPOSIT_START_DATE", 'details': datePipe.transform(accDetails.depositStartDate), isChecked: false },
        { 'label': "DEPOSIT_PERIODS_IN_MONTHS", 'details': accDetails.depositePeriodMonths, isChecked: false },
        { 'label': "DEPOSIT_PERIODS_IN_DAYS", 'details': accDetails.depositePeriodDays, isChecked: false },
        { 'label': "DEPOSIT_AMOUNT", 'details': this.customCurrencyPipe.transform(accDetails.depositAmount, 'symbol'), isChecked: false },
        { 'label': "BRANCH_NAME", 'details': accDetails.branch_name, isChecked: false },
        { 'label': "CURRENCY", 'details': accDetails.currency, isChecked: false },
        { 'label': "REPAYMENT_ACC_NO", 'details': accDetails.beneficiaryAccount, isChecked: false },
        { 'label': "AUTO_RENEWAL", 'details': accDetails.autoRenew, isChecked: false },
        { 'label': "AUTO_CLOSER", 'details': accDetails.autoClosure, isChecked: false },
        { 'label': "STATUS", 'details': accDetails.Status == 'Y' ? "Active" : "Inactive", isChecked: false }
      ]
    } else if (accType == 'TERM DEPOSIT') {
      return [
        { 'label': "ACCOUNT_NAME", 'details': accDetails.accountHolderName, isChecked: false },
        { 'label': "ACCOUNT_NICK_NAME", 'details': accDetails.beneficiary_nick_name, isChecked: false },
        { 'label': "ACCOUNT_NUMBER", 'details': accDetails.accountNumber, isChecked: false },
        { 'label': "IFSC_CODE", 'details': accDetails.ifsc_code, isChecked: false },
        { 'label': "ACCOUNT_TYPE", 'details': accDetails.accountCategory, isChecked: false },
        { 'label': "BRANCH_NAME", 'details': accDetails.branch_name, isChecked: false },
        { 'label': "BRANCH_ADDRESS", 'details': accDetails.BRANCHADDRESS, isChecked: false },
        { 'label': "CURRENCY", 'details': accDetails.currency, isChecked: false },
        { 'label': "LINKED_UPI_ADD", 'details': accDetails.UPI_ADDRESS, isChecked: false }
      ]
    } else { }
  }

  // Customet details while regisration
  regUPICustData: any = {
    customerName: "",
    email_id: "",
    dateOfBirth: "",
    gender: "",
    isBIOMETRICEnable: "",
    lastLogin: '',
    isLocalOrApiData: ""  // Check data is from API or Local
  };


  //setting collect request
  upiCollectRequest = {
    date: new Date(),
    time: moment().add(30, 'minutes').toDate(),
    expiryTime: '',
    remarks: '',
    amount: '',
    mobileNo: '',
    validatedVpaAdress: ''
  }

  //setting pay request
  upiPayRequest = {
    date: new Date(),
    time: moment().add(30, 'minutes').toDate(),
    expiryTime: '',
    remarks: '',
    amount: '',
    enTipAmount: '',
    mobileNo: '',
    validatedVpaAdress: '',
    consentFlag: false
  }

  upiPayModelObj = {
    payerAddr: '',
    payeeAddr: '',
    txnAmount: '',
    payeeName: '',
    payeeMobile: '',
    payeeMmid: '',
    payeeAccount: '',
    payeeIfsc: '',
    remark: ''
  }

  //setting collect request
  selfTransferRequest = {
    date: new Date(),
    time: moment().add(30, 'minutes').toDate(),
    expiryTime: '',
    remarks: '',
    amount: '',
    mobileNo: '',
    validatedVpaAdress: ''
  }

  //setting createMandate
  createMandateObj = {
    remarks: '',
    amount: '',
    mobileNo: '',
    validatedVpaAdress: '',
    startDate: new Date(),
    endDate: new Date(),
    frequency: '',
    notifyPayee: false,
    debitDay: 'BEFORE',
    showDebitDay: false
  }

  //setting requestMandate
  requestMandateObj = {
    remarks: '',
    amount: '',
    mobileNo: '',
    validatedVpaAdress: '',
    startDate: new Date(),
    endDate: new Date(),
    frequency: '',
    notifyPayee: false,
    debitDay: 'On',
    showDebitDay: false
  }

  //PSB FORMS

  nomineeDetails = {
    nomineeName: '',
    nomineeRelation: '',
    dob: new Date(),
    address: '',
    guardianName: '',
    guardianType: '',
    commAddLine1: '',
    commAddLine2: '',
    state: '',
    city: '',
    pincode: '',
  }


  //PSB FORMS END




  // Process and Save VPA Addrees List === START
  processVPAlist(apiAddressList) {
    console.log("apiAddressList", apiAddressList);
    this.resetVPAList();
    this.resetUPIAddList();
    this.resetAccount();
    _.forEach(apiAddressList, (e) => {
      console.log(e);
      this.tempUPIAddList.paymentAddress = e.paymentAddress;
      this.tempUPIAddList.default = e.default;
      this.tempUPIAddList.limit = e.limit;
      this.tempUPIAddList.currentLimit = e.currentLimit;
      this.tempUPIAddList.frequency = e.frequency;
      this.tempUPIAddList.vpaQrFlag = e.vpaQrFlag;
      this.tempUPIAddList.vpaSelected = e.default == 'Y' ? true : false;
      _.forEach(e.accounts, (el:any) => {
        if(el.ifsc.includes('PSIB')){
         this.upiAccount.isPSBAccount = true;
        }else{
          this.upiAccount.isPSBAccount = false;
        }
        console.log(el);
        this.upiAccount.mbeba = el.mbeba;
        this.upiAccount.isDefaultAccount = el.isDefaultAccount;
        this.upiAccount.credDLength = el.credDLength;
        this.upiAccount.bankName = el.bankName;
        this.upiAccount.mcc = el.mcc;
        this.upiAccount.credDType = el.credDType;
        this.upiAccount.atmDType = el.atmDType;
        this.upiAccount.lastBalanceUpdate = el.lastBalanceUpdate;
        this.upiAccount.credSubType = el.credSubType;
        this.upiAccount.atmCredSubType = el.atmCredSubType;
        this.upiAccount.ifsc = el.ifsc;
        this.upiAccount.accTypeActual = el.accType;
        this.upiAccount.accType = el.accType == 'SOD' || el.accType == 'UOD' ? 'Overdraft' : this.injector.get(TitleCasePipe).transform(el.accType);
        this.upiAccount.otpCredSubType = el.otpCredSubType;
        this.upiAccount.atmDLength = el.atmDLength;
        this.upiAccount.accNum = el.accNum;
        this.upiAccount.addressType = el.addressType;
        this.upiAccount.isValid = el.isValid;
        this.upiAccount.atmCredType = el.atmCredType;
        this.upiAccount.active = el.active;
        this.upiAccount.otpCredType = el.otpCredType;
        this.upiAccount.defaultAccount = el.defaultAccount;
        this.upiAccount.custName = el.custName;
        this.upiAccount.balanceAmount = el.balanceAmount;
        this.upiAccount.otpCredDLength = el.otpCredDLength;
        this.upiAccount.credType = el.credType;
        this.upiAccount.maskedAccountNumber = el.maskedAccountNumber;
        this.upiAccount.otpCredDType = el.otpCredDType;
        this.upiAccount.showBalance = false;
        this.upiAccount.maskedBalance = this.commonMethod.maskBalance(el.balanceAmount);
        this.upiAccount.isUpiGlobalActive = el.isUpiGlobalActive;
        this.upiAccount.debitFreezeStatus = el.debitFreezeStatus;
        this.upiAccount.currentLimit = el.currentLimit;
        this.upiAccount.accountLinkedTime = el.accountLinkedTime;
        this.tempUPIAddList.accounts.push(this.upiAccount);
        this.resetAccount();
      });
      console.log('this.tempUPIAddList', this.tempUPIAddList);
      this.vpaAddressList.push(this.tempUPIAddList);
      this.resetUPIAddList();
    });
    //Added for Migrated Users to get default Account & VPA
    let filteredVpaList, tempAccountList, filteredAccountList;

    filteredVpaList = this.vpaAddressList.filter((item) => {
      return item.default == 'Y';
    });

    if (filteredVpaList.length == 0) {
      this.vpaAddressList[0].default = 'Y';
      this.vpaAddressList[0].vpaSelected = true;
    }

    for (let i = 0; i < this.vpaAddressList.length; i++) {
      tempAccountList = [];
      for (let j = 0; j < this.vpaAddressList[i].accounts.length; j++) {
        tempAccountList = this.vpaAddressList[i].accounts;
      }
      filteredAccountList = tempAccountList.filter((item) => {
        return item.isDefaultAccount == 'Y';
      });
      if (filteredAccountList.length == 0) {
        this.vpaAddressList[i].accounts[0].isDefaultAccount = 'Y';
        this.vpaAddressList[i].accounts[0].defaultAccount = "true";
      }
    }

    console.log("this.vpaAddressList", this.vpaAddressList);
    return this.vpaAddressList;
  }

  resetVPAList() {
    this.vpaAddressList = [];
  }

  resetAccount() {
    this.upiAccount = {
      "mbeba": null,
      "isDefaultAccount": "",
      "credDLength": "",
      "bankName": null,
      "mcc": "",
      "credDType": "",
      "atmDType": "",
      "lastBalanceUpdate": "",
      "credSubType": "",
      "atmCredSubType": "",
      "ifsc": "",
      "accType": "",
      "otpCredSubType": "",
      "atmDLength": "",
      "accNum": "",
      "addressType": "",
      "isValid": "",
      "atmCredType": "",
      "active": "",
      "otpCredType": "",
      "defaultAccount": "",
      "custName": "",
      "balanceAmount": "",
      "otpCredDLength": "",
      "credType": "",
      "otpCredDType": "",
      "maskedAccountNumber": "",
      "showBalance": false,
      "maskedBalance": "",
      "isUpiGlobalActive": "",
      "debitFreezeStatus": "",
      "isBalanceUpdated": false,
      "currentLimit": 0,
      "accTypeActual": "",
      "accountLinkedTime": "",
      "isPSBAccount":false
    };
  }

  resetUPIAddList() {
    this.tempUPIAddList = {
      "paymentAddress": "", // "psp12@psb",
      "default": "", // "N",
      "limit": "", // "40000",
      "currentLimit": "",
      "accounts": [],
      "frequency": null,
      "vpaQrFlag": "",
      "vpaSelected": false
    };
  }

  // Process Save VPA List END ==================


  //  Procees and Save Transaction List

  processTransactionlist(apiTransactionList) {
    console.log("apiTransactionList", apiTransactionList);
    this.resetTransactionList();
    this.resetUPITransaction();

    _.forEach(apiTransactionList, (e) => {
      console.log(e);
      this.tempUPITransaction.TOACCOUNT = e.TOACCOUNT;
      this.tempUPITransaction.REMITTERMOBILE = e.REMITTERMOBILE;
      this.tempUPITransaction.ERRORMSG = e.ERRORMSG;
      this.tempUPITransaction.FROMACCOUNT = e.FROMACCOUNT;
      this.tempUPITransaction.BANKNAME = e.BANKNAME;
      this.tempUPITransaction.REMARKS = e.REMARKS;
      this.tempUPITransaction.TXNID = e.TXNID;
      this.tempUPITransaction.RRN = e.RRN;
      this.tempUPITransaction.PAYEEIFSC = e.PAYEEIFSC;
      this.tempUPITransaction.DATETIME = e.DATETIME;
      this.tempUPITransaction.BENMOBILE = e.BENMOBILE;
      this.tempUPITransaction.AMOUNT = e.AMOUNT;
      this.tempUPITransaction.TRNSTATUS = e.TRNSTATUS;
      this.tempUPITransaction.PROCESSINGCODE = e.PROCESSINGCODE;
      this.tempUPITransaction.ERROR = e.ERROR;
      this.tempUPITransaction.PAYEEADDR = e.PAYEEADDR;
      this.tempUPITransaction.PAYERADDR = e.PAYERADDR;
      this.tempUPITransaction.TYPE = e.TYPE;
      this.tempUPITransaction.REMITTERNAME = e.REMITTERNAME;
      this.tempUPITransaction.MASKEDFROMACCOUNT = e.MASKEDFROMACCOUNT;
      this.tempUPITransaction.MASKED_TO_ACCOUNT = e.MASKED_TO_ACCOUNT;
      this.tempUPITransaction.BENNAME = e.BENNAME;
      this.tempUPITransaction.PAY_MODE = e.PAY_MODE;
      this.upiTransactionList.push(this.tempUPITransaction);
    });
    this.resetUPITransaction();
    console.log("UPI Transaction List", this.upiTransactionList);

    return this.upiTransactionList;
  }

  resetTransactionList() {
    this.upiTransactionList = [];
  }

  resetUPITransaction() {
    this.tempUPITransaction = {
      "TOACCOUNT": "",
      "REMITTERMOBILE": null,
      "ERRORMSG": "",
      "FROMACCOUNT": null,
      "BANKNAME": "",
      "REMARKS": "",
      "TXNID": "",
      "RRN": "",
      "PAYEEIFSC": "",
      "DATETIME": "",
      "BENMOBILE": "",
      "AMOUNT": "",
      "TRNSTATUS": "",
      "PROCESSINGCODE": "",
      "ERROR": "",
      "PAYEEADDR": "",
      "PAYERADDR": "",
      "TYPE": "",
      "REMITTERNAME": "",
      "MASKEDFROMACCOUNT": "",
      "MASKED_TO_ACCOUNT": "",
      "BENNAME": "",
      "PAY_MODE": "",
    };
  }

  selectedUPITranForFurtherProcess(tran: UPITransaction) {
    this.upiTransactionSelected = tran;
  }

  getUPITransactionSelected() {
    return this.upiTransactionSelected;
  }

  resetUpiCollectData() {
    this.fromRecentTransaction = false;
    this.upiCollectVpaList = [];
    this.ScanQrCodeData = {};
    this.upiCollectRequest = {
      date: new Date(),
      time: moment().add(30, 'minutes').toDate(),
      expiryTime: '',
      remarks: '',
      amount: '',
      mobileNo: '',
      validatedVpaAdress: ''
    }
  }

  resetCreateMandateData() {
    this.upiMandateVpaList = [];
    this.ScanQrCodeData = {};
    this.createMandateObj = {
      remarks: '',
      amount: '',
      mobileNo: '',
      validatedVpaAdress: '',
      startDate: new Date(),
      endDate: new Date(),
      frequency: '',
      notifyPayee: false,
      debitDay: 'On',
      showDebitDay: false
    }
  }

  resetRequestMandateData() {
    this.upiMandateVpaList = [];
    this.requestMandateObj = {
      remarks: '',
      amount: '',
      mobileNo: '',
      validatedVpaAdress: '',
      startDate: new Date(),
      endDate: new Date(),
      frequency: '',
      notifyPayee: false,
      debitDay: 'On',
      showDebitDay: false
    }
  }

  resetUpiPayData() {
    // this.fromRecentTransaction = false;
    this.upiPayVpaList = [];
    this.ScanQrCodeData = {};
    this.upiPayRequest = {
      date: new Date(),
      time: moment().add(30, 'minutes').toDate(),
      expiryTime: '',
      remarks: '',
      amount: '',
      enTipAmount: '',
      mobileNo: '',
      validatedVpaAdress: '',
      consentFlag: false
    }
  }

  resetUpiPayModelData() {
    // this.fromRecentTransaction = false;
    // this.upiPayVpaList = [];
    this.upiPayModelObj = {
      payerAddr: '',
      payeeAddr: '',
      txnAmount: '',
      payeeName: '',
      payeeMobile: '',
      payeeMmid: '',
      payeeAccount: '',
      payeeIfsc: '',
      remark: ''
    }
  }

  resetSelfTransReceiptObjData() {
    this.selfTransReceiptObj = {};
  }

  //Device Change scenario handling => clear all data for user on previous device
  clearAppInfo() {
    this.userDetails = null;
    this.latitude = null;
    this.longitude = null;
    this.ipAddress = null;
    this.selectedSim = null;
    this.simBindingSuccess = false;
    this.uuid = null;
    this.imei = null;
    this.macAddress = null;
    this.platform = null;
    this.devicemodel = null;
    this.osversion = null;
    this.resetVPAList();
    this.resetTransactionList();
    this.resetUpiCollectData();
    this.resetUpiPayData();
    this.storage.clearSessionStorage();
    this.storage.removeFromLocalStorage('NpciToken');
    this.storage.removeFromLocalStorage('NpciTokenExpiry');
    this.storage.removeFromLocalStorage('isUpiRegistrationSuccess');
    // this.storage.clearLocalStorage();
    this.ScanQrCodeData = {};
  }

  clearAppInfoIos() {
    this.userDetails = null;
    this.userProfile = null;
    this.userRegStaus = null;
    this.userUpiRegStaus = null;
    Object.keys(this.regUPICustData).forEach((i) => this.regUPICustData[i] = null);
    //this.latitude = null;
    //this.longitude = null;
    //this.ipAddress = null;
    this.selectedSim = null;
    this.simBindingSuccess = false;
    //this.uuid = null;
    //this.imei = null;
    //this.macAddress = null;
    //this.platform = null;
    //this.devicemodel = null;
    //this.osversion = null;
    this.resetVPAList();
    this.resetTransactionList();
    this.resetUpiCollectData();
    this.resetUpiPayData();
    this.storage.clearSessionStorage();

    //ios clear storage
    var languageVersion = this.storage.getLocalStorage(this.constants.storage_languageVersion);
    var languageList = this.storage.getLocalStorage(this.constants.storage_languageList);
    this.storage.clearLocalStorage();
    this.storage.setLocalStorage(this.constants.storage_languageVersion, languageVersion)
    this.storage.setLocalStorage(this.constants.storage_languageList, languageList)
    this.ScanQrCodeData = {};
  }

  //UPI MW Device Object
  getDeviceObjectForUpi() {
    // this.getCurrentLatLong().subscribe((data) => {
    //   console.log('GeoLocation Plugin => getCurrentLatLong Success => ', data);
    //   console.log(this.latitude);
    //   console.log(this.longitude);

    //   this.getUserLocationName(this.latitude, this.longitude).subscribe((data) => {
    //     console.log('data', data);
    //     console.log("dataservice.userLocationName => ", this.userLocationName);
    //     this.userLocationName = this.userLocationName;
    //   }, (err) => {
    //     console.log('err', err);
    //   });
    // }, err => {
    //   console.log('GeoLocation Plugin => getCurrentLatLong Error => ', err);
    // });

    let deviceDetails = {
      [this.constants.key_upi_app]: this.constants.val_app_pakage_name,
      [this.constants.key_upi_capability]: this.constants.val_upi_capability,
      [this.constants.key_upi_os]: this.platform,
      [this.constants.key_upi_lat]: this.latitude,
      [this.constants.key_upi_lng]: this.longitude,
      [this.constants.key_upi_ip]: this.ipAddress,
      [this.constants.key_upi_location]: this.userLocationName ? this.userLocationName : '-',
      [this.constants.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constants.storage_mobileNo)),
      [this.constants.key_upi_deviceID]: this.isCordovaAvailable ? device.uuid : '9ae1b904o63573d0' // condition added just for testing this will not impact any issue for android/ios build
    };
    return deviceDetails;
  }


  //NPCI Controller Service declarations defined here to avoid circular dependency

  npciFinalCredResponseModel: any;

  isEmpty(val) {
    switch (val) {
      case "":
      case null:
      case false:
      case typeof (val) == "undefined":
        return true;
      default:
        return false;
    }
  }

  roundOffAmount(amount) {
    if (this.isEmpty(amount) || amount === undefined) {
      return "";
    }
    try {
      let finalAmount = amount.replace("₹", "");
      finalAmount = finalAmount.replace(" ", "");
      return parseFloat(finalAmount).toFixed(2);
    } catch (error) {
      console.log('roundOffAmount error = ', error)
      return amount;
    }
  }

  /**
   * get selected language for upi
   */
  getSelectedLanguageCodeUPI() {
    return this.storage.hasKeyLocalStorage(this.constants.storage_language) ? this.storage.getLocalStorage(this.constants.storage_language) == 'en' ? this.constants.val_default_lang_UPI : this.storage.getLocalStorage(this.constants.storage_language) : this.constants.val_default_lang_UPI
  }

  /**
  * Get Selected Vpa Adress/Account Details
  */
  getSelectedVpaAccountDetails(vpaList) {
    let defaultVpaAccountArr = vpaList.find((vpaAddress) => { return vpaAddress.isSelected == true });
    if (defaultVpaAccountArr) {
      let accountDetails = this.getSelectedAccountNoByVpa(defaultVpaAccountArr.accounts);
      return {
        vpaDetails: defaultVpaAccountArr,
        accountDetails: accountDetails
      }
    }
  }

  /**
   * Get Selected Vpa AccountNo Details
   * @param array
   */
  getSelectedAccountNoByVpa(array) {
    if (array.length > 0) {
      return array.find((account) => { return account.isSelected == true });
    }
  }

  checkIfUPIIdExists(upiAddress) {
    return this.vpaAddressList.some(vpaDetails => vpaDetails.paymentAddress === upiAddress);
  }

  isFavoritePayee(payeeName) {
    return this.favPayeeList.some(payee => payee.beneVpa === payeeName);
  }

  getMandateInciatedBy(mandateDetails: Mandate) {

    // var userType = ""
    // if(this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constants.storage_mobileNo)) == mandateDetails.mobileNo ){
    //   userType = mandateDetails.initiatedBy;
    // }
    // else{
    //   userType =  mandateDetails.initiatedBy == "PAYEE" ? "PAYER" : "PAYEE";
    // }
    // return mandateDetails.createdBy == 'CREATED_BY_OTHERS' && mandateDetails.initiatedBy == 'PAYER' ? 'PAYEE' :
    // mandateDetails.createdBy == 'CREATED_BY_OTHERS' && mandateDetails.initiatedBy == 'PAYEE' ? 'PAYER':
    // mandateDetails.createdBy == 'CREATED_BY_ME' && mandateDetails.initiatedBy == 'PAYER' ? 'PAYER':
    // mandateDetails.createdBy == 'CREATED_BY_ME' && mandateDetails.initiatedBy == 'PAYEE' ? 'PAYEE' :
    // '';
    if (mandateDetails.initiatedBy == 'PAYER') {
      if (mandateDetails.createdBy == 'CREATED_BY_ME') {
        return 'PAYER';
      } else {
        return 'PAYEE';
      }
    } else if (mandateDetails.initiatedBy == 'PAYEE') {
      if (mandateDetails.createdBy == 'CREATED_BY_ME') {
        return 'PAYEE';
      } else {
        return 'PAYER';
      }
    }

    // return userType;
  }


  getContactListColour(contactListData) {
    let tempList = contactListData
    let counter = 1;
    for (let i = 0; i < tempList.length; i++) {
      if (counter == 1) {
        tempList[i]["color"] = "green1";
        counter++;
      } else
        if (counter == 2) {
          tempList[i]["color"] = "blue";
          counter++;

        } else
          if (counter == 3) {
            tempList[i]["color"] = "red";
            counter++;

          } else
            if (counter == 4) {
              tempList[i]["color"] = "yellow";
              counter = 1;
            }

    }
    contactListData = tempList;
    return contactListData;
  }

  getRecentTransactionList(recentTransaction) {
    let tempList = recentTransaction
    let counter = 1;
    for (let i = 0; i < tempList.length; i++) {
      if (counter == 1) {
        tempList[i]["color"] = "green1";
        counter++;
      } else
        if (counter == 2) {
          tempList[i]["color"] = "grey1";
          counter++;

        } else
          if (counter == 3) {
            tempList[i]["color"] = "red1";
            counter++;

          } else
            if (counter == 4) {
              tempList[i]["color"] = "greenlight";
              counter++;
            }else
            if (counter == 5) {
              tempList[i]["color"] = "yellow";
              counter = 1;
            }

    }
    recentTransaction = tempList;
    return recentTransaction;
  }


  profileName:any;



  // setTimeOutCounter(inputTime){
  //   var m = Math.floor(inputTime / 60);
  //   var s = inputTime % 60;

  //   m = m < 10 ? '0' + m : m;
  //   s = s < 10 ? '0' + s : s;
  //   document.getElementById('timer').innerHTML = m + ':' + s;
  //   inputTime -= 1;

  //   if(inputTime >= 0 && timerOn) {
  //     setTimeout(function() {
  //         timer(inputTime);
  //     }, 1000);
  //     return;
  //   }

  //   if(!timerOn) {
  //     // Do validate stuff here
  //     return;
  //   }

  //   // Do timeout stuff here
  // }

  //omni account open param
  accountOpenFldData: any = {
    FirstName: '',
    LastName: '',
    middlename:'',
    MobileNoOrg: '',
    emailId: '',
    dob:'',
    panNumber: '',
    aadharNumber: '',
    gender: '',
    permanentAddrL1: '',
    permanentAddrL2: '',
    permanentAddrState: '',
    permanentAddrCity: '',
    permanentAddrPin: '',
    nationality: '',
    maritalStatus: '',
    community: '',
    category: '',
    fatherName: '',
    motherName: '',
    communicationAddrL1: '',
    communicationAddrL2: '',
    communicationAddrCity: '',
    communicationAddrState: '',
    communicationAddrPin: '',
    occupation: '',
    isCommunAdrSameAsPermanent: false,
    aadharLinkDBT1: false,
    aadharLinkDBT2: false,
    annualIncome: '',
    branchPinCode: '',
    branchState: '',
    branchCity: '',
    branchCode: '',
    branchSearchType: '',
    donNotWantNominee: false,
    isNomineeAddSameAsPermanent: false,
    nomineeName: '',
    nomineeAddrL1: '',
    nomineeAddrL2: '',
    nomineeAddrCity: '',
    nomineeAddrState: '',
    nomineeAddrPin: '',
    nomineeDOB: '',
    nomineeRelationship: '',
    guardianAddrL1: '',
    guardianAddrL2: '',
    guardianAddrCity: '',
    guardianAddrState: '',
    guardianAddrPin: '',
    guardian: '',
    guardianType: '',
    UPI_ADDRESS: '',
    ACCOUNTTYPE: '',
    lastDraftPage: '',
    dateOfBirth: '',
    accountNumber: '',
    cif: '',
    amountPaid: '',
    videoKYCFlag: '',
    isFatcaDeclaration: false,
    smsEmailPermission: false,
    accountType: '',
    bankTearmCondition: false,
    addharLinkDBT1: false,
    addharLinkDBT2: false,
    nomineeNotMinor: false
  }


  onRefreshDate : Date;

  fetchTotalBalance(records , screen){

    this.customerMyDepostie = [];
    this.customerBorrowingsList = [];
    this.customerOperativeAccList = [];

    this.totalMyDepositBalance = 0;
    this.totalMyBorrowingsBalance = 0;
    this.totalMyOperativeBalance = 0;

    records.forEach(el => {
      if(el.schemeDescription == 'My Deposits' ){
        this.customerMyDepostie.push(el);
        this.totalMyDepositBalance = this.totalMyDepositBalance + parseFloat(el.acctBalance);
      }
      else if( el.schemeDescription == 'Operative Accounts' ){
        this.customerOperativeAccList.push(el);
        this.totalMyOperativeBalance = this.totalMyOperativeBalance + parseFloat(el.acctBalance);
      }
      else if( el.schemeDescription == 'My Borrowings' ){
        this.customerBorrowingsList.push(el);
        this.totalMyBorrowingsBalance = this.totalMyBorrowingsBalance + parseFloat(el.acctBalance);
      }
    });

    if(screen != "dashboard"){
      let _totalWorth :any = this.totalMyOperativeBalance + this.totalMyDepositBalance + this.totalMyBorrowingsBalance;
      var totalBal = this.totalMyOperativeBalance + this.totalMyDepositBalance;
      if(totalBal > (-this.totalMyBorrowingsBalance)){
        return this.customCurrencyPipe.transform(_totalWorth.toString().trim(), 'decimal');
      }else{
        return " -" + this.customCurrencyPipe.transform(_totalWorth.toString().trim(), 'decimal');
      }
    }else{
      return
    }

  }

  getAppShareLink(){
    if (this.storage.hasKeyLocalStorage(this.constants.storage_language)) {
      var lang = this.storage.getLocalStorage(this.constants.storage_language);
      if (this.storage.hasKeyLocalStorage(this.constants.storage_languageJson)) {
        return this.getLink(lang);
      }
    } else {
      var lang = this.storage.getLocalStorage(this.constants.storage_language);
      if (this.storage.hasKeyLocalStorage(this.constants.storage_languageJson)) {
       return this.getLink('en');
      }
    }
  }

  getLink(lang){
    var playStoreLink,appStoreLink;
    var langJSON = this.storage.getLocalStorage(this.constants.storage_languageJson);
    playStoreLink = JSON.parse(langJSON)[lang]?.PLAY_STORE_LINK ? JSON.parse(langJSON)[lang].PLAY_STORE_LINK  : this.constants.playStoreLink;
    appStoreLink = JSON.parse(langJSON)[lang]?.APP_STORE_LINK ? JSON.parse(langJSON)[lang].APP_STORE_LINK : this.constants.appStoreLink;
    return `${this.constants.linkMSG}
     For Android use - ${playStoreLink}
     For iOS use - ${appStoreLink}`
  }

  addPreLoginFooterCss () {
    this.ngZone.run(() => {
      if(this.bezellessIphone) {
        $("#mainDiv").addClass("pre-login");
      }
    });
  }

  removePreLoginFooterCss() {
    this.ngZone.run(() => {
      if(this.bezellessIphone) {
        $("#mainDiv").removeClass("pre-login");
      }
    });
  }

  resetTransactionObj(){
    for(var prop in this.transactionReceiptObj) {
      if(this.transactionReceiptObj.hasOwnProperty(prop)) {
        this.transactionReceiptObj[prop] = '';
      }
    }
  }


  clearVariable(){
    this.customerMyDepostie = [];
    this.customerOperativeAccList = [];
    this.customerBorrowingsList = [];

    this.totalMyDepositBalance = 0;
    this.totalMyOperativeBalance = 0;
    this.totalMyBorrowingsBalance = 0;

    //this.localStorage.setLocalStorage(this.constant.storage_mobileNo,mobileNo)
  }

  cardDetailsNOffer = [
    {
      cbsCode : "MILLE",
      cbsVarient : "MILCL",
      bin: "607111",
      cardType: "RuPay Miller/Arthia (Domestic)",
      features: ["No Issuing Charges","Personalized Card Available","Spending Limit: ATM -25000 POS+ECOM -1 lakh","Daily Transation Limit  ATM : 3 POS : 10","Discount as offered by NPCI Time to time"],
      offerUrl: "https://www.rupay.co.in/rupay-offers",
      cardImg: "assets/images/svg/sampleCard/607111.svg"
    },
    {
      cbsCode : "RUPUN",
      cbsVarient : "ARTCL",
      bin: "607111",
      cardType: "RuPay Miller/Arthia (Domestic)",
      features: ["No Issuing Charges","Personalized Card Available","Spending Limit: ATM -25000 POS+ECOM -1 lakh","Daily Transation Limit  ATM : 3 POS : 10","Discount as offered by NPCI Time to time"],
      offerUrl: "https://www.rupay.co.in/rupay-offers",
      cardImg: "assets/images/svg/sampleCard/607111.svg"
    },
    {
      cbsCode : "KCCDC",
      cbsVarient : "KISCL",
      bin: "607013",
      cardType: "RuPay Kisan (Domestic)",
      features: ["No Issuing Charges","Personalized Card Available","Spending Limit: ATM -25000 POS+ECOM -1 lakh","Daily Transation Limit  ATM : 3 POS : 10","Discount as offered by NPCI Time to time"],
      offerUrl: "https://www.rupay.co.in/rupay-offers",
      cardImg: "assets/images/svg/sampleCard/607013.svg"
    },
    {
      cbsCode : "PMJDY",
      cbsVarient : "DEPCL",
      bin: "607078",
      cardType: "RuPay PMJDY (Domestic)",
      features: ["No Issuing Charges","Personalized Card Available","Spending Limit: ATM -25000 POS+ECOM -1 lakh","Daily Transation Limit  ATM : 3 POS : 10","Personal Accidental Insurance worth Rs. 1 Lakh/2lakhs*","Discount as offered by NPCI Time to time"],
      offerUrl: "https://www.rupay.co.in/our-cards/rupay-debit/government-scheme/rupay-pmjdy-card",
      cardImg: "assets/images/svg/sampleCard/607078.svg"
    },
    {
      cbsCode : "MUDRA",
      cbsVarient : "MUDCL",
      bin: "608162",
      cardType: "RuPay  Mudra (Domestic)",
      features: ["No Issuing Charges","Personalized Card Available","Spending Limit: ATM -25000 POS+ECOM -1 lakh","Daily Transation Limit  ATM : 3 POS : 10","Discount as offered by NPCI Time to time"],
      offerUrl: "RuPay  Mudra (Domestic)",
      cardImg: "assets/images/svg/sampleCard/608162.svg"
    },
    {
      cbsCode : "RUPAY",
      cbsVarient : "DEFCL",
      bin: "652185",
      cardType: "RuPay Classic International",
      features: ["No Issuing Charges","Personalized & Non Personalized Card","Spending Limit: ATM -25000 POS+ECOM -1 lakh","Daily Transation Limit  ATM : 3 POS : 10","Discount as offered by NPCI Time to time"],
      offerUrl: "https://www.rupay.co.in/rupay-international-offers",
      cardImg: "assets/images/svg/sampleCard/652185.svg"
    },
    {
      cbsCode : "RUPDO",
      cbsVarient : "RDECL",
      bin: "508552",
      cardType: "RuPay Domestic",
      features: ["No Issuing Charges","Personalized & Non Personalized Card","Spending Limit: ATM -25000 POS+ECOM -1 lakh","Daily Transation Limit  ATM : 3 POS : 10","Discount as offered by NPCI Time to time"],
      offerUrl: "https://www.rupay.co.in/rupay-offers",
      cardImg: "assets/images/svg/sampleCard/508552.svg"
    },
    {
      cbsCode : "RUPPL",
      cbsVarient : "RDPCL",
      bin: "652167",
      cardType: "RuPay Platinum International",
      features: ["Personalized Card","Spending Limit: ATM -40000 POS+ECOM -1.5 lakh","Daily Transation Limit  ATM : 10 POS : 15","Personal Accidental Insurance worth Rs. 2lakhs","Discount as offered by NPCI Time to time","20% discount upto Rs. 100 on every Friday on Amazon and Swiggy.","300+ Merchant offers and benefits","24*7 Concierge Services, Lounge Complimentary Access"],
      offerUrl: "https://www.rupay.co.in/our-cards/rupay-debit/rupay-platinum",
      cardImg: "assets/images/svg/sampleCard/652167.svg"
    },
    {
      cbsCode : "RUPOD",
      cbsVarient : "RODCL",
      bin: "817387",
      cardType: "RuPay Overdraft Card",
      features: ["No Issuing Charges", "Personalized Card Available" , "Spending Limit: ATM -25000 POS+ECOM -1 lakh" , "Daily Transation Limit  ATM : 3 POS : 10" , "Discount as offered by NPCI Time to time" ],
      offerUrl: "https://www.rupay.co.in/rupay-offers",
      cardImg: "assets/images/svg/sampleCard/817387.svg"
    }
  ]


}
