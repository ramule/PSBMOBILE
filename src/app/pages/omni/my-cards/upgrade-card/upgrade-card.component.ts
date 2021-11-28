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
  selector: 'app-upgrade-card',
  templateUrl: './upgrade-card.component.html',
  styleUrls: ['./upgrade-card.component.scss']
})
export class UpgradeCardComponent implements OnInit {
  cardList: any = [];
  masterCard: any = [];
  RUPAYCard: any = [];
  RUPDOCard: any = [];
  RUPPLCard: any = []
  sessionDecryptKey: any;
  cardsData:any;
  myCardArray:any;
  selCardAcc:any;

  accountList: any;
  //   { 'accountType': 'Saving Account', 'accountNo' : 'XXX XXX 9897'},
  //   {'accountType': 'Saving Account', 'accountNo' : 'XXX XXX 9898'},
  //   {'accountType': 'Saving Account', 'accountNo' : 'XXX XXX 9899'},
  //   {'accountType': 'Saving Account', 'accountNo' : 'XXX XXX 9890'},
  // ] ;
  cardIsLoad : boolean = false;
  selCard:any;
  notValidAccount: boolean = false;

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
    this.DataService.setPageSettings('Upgrade Card');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('UPGRADE_CARD' , this.router.url);

    this.selCard = this.DataService.cardList.filter(obj => (obj.CardNo == this.DataService.currentCard.CardNo))[0];
    this.selCardAcc = this.DataService.customerOperativeAccList.filter(obj => (obj.accountNo == this.selCard.AccountNo))[0];
    console.log(this.selCardAcc);
    if(this.selCardAcc.Status.toLowerCase() == "active"){
      this.getAccDtls(this.selCardAcc);
    }
    else{
      this.notValidAccount = true;
    }
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
            this.getToAccountValue(this.selCard.AccountNo)
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
      this.DataService.cardDetailsFrom = "UPGRADE_CARD";
      this.DataService.selectedApplyCard = CardDetails;
      this.DataService.selAccNum = this.accNum;
      this.DataService.isCardUpgrade = true;
    }
    this.router.navigateByUrl('/' + routeName);
  }
  getToAccountValue(value) {
    // console.log("Account:::",event.target.value);
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
        console.log(data.responseParameter);
        if (data.set.records[0].statement.length > 2) {
          var records = data.set.records[0].statement.split(',');
          for (var i = 0; i < records.length; i++) {
            var cardType = records[i].trim().replace(/[\[\]']+/g, '');
            var cardDtls =  this.DataService.cardDetailsNOffer.filter(x => x.cbsCode === cardType);
            var alreadyAddCard =  this.DataService.cardDetailsNOffer.filter(x => x.cbsVarient === this.selCard.CardProgram);
            if(cardDtls[0].cbsVarient != alreadyAddCard[0].cbsVarient ){
              this.cardList.push({ 'cbsCode': cardDtls[0].cbsCode,'cardType': cardDtls[0].cbsVarient, 'image': cardDtls[0].cardImg, 'bin': cardDtls[0].bin , 'cardName': cardDtls[0].cardType , 'features': cardDtls[0].features , 'offerUrl': cardDtls[0].offerUrl})
            }
          }
        }
      }
    });

  }

  onAccountSelectType() {
    if (window.innerWidth < 767) {
      //this.commonMethod.openPopup('div.popup-bottom.sel-account');
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
    let param = this.applyCardService.getCardList(this.accNum);
    this.getCardListApiCall(param)
  }

}
