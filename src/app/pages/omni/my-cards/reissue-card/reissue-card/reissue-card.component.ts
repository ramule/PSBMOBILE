import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { ReissueCardService } from '../reissue-card/reissue-card.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { Location } from '@angular/common';
import { InitiateSendMoneyService } from '../../../fund-transfer/initiate-send-money/initiate-send-money.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { MyAccountInfoService } from '../../../my-accounts/my-accounts-info/my-account-info.service';

@Component({
  selector: 'app-reissue-card',
  templateUrl: './reissue-card.component.html',
  styleUrls: ['./reissue-card.component.scss']
})
export class ReissueCardComponent implements OnInit {

  reissueDebitCardForm: FormGroup;
  accountValue: any = '';
  bankImage: any = '';
  bankImageSelection: any = '';
  accountNumber: any = '';
  openDropDown: boolean = false;
  accountList: any = [];
  cardNolist: any = [];
  multipleCardList: any = [];
  cardNo: any;
  reason: any;
  debitCardNumber: any;
  accountListData: any;
  selectedAccount: any;
  accountNO: any = '';
  selectedDataCard: any
  maskedAccNo: any;
  isPhysicalEnable: boolean = false;

  constructor(
    private form: FormBuilder,
    private router: Router,
    public DataService: DataService,
    private commonMethod: CommonMethods,
    private formValidation: FormValidationService,
    private reissueCardService: ReissueCardService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private storage: LocalStorageService,
    private location: Location,
    private initiateSendMoneyService: InitiateSendMoneyService,
    private translatePipe: TranslatePipe,
    private myAccountInfoService: MyAccountInfoService,
  ) { }


  ngOnInit(): void {
    history.pushState({}, this.DataService.previousPageUrl, this.location.prepareExternalUrl(this.DataService.previousPageUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.DataService.setPageSettings('REISSUE_CARD');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('REISSUE_CARD', this.router.url)
    // this.router.navigateByUrl('/hotlistCard');
    var selCard = this.DataService.cardList.filter(obj => (obj.CardNo == this.DataService.currentCard.CardNo))
    this.dataSelection(selCard[0]);
    this.buildForm();
  }

  buildForm() {
    this.reissueDebitCardForm = new FormGroup({
      //accountNo: new FormControl('', [Validators.required]),
      reason: new FormControl(),
      physicalCard: new FormControl(),
      termCondition: new FormControl('', [Validators.required]),
    })
  }
  validateForm() {
    if (this.reissueDebitCardForm.invalid) {
      this.reissueDebitCardForm.get('termCondition').markAsTouched();
      this.reissueDebitCardForm.get('reason').markAsTouched();
    }
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  onAccountSelectType() {
    if (window.innerWidth < 767) {
      //this.commonMethod.openPopup('div.popup-bottom.sel-account');
    }
  }

  getToAccValue(bankImage, accountNo) {
    this.accountValue = accountNo;
    this.bankImage = bankImage;
    this.debitCardNumber = accountNo;
    var selectedData = this.cardNolist.filter(obj => obj.CardNo == accountNo);
    console.log("selectedData:::", selectedData);
    this.accountNO = selectedData[0].AccountNo;
    this.selectedDataCard = selectedData[0]
    console.log("Data::::::", this.selectedDataCard);
  }

  selectCardNo(accountValue) {
    this.debitCardNumber = accountValue;
  }


  closePopup() {
    this.commonMethod.closeAllPopup();
  }

  dataSelection(selCard) {
    this.selectedDataCard = selCard;
    console.log(this.selectedDataCard);
    this.maskedAccNo = this.commonMethod.maskAccNo(this.selectedDataCard?.AccountNo);

  }

  toggleOpen() {
    this.openDropDown = !this.openDropDown
  }

  cancel() {
    if (this.constant.getPlatform() == "web") {
      this.router.navigate(['/debitCards']);
    }
    else {
      this.location.back();
    }
  }

  onSubmit() {
    if (this.reissueDebitCardForm.valid) {
      this.getAccDtls(this.DataService.customerOperativeAccList.filter(obj => (obj.accountNo == this.selectedDataCard.AccountNo))[0]);
    }
    else {
      this.validateForm();
    }
  }

  getAccDtls(selAccDtl){
    console.log(selAccDtl);
    if(selAccDtl.Status.toLowerCase() ==  "active"){
      var param = this.myAccountInfoService.getAccountEnquiryParam(selAccDtl);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ACCOUNTINQUIRY).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data);
        if (data.hasOwnProperty("set")) {
          var data = data.set.records[0].statement.split(',')
          var freezdata = data[6].trim()
          if(freezdata=='D' || freezdata=='M' || freezdata=='I' || freezdata=='C' )
          {
            this.commonMethod.openPopup('div.popup-bottom.re-issue-not-applicable');
          }
          else{
            
            //Check if having sufficient balance or not
            var param = this.initiateSendMoneyService.getAccountBalanceParam(this.selectedDataCard.AccountNo);
            this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEINQUIRY).subscribe(data => {
              console.log(data);
              var resp = data.responseParameter
              if (resp.opstatus == "00") {
                var accBalance = data.set.records[0].ledgerBalance;
                if (Number(accBalance) > 500) {
                  this.reissueCard();
                }
                else {
                  this.commonMethod.openPopup('div.popup-bottom.min-balance-info');
                }
              }
              else {

              }
            })

      
          }
        }
      }
      else {
        this.commonMethod.openPopup('div.popup-bottom.re-issue-not-applicable');
      }
    });
    }
    else{
      this.commonMethod.openPopup('div.popup-bottom.re-issue-not-applicable');
    }
  }

  reissueCard() {
    this.DataService.resetTransactionObj();

    if (this.selectedDataCard.Card_status == "9") {
      this.DataService.request = this.reissueCardService.getReissueCard(this.selectedDataCard, this.reissueDebitCardForm.value.physicalCard,"REISSUEDEBITCARD")
      this.DataService.endPoint = this.constant.serviceName_REISSUEDEBITCARD;
    }
    else {
      this.DataService.request = this.reissueCardService.getBlockReissueCardParam(this.selectedDataCard, this.reissueDebitCardForm.value.physicalCard,"REISSUEDEBITCARD");
      this.DataService.endPoint = this.constant.serviceName_BLOCKCARDANDREISSUE;
    }
    console.log("endPoint =====> " + this.DataService.endPoint);
    this.DataService.authorizeHeader = "Reissue Card";
    this.DataService.cardServiceType = "REISSUEDEBITCARD";
    this.DataService.transactionReceiptObj = this.selectedDataCard;
    this.DataService.transactionReceiptObj.accountNumber = this.selectedDataCard.AccountNo;
    this.DataService.transactionReceiptObj.blockReason = this.reissueDebitCardForm.value.reason == "" ? "-" : this.reissueDebitCardForm.value.reason ;
    this.DataService.transactionReceiptObj.cardMode = this.reissueDebitCardForm.value.physicalCard ? this.translatePipe.transform('PHYSICAL') : this.translatePipe.transform('VIRTUAL');
    this.DataService.transactionReceiptObj.cardApplyType =   this.DataService.cardDetailsNOffer.filter(obj => obj.bin == this.selectedDataCard.BinPrefix)[0].cardType 
    this.DataService.selectedDataCard = this.selectedDataCard;
    this.DataService.physicalCard = this.reissueDebitCardForm.value.physicalCard ? "VP" : "V";
    console.log(this.DataService.debitCardIssuedData);
    this.DataService.screenType = 'reissuecard';
    this.DataService.otpSessionPreviousPage = "/reissueCard";
    this.router.navigate(['/otpSession']);
    //this.getReissuedDebitCard();

  }
  //   getHotlistCard()
  //   {
  //     let param = this.reissueCardService.getHotlistDebitCard();
  //     this.getHostlistCardApiCall(param)

  //   }
  //   getHostlistCardApiCall(param)
  //   {
  //     this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_BLOCKCARD).subscribe(data=>{
  //       console.log(data);
  //       var resp = data.responseParameter
  //         if (resp.opstatus == "00") {
  //           console.log(data.responseParameter);
  //        }
  //       });
  // }


  getReissuedDebitCard() {
    let param;
    param = this.reissueCardService.getReissueCard(this.debitCardNumber, this.selectedDataCard,"REISSUEDEBITCARD")
    this.DataService.endPoint = this.constant.serviceName_REISSUEDEBITCARD;
    this.DataService.authorizeHeader = "REISSUE DEBITCARD"
    this.DataService.screenType = "Reissue Card";
    this.DataService.transactionReceiptObj.debitCardNumber = this.debitCardNumber//"6522830166000246";
    this.DataService.transactionReceiptObj.accountNumber = this.accountNO;
    this.DataService.transactionReceiptObj.reason = "BLock"
    this.DataService.request = param;
    var cbsCode = this.DataService.cardDetailsNOffer.filter(obj => obj.cbsVarient == this.selectedDataCard.CardType)[0].cbsCode;
    this.DataService.debitCardIssuedData = this.selectedDataCard.accountNO + "|" + this.selectedDataCard.CardNo + "|" + cbsCode + "|";//account number|card number|card type|
    this.router.navigate(['/otpSession']);
  }


  physicalEnabled() {
    if (this.reissueDebitCardForm.value.physicalCard) {
      this.isPhysicalEnable = true;
    }
    else {
      this.isPhysicalEnable = false;
    }
  }


  openchargespopup() {
    this.commonMethod.openPopup('div.popup-bottom.chargesPopup');
  }


  _closePopup(popup) {
    this.commonMethod.closePopup(popup);
  }

}




