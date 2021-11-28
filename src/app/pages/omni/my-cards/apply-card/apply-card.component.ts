import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { ApplyCardService } from '../apply-card/apply-card.service';
import { DebitCardsService } from '../debit-cards/debit-cards.service';
import { MyAccountInfoService } from '../../my-accounts/my-accounts-info/my-account-info.service';

@Component({
  selector: 'app-apply-card',
  templateUrl: './apply-card.component.html',
  styleUrls: ['./apply-card.component.scss']
})
export class ApplyCardComponent implements OnInit {
  cardList: any = [];
  masterCard: any = [];
  RUPAYCard: any = [];
  RUPDOCard: any = [];
  RUPPLCard: any = [];
  sessionDecryptKey: any;
  cardsData:any;
  myCardArray:any;
  noAccountNoAvailable: boolean = false;
  notValidAccount: boolean = false;

  accountList: any;
  //   { 'accountType': 'Saving Account', 'accountNo' : 'XXX XXX 9897'},
  //   {'accountType': 'Saving Account', 'accountNo' : 'XXX XXX 9898'},
  //   {'accountType': 'Saving Account', 'accountNo' : 'XXX XXX 9899'},
  //   {'accountType': 'Saving Account', 'accountNo' : 'XXX XXX 9890'},
  // ] ;
  cardIsLoad : boolean = false;

  accountValue: any = '';
  accNum: any;
  constructor(
    private router: Router,
    public DataService: DataService,
    public applyCardService: ApplyCardService,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private commonmenthod: CommonMethods,
    private storage: LocalStorageService,
    private encryptDecryptService: EncryptDecryptService,
    private commonMethod: CommonMethods,
    private debitService: DebitCardsService,
    private myAccountInfoService: MyAccountInfoService
  ) { }

  ngOnInit(): void {
    //this.accountList = this.DataService.customerOperativeAccList;
    this.accountList =this.DataService.customerOperativeAccList.filter(acc => (acc.Status.toLowerCase() == "active"));
    this.DataService.transactionReceiptObj.amount = null;

    this.DataService.setPageSettings('Apply Card');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('APPLY_FOR_CARDS' , this.router.url)
    if (this.accountList.length > 0) {
      setTimeout(()=>{
        $('#accountDtls').val(this.accountList[0].accountNo)
      })
      this.getDebitCardList();
    }
  }


  getDebitCardList() {

    var myAccount = '';

    this.accountList.forEach(function (value,index) {
      console.log(value.accountNo);
      console.log(index);
      if(index > 0){
        myAccount += ','+value.accountNo;
      }else{
        myAccount += value.accountNo;
      }

    });

    var param = this.debitService.getDebitCardListParam(myAccount);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CARDDETAILSBYACCOUNTNO).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.cardsData = JSON.parse(data.responseParameter.CardDetails);
        console.log(this.cardsData);
        this.cardsData.forEach(el => {
          console.log(el);
        });

        this.myCardArray = this.accountList.filter(ar => !this.cardsData.find(rm => (rm.AccountNo === ar.accountNo) ));
        console.log(this.myCardArray);

        if(this.myCardArray.length == 0){
          this.noAccountNoAvailable = true;
        }
        else{
          this.noAccountNoAvailable = false;
          this.accNum = this.myCardArray[0].accountNo;
          this.getAccDtls(this.myCardArray[0]);
        }
      }
      else {
        this.myCardArray = this.accountList;
        this.accNum = this.myCardArray[0].accountNo;
        this.getAccDtls(this.myCardArray[0]);
      }
    });

  }

  getAccDtls(selAccDtl){
    console.log(selAccDtl);
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
            this.notValidAccount = true;
          }
          else{
            this.getToAccountValue(this.myCardArray[0].accountNo)
            this.notValidAccount = false;
          }
        }
      }
      else {
        this.notValidAccount = true;
      }
    });
  }

  goToPage(routeName,CardDetails?) {
    if(routeName == 'cardDetails'){
      this.DataService.cardDetailsFrom = "APPLY_CARDS"
      this.DataService.selectedApplyCard = CardDetails;
      this.DataService.selAccNum = this.accNum;
      this.DataService.isCardUpgrade = false;
    }
    this.router.navigateByUrl('/' + routeName);
  }

  getSelAccNoDtl(value){
    this.accNum = value;
    this.getAccDtls(this.accountList.filter(ar => ar.accountNo == value )[0]);
  }

  getToAccountValue(value) {
    this.accNum = value
    let param = this.applyCardService.getCardList(this.accNum);
    this.getCardListApiCall(param)
  }

  getCardListApiCall(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETCARDTYPELIST).subscribe(data => {
      console.log(data);
      this.cardIsLoad = true;
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.cardList = [];
        if (data.set.records[0].statement.length > 2) {
          var records = data.set.records[0].statement.split(',');
           for (var i = 0; i < records.length; i++) {
            var cardType = records[i].trim().replace(/[\[\]']+/g, '');
            var cardDtls =  this.DataService.cardDetailsNOffer.filter(x => x.cbsCode === cardType);
            this.cardList.push({ 'cbsCode': cardDtls[0].cbsCode,'cardType': cardDtls[0].cbsVarient, 'image': cardDtls[0].cardImg, 'bin': cardDtls[0].bin , 'cardName': cardDtls[0].cardType , 'features': cardDtls[0].features , 'offerUrl': cardDtls[0].offerUrl})
          }
        }
        var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey, resp.Session);
      }
    });

  }

  onAccountSelectType() {
    if (window.innerWidth < 767) {
      this.commonMethod.openPopup('div.popup-bottom.sel-account');
    }
  }

  getToAccValue(accDtl) {
    this.accountValue = accDtl;
  }

  closePopup() {
    this.commonMethod.closeAllPopup();
  }

  selectAccount(selAcount){
    this.accNum = selAcount.accountNo;
    this.getAccDtls(this.accountList.filter(ar => ar.accountNo == selAcount.accountNo )[0]);
  }

  goToLink(url: string){
    window.open(url, "_blank");
}

}
