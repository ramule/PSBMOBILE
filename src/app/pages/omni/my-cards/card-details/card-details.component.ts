import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CardDetailsService } from '../card-details/card-details.service';
import { AppConstants } from 'src/app/app.constant';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { DatePipe, Location } from '@angular/common';
import { InitiateSendMoneyService } from '../../fund-transfer/initiate-send-money/initiate-send-money.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

  cardDetailsForm: FormGroup;
  accountValue: any = '';
  accountNo: any;
  accountList: any;
  accounts: any;
  branchCode: any;
  accountOpeningdate: any = [];
  sessionDecryptKey: any;
  Date: any;
  cardDetails: any;
  isPhysicalEnable:boolean = false;

  constructor(
    private router: Router,
    public DataService: DataService,
    private form: FormBuilder,
    public cardDetailsService: CardDetailsService,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private commonmenthod: CommonMethods,
    private storage: LocalStorageService,
    private encryptDecryptService: EncryptDecryptService,
    public datePipe: DatePipe,
    private location: Location,
    private initiateSendMoneyService: InitiateSendMoneyService,
    private translatePipe: TranslatePipe
  ) { }


  buildForm() {
    this.cardDetailsForm = new FormGroup({
      selAcc: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      ecom: new FormControl(''),
      termCondition: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.accountList = this.DataService.customerOperativeAccList;
    this.cardDetails = this.DataService.selectedApplyCard;
    console.log(this.accountList , this.cardDetails);
    this.DataService.setPageSettings('CARD_DETAILS');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('CARD_DETAILS' , this.router.url);
    this.buildForm();
    this.setAccDtl();
  }

  setAccDtl(){
    var selectedData = this.accountList.filter(obj => obj.accountNo == this.DataService.selAccNum);
    this.accountNo = this.DataService.selAccNum;
    this.accountValue = selectedData[0].SchemeCode;
    this.branchCode = selectedData[0].branchCode;
    this.cardDetailsForm.patchValue({selAcc: this.DataService.selAccNum})
  }
  validateForm() {
    if (this.cardDetailsForm.invalid) {
      this.cardDetailsForm.get('selAcc').markAsTouched();
      this.cardDetailsForm.get('name').markAsTouched();
      this.cardDetailsForm.get('ecom').markAsTouched();
      this.cardDetailsForm.get('termCondition').markAsTouched();
      return;
    }
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  submit(data) {
    console.log('DataService.customerOperativeAccList::::::: ', this.DataService.customerOperativeAccList);
    console.log('profile details:::::::', this.DataService.profileDetails);
    console.log("Accountlist::::::", this.DataService.customerAccountList);
    console.log("State::::::", this.DataService.accountOpenFldData.branchState);
    console.log("accounttype::::", this.accountValue);

    //console.log(data);
    if (this.cardDetailsForm.valid) {
      this.getAccountDetails();
    }
    else {
      this.validateForm();
    }
  }

  getToAccValue(event) {
    console.log("Account:::", event.target.value);
    var accNum = event.target.value
    var selectedData = this.accountList.filter(obj => obj.accountNo == accNum);
    this.accountNo = accNum;
    this.accountValue = selectedData[0].SchemeCode;
    this.branchCode = selectedData[0].branchCode;
  }

  getAccountDetails() {
    let param = this.cardDetailsService.getAccountOpeningDetails(this.branchCode, this.accountNo);
    this.getAccountDetailApiCall(param)
  }

  getAccountDetailApiCall(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ACCOUNTINQUIRY).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.Date = this.openingDate(data.set.records[0].statement.split(',')[3]);
        console.log("isCardUpgrade =========> "+this.DataService.isCardUpgrade);
        if(this.DataService.isCardUpgrade){
          var param = this.initiateSendMoneyService.getAccountBalanceParam(this.accountNo);
          this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEINQUIRY).subscribe(data => {
            console.log(data);
            var resp = data.responseParameter
            if (resp.opstatus == "00") {
              var accBalance = data.set.records[0].ledgerBalance;
              if(Number(accBalance) > 500){
                this.upgradeCard();
              }
              else{
                this.commonmenthod.openPopup('div.popup-bottom.min-balance-info');
              }
            }
            else {
              
            }
          })
        }
        else{
          this.newCardIssued();
        }
      }
    });

  }

  openingDate(openDate) {
    var x = openDate;
    var day = x % 100;
    var month = Math.floor(x % 10000 / 100);
    var year = Math.floor(x / 10000);
    var date = new Date(year, month - 1, day);
    var OpDate = this.datePipe.transform(date, 'dd-MM-yyyy');
    return OpDate;
  }

  newCardIssued() {
    this.DataService.resetTransactionObj();
    let param;
    param = this.cardDetailsService.getCardApplyDetails(this.cardDetailsForm.value, this.accountNo, this.accountValue, this.branchCode, this.Date,this.cardDetails,"ISSUEDEBITCARD")
    this.DataService.endPoint = this.constant.serviceName_ISSUEDEBITCARD;
    this.DataService.authorizeHeader = "CARD DETAILS"
    this.DataService.screenType = "CardDetails";
    this.DataService.cardServiceType = "ISSUEDEBITCARD";
    this.DataService.transactionReceiptObj.accountNumber = this.cardDetailsForm.value.selAcc;
    this.DataService.transactionReceiptObj.name = this.cardDetailsForm.value.name;
    this.DataService.transactionReceiptObj.cardVariant = this.cardDetails.cardName;
    this.DataService.transactionReceiptObj.cbsCode = this.cardDetails.cbsCode;
    this.DataService.transactionReceiptObj.isPhysicalApplied = this.cardDetailsForm.value.ecom ? "P" : "V"
    this.DataService.transactionReceiptObj.cardApplyType = this.cardDetailsForm.value.ecom ? this.translatePipe.transform("PHYSICAL") : this.translatePipe.transform("VIRTUAL");
    this.DataService.request = param;
    this.DataService.debitCardIssuedData = this.accountNo+"|"+this.cardDetails.cbsCode+"|N|"+this.cardDetailsForm.value.name+"|";
    //Account number|card type|EcommFlag|DisplayName|CardNum|Personilzedcard(VP/V)|

    if (this.DataService.profileDetails[0].panNumber && this.DataService.profileDetails[0].aadharNumber && this.DataService.profileDetails[0].emailId) {
      this.DataService.otpSessionPreviousPage = "/cardDetails";
      this.router.navigate(['/otpSession']);
    }
    else{
      this.commonmenthod.openPopup('div.popup-bottom.show-common-info');
    }
  }


  upgradeCard(){
    this.DataService.resetTransactionObj();

    if(this.DataService.currentCard.Card_status == "9" ){
      this.DataService.request = this.cardDetailsService.getReissueCard(this.DataService.currentCard,this.cardDetailsForm.value.ecom,this.cardDetails,this.branchCode , "UPGRADEREISSUEDEBITCARD")
      this.DataService.endPoint = this.constant.serviceName_REISSUEDEBITCARD;
    }
    else{
      this.DataService.request = this.cardDetailsService.getBlockReissueCardParam(this.DataService.currentCard,this.cardDetailsForm.value.ecom,this.cardDetails,this.branchCode , "UPGRADEREISSUEDEBITCARD" );
      this.DataService.endPoint = this.constant.serviceName_BLOCKCARDANDREISSUE;
    }


    this.DataService.authorizeHeader = "CARD DETAILS"
    this.DataService.screenType = "CardDetails";
    this.DataService.transactionReceiptObj.accountNumber = this.cardDetailsForm.value.selAcc;
    this.DataService.transactionReceiptObj.name = this.cardDetailsForm.value.name;
    this.DataService.transactionReceiptObj.cardVariant = this.cardDetails.cardName;
    this.DataService.cardServiceType = "UPGRADEREISSUEDEBITCARD";
    this.DataService.transactionReceiptObj.cbsCode = this.cardDetails.cbsCode;
    this.DataService.transactionReceiptObj.cardApplyType = this.cardDetailsForm.value.ecom ? this.translatePipe.transform('PHYSICAL') : this.translatePipe.transform('VIRTUAL');
    this.DataService.transactionReceiptObj.isPhysicalApplied = this.cardDetailsForm.value.ecom ? "P" : "V";
    if (this.DataService.profileDetails[0].panNumber && this.DataService.profileDetails[0].aadharNumber && this.DataService.profileDetails[0].emailId) {
      var objCheckFlag = this.DataService.activitySettingData.findIndex(x => x.ACTIVITYNAME == this.DataService.endPoint.split('/')[1]);
      // if (this.DataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y') {
      //   this.DataService.otpSessionPreviousPage = "/cardDetails";
      //   this.router.navigate(['/otpSession']);
      //   this.DataService.otpName = "OTP"
      // }
      // else if(this.DataService.activitySettingData[objCheckFlag].TPINALLOWD == 'Y')
      // {
      //  this.DataService.otpSessionPreviousPage = "/cardDetails";
      //  this.router.navigate(['/otpSession']);
      //  this.DataService.otpName = "TPIN"
      // }

      this.DataService.otpSessionPreviousPage = "/cardDetails";
      this.router.navigate(['/otpSession']);
    }
    else{
      this.commonmenthod.openPopup('div.popup-bottom.show-common-info');
    }
  }

  physicalEnabled(){
    if(this.cardDetailsForm.value.ecom){
      this.isPhysicalEnable = true;
    }
    else{
      this.isPhysicalEnable = false;
    }
  }

  closePopup(popup){
    this.commonmenthod.closePopup(popup);
  }

  cancel() {

    if(this.DataService.cardDetailsFrom == 'APPLY_CARDS'){
      this.router.navigateByUrl('/applyCards');
    }else{
      this.router.navigateByUrl('/upgradeCards');
    }
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

  openchargespopup(){
    this.commonmenthod.openPopup('div.popup-bottom.chargesPopup');
  }
}
