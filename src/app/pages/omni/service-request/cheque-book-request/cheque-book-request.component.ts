import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { pageLoaderService } from '../../../../services/pageloader.service';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { FormValidationService } from '../../../../services/form-validation.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { ChequeBookReqService } from '../cheque-book-request/cheque-book-request-service';
import { AppConstants } from 'src/app/app.constant';
import { Location } from '@angular/common'
import { CommonMethods } from 'src/app/utilities/common-methods';
declare var showToastMessage: any;

@Component({
  selector: 'app-cheque-book-request',
  templateUrl: './cheque-book-request.component.html',
  styleUrls: ['./cheque-book-request.component.scss']
})
export class ChequeBookRequestComponent implements OnInit {
  accountList = [];
  cityList = [];
  stateList = [];
  accNo: string = "";
  noOfLeave = [];
  addressType : any ;
  SchemeCode:any;
  selectedAccount:any;
  selectedAccName:any;
  selAccNo:any;

  selectedState: any;
  commonPageComponent = {
    'headerType': 'innerHeader',
    'sidebarNAv': 'OmniNAv',
    'footer': 'innerFooter',
    'currentpageRoute': this.router.url
  }
  constructor(
    private form: FormBuilder,
    private router: Router,
    public DataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    private commonMethod:CommonMethods,
    private formValidation: FormValidationService,
    private localStorage: LocalStorageService,
    private chequeBookReqService: ChequeBookReqService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private location: Location
  ) { }
  CommunicationAdd: FormGroup;
  AlternateAdd: FormGroup;
  commonForm: FormGroup;
  address :any;
  isCheckbox = false;
  platform:any;

  addresstype: any;
  public formErrorsCommunicationAdd = {
    // accountNo:'',
    addressLine1: '',
    city: '',
    state: '',
    pinCode: '',
    confirmation: ''
  };
  public formErrorsAlternateAdd = {
    // accountNo:'',
    addressLocation: '',
    addressLine1: '',
    city: '',
    state: '',
    pinCode: '',
    iAgree: ''
  };

  public formErrorsCommon = {
    savingAcc: '',
    checkPageNo: ''
  };

  ngOnInit(): void {
    this.platform = this.constant.getPlatform();
    this.initialize();
  }

  /**
   * Initialization
   */
  initialize() {
    this.buildForm();
    this.getState();
    // this.getCitiesListByStateId(10016)
    this.DataService.setPageSettings('CHEQUE_BOOK_REQUEST');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('CHEQUE_BOOK_REQUEST' , this.router.url);
    var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile'
    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    this.accountList = this.DataService.customerOperativeAccList;
    this.accountList = this.accountList.filter( (obj) =>(obj.accountType!='CAPPI' && obj.Status.toLowerCase()=='active'));
    var fromIndex = this.accountList.findIndex(e => e.accountFlag == 'P');
    var element = this.accountList[fromIndex];
    this.accountList.splice(fromIndex, 1);
    this.accountList.splice(0, 0, element);

    // this.stateList = this.DataService.stateList;
    // console.log("Statelist::::", this.DataService.stateList);
    // this.cityList = this.DataService.cityList;
    // console.log("cityList::::", this.DataService.cityList);
    this.DataService.otpSessionPreviousPage = '/chequeBookRequest';
  }

  buildForm() {
    this.CommunicationAdd = new FormGroup({
      // accountNo :new FormControl('', [Validators.required,]),
      addressLine1: new FormControl('', [Validators.required,]),
      addressLine2: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      confirmation: new FormControl('', [Validators.required]),
      accountNo: new FormControl('')
    });


    this.CommunicationAdd.valueChanges.subscribe((data) => {
      this.formErrorsCommunicationAdd = this.formValidation.validateForm(this.CommunicationAdd, this.formErrorsCommunicationAdd, true);
    });

    this.AlternateAdd = new FormGroup({
      // accountNo :new FormControl('', [Validators.required,]),
      addressLocation: new FormControl('', [Validators.required,]),
      addressLine1: new FormControl('', [Validators.required,]),
      addressLine2: new FormControl(''),
      addressLine3: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      iAgree: new FormControl('', [Validators.required]),
    });

    this.AlternateAdd.valueChanges.subscribe((data) => {
      this.formErrorsAlternateAdd = this.formValidation.validateForm(this.AlternateAdd, this.formErrorsAlternateAdd, true);
    });

    this.commonForm = new FormGroup({
      savingAcc: new FormControl('', [Validators.required]),
      checkPageNo: new FormControl('', [Validators.required]),
      commAddress: new FormControl('', [Validators.required]),
      accountNo: new FormControl(''),
      // disptach: new FormControl('', [Validators.required]),
    });

    this.commonForm.valueChanges.subscribe((data) => {
      this.formErrorsCommon = this.formValidation.validateForm(this.commonForm, this.formErrorsCommon, true);
    });

  }
  /**
   *  form validation
   * @param type
   */
  validatesForm(type) {
    if (type == 'communication') {
      if (this.CommunicationAdd.invalid) {
        this.formValidation.markFormGroupTouched(this.CommunicationAdd);
        return;
      }
    } else if (type == 'alternate') {
      if (this.AlternateAdd.invalid) {
        this.formValidation.markFormGroupTouched(this.AlternateAdd);
        return;
      }
    } else {
      if (this.commonForm.invalid) {
        this.formValidation.markFormGroupTouched(this.commonForm);
        return;
      }
    }
  }

  openchargespopup(){
    this.commonMethod.openPopup('div.popup-bottom.chargesPopup');
  }
  closePoup(){
    this.commonMethod.closePopup('div.popup-bottom');
  }
  /**
   *Submit function  when communication address
   */
  CommunicationSubmit() {
    this.validatesForm('communication');
    console.log('Communication Submit', this.CommunicationAdd.value);

    if (this.CommunicationAdd.valid) {
      if (this.CommunicationAdd.get('confirmation').value == 'Yes') {
        this.issueChequeBook('C');
      } else {
        // showToastMessage("Please select correct address");
      }
    } else {
      this.formErrorsCommunicationAdd = this.formValidation.validateForm(this.CommunicationAdd, this.formErrorsCommunicationAdd, true);
    }
  }


  commonFormSubmit() {
    this.validatesForm('')
    if (this.commonForm.valid) {

      if(!this.isCheckbox){
        return
      }

      this.issueChequeBook()
    }
    else{
      this.formErrorsCommon = this.formValidation.validateForm(this.commonForm, this.formErrorsCommon, true);
    }
  }


  /**
   * Issue cheque api call based on the type this function is called
   * @param type
   */
  issueChequeBook(type?:any) {
    let reqParam, accNo;
    let custId = this.DataService.userDetails.cifNumber;
    // if (type == 'C') {

    //   console.log(this.CommunicationAdd.value);
    //   let addressLine1 = this.CommunicationAdd.get('addressLine1').value ? this.CommunicationAdd.get('addressLine1').value + " ," : "";
    //   let addressLine2 = this.CommunicationAdd.get('addressLine2').value ? this.CommunicationAdd.get('addressLine2').value + " ," : "";
    //   address = this.addresstype + ", " + addressLine1 + addressLine2 + this.CommunicationAdd.get('city').value + " ," + this.selectedState.state + " ," + this.CommunicationAdd.get('pinCode').value;
    //   accNo = $("#savingAccSel").val();

    // } else {
    //   console.log(this.AlternateAdd.value)
    //   let addressLocation = this.AlternateAdd.get('addressLocation').value ? this.AlternateAdd.get('addressLocation').value + ' ,' : "";
    //   let addressLine1 = this.AlternateAdd.get('addressLine1').value ? this.AlternateAdd.get('addressLine1').value + " ," : "";
    //   let addressLine2 = this.AlternateAdd.get('addressLine2').value ? this.AlternateAdd.get('addressLine2').value + " ," : "";
    //   let addressLine3 = this.AlternateAdd.get('addressLine3').value ? this.AlternateAdd.get('addressLine3').value + " ," : "";
    //   address = this.addresstype + ", " + addressLocation + addressLine1 + addressLine2 + addressLine3 + this.AlternateAdd.get('city').value + " ," + this.selectedState.state + " ," + this.AlternateAdd.get('pinCode').value;
    //   accNo = $("#savingAccSel").val();
    // }


    var address :any;
    if(this.addressType == 'communication'){
      address = this.address.communicationAdd;
    } else {
      address = this.address.permenantAdd1;
    }
    this.DataService.resetTransactionObj();
    //navigating to Otp page
    reqParam = this.chequeBookReqService.getIssueChequebookRequest(this.commonForm.value.savingAcc, custId, address , this.commonForm.value.checkPageNo);
    this.DataService.request = reqParam
    this.DataService.endPoint = this.constant.serviceName_ISSUECHEQUEBOOK;
    this.DataService.authorizeHeader = "Cheque Book Request";
    this.DataService.screenType = 'chequeBookRequest';
    this.DataService.otpSessionPreviousPage = "/chequeBookRequest";

    var chequeaddress
    if(this.addressType == 'communication'){
      chequeaddress = this.address.communicationAdd == "" ? "-" : this.address.communicationAdd 
    }
    else if(this.addressType == 'permanent'){
      chequeaddress = this.address.permenantAdd1 == "" ? "-" : this.address.permenantAdd1 
    }

    this.DataService.transactionReceiptObj.accNumber = this.commonForm.value.savingAcc;
    this.DataService.transactionReceiptObj.checkPageNo = this.commonForm.value.checkPageNo;
    this.DataService.transactionReceiptObj.commAddress =  chequeaddress;

    this.router.navigate(['/otpSession']);
  }

  /**
   * submit function for alternative address
   */
  AlternateSubmit() {
    this.validatesForm('alternate')
    if (this.AlternateAdd.valid) {
      this.issueChequeBook('A');
    } else {
      this.formErrorsAlternateAdd = this.formValidation.validateForm(this.AlternateAdd, this.formErrorsAlternateAdd, true);
    }
  }

  getState(){
    let stateListParams = this.chequeBookReqService.getStateListParams();
    this.http.callBankingAPIService(stateListParams, this.constant.deviceID, this.constant.serviceName_GETSTATES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('set')) {
          this.stateList = data.set.records;
          console.log("statelist:::::::",this.stateList);
          // this.DataService.stateList=this.stateList;
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);

      }
    });
  }

  getCitiesListByStateId(stateId,type?:any){

  this.cityList = [];
   let cityListParams = this.chequeBookReqService.getCityListParams(stateId);
      this.http.callBankingAPIService(cityListParams, this.constant.deviceID, this.constant.serviceName_GETCITIES).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
          if (data.hasOwnProperty('set')) {
            this.cityList = data.set.records;

          }
        }
        else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }










  /**
  * This function invoked to get all cities list
  */
  // getCitiesListByStateId(stateId) {
  //   if (stateId != '') {
  //     this.selectedState = this.DataService.stateList.find(i => i.ID == stateId);
  //     let cityListParams = this.chequeBookReqService.getCityListParams(stateId);
  //     this.http.callBankingAPIService(cityListParams, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETCITIES).subscribe(data => {
  //       console.log(data);
  //       var resp = data.responseParameter;
  //       if (resp.opstatus == "00") {
  //         console.log(data.responseParameter);
  //         if (data.hasOwnProperty('set')) {
  //           this.cityList = data.set.records;
  //           this.AlternateAdd.patchValue({ city: '' });
  //           this.CommunicationAdd.patchValue({ city: '' });
  //         }
  //       }
  //       else {
  //         this.errorCallBack(data.subActionId, resp);
  //       }
  //     });
  //   }else{
  //     this.AlternateAdd.patchValue({ city: '' });
  //     this.CommunicationAdd.patchValue({ city: '' });
  //     this.cityList = [];
  //   }
  // }

  //  /**
  //  * show and hide content if selected
  //  * @param accNo
  //  */
  // selectAccount(accNo){
  //   this.accNo = accNo;
  //   $('.box').slideUp();
  //   $('body').find('#'+ accNo).slideDown();
  //   this.AlternateAdd.reset();
  //   this.CommunicationAdd.reset();
  //  this.resetSelect();
  // }


  selectAccount(){
    let accNo =  this.commonForm.value.savingAcc;
    var accDtl = this.accountList.filter(obj => obj.accountNo == accNo)[0];
    if(accDtl.SchemeCode == "SBA"){
      this.noOfLeave =[
        {"No": 20},
        {"No": 40},
        {"No": 60},
      ]
    }
    else{
      this.noOfLeave =[
        {"No": 25},
        {"No": 50},
        {"No": 100},
      ]
    }
    this.addressSelection();

  }


  gatCheckBookAddress(param){
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETADDRESSOFCHQBOOK).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log("Address :: ",data.responseParameter);
        if (data.hasOwnProperty("set")) {
          this.address = data.set.records[0];
          //data.set.records[0].permenantAdd1 //communicationAdd
        }
      }
      else {

      }
    });
  }

  /**
   * show and hide content base on address type
   * @param addressVal
   */
  addressTypeChange(addressVal) {
    this.addresstype = addressVal
    console.log(this.addresstype)
    $('.box').slideUp();
    $('body').find('#' + addressVal).slideDown();
    this.AlternateAdd.reset();
    this.CommunicationAdd.reset();
    this.resetSelect();
    this.CommunicationAdd.patchValue({confirmation:'Yes'})
  }

  /**
   * On cancel click this function is called
   */
  cancel() {
    if(this.constant.getIsCordova() == "web"){
      this.router.navigateByUrl('/dashboard');
    }
    else{
      this.router.navigateByUrl('/dashboardMobile');
    }
  }

  /**
     * function to called on unsuccessfull responce
     * @subActionId
     * @resp
     */
  errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result, "error");
  }

  /**
   * reset Select options to default select
   */

  resetSelect() {
    this.AlternateAdd.get('state').reset('');
    this.AlternateAdd.get('city').reset('');
    this.CommunicationAdd.get('state').reset('');
    this.CommunicationAdd.get('city').reset('');
    this.cityList = [];
  }

  submit() {
    this.commonFormSubmit();
    // if (this.addresstype == 'Communication') {
    //   this.CommunicationSubmit();
    // } else if (this.addresstype == 'Alternate') {
    //   this.AlternateSubmit();
    // } else {
    //   this.commonFormSubmit();
    // }
  }

  addressSelection(){
    let accNo =  this.commonForm.value.savingAcc;
    var param = this.chequeBookReqService.getAddressOfCheckBook(accNo);
    this.gatCheckBookAddress(param);
  }

  openPopUp(){
  
    this.commonMethod.openPopup("div.termscondition-popup")
  }
  closepopup(){
    this.commonMethod.closePopup("div.termscondition-popup")
  }


  onAccountSelectType(){
    if(window.innerWidth < 767) {
      this.commonMethod.openPopup('div.popup-bottom.sel-account');
    }
  }

  _closePopup(){
    this.commonMethod.closePopup('div.popup-bottom.sel-account');
  }


  onFromAccountSelect(accountNumber){
    this.selectedAccount = "";
    
    this.selectedAccount = accountNumber;
    this.selectedAccName = this.DataService.userDetails?.customerName;
    this.selAccNo = accountNumber;
    this.SchemeCode = this.DataService.customerOperativeAccList.filter(obj => (obj.accountNo == accountNumber))[0].SchemeCode;
    var accountNo = this.DataService.customerOperativeAccList.filter(obj => (obj.accountNo == accountNumber))[0].sbAccount;
    var userDtl = this.SchemeCode +" "+accountNo; 
    this.commonForm.patchValue({ accountNo: userDtl });
    console.log(userDtl);
    this.commonForm.patchValue({ savingAcc: this.selectedAccount });
    this.selectAccount();
  }

}

