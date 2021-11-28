import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { TruncatePipe } from 'src/app/pipes/first-last-char.pipe';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { TransactionListService } from '../transaction-list/transaction-list.service';
import { PluginService } from '../../../../services/plugin-service';
import { payUpiRequestService } from '../../pay/pay-upi/pay-upi-request.service';
import * as moment from 'moment';

@Component({
  selector: 'app-recent-transaction',
  templateUrl: './recent-transaction.component.html',
  styleUrls: ['./recent-transaction.component.scss']
})
export class RecentTransactionComponent implements OnInit {
  @ViewChild('content') content: ElementRef;

  headerdata = {
    'headerType': 'none',
    'titleName': '',
    'footertype': 'none'
  }
  recentTransactionList = [];
  transactions: any = [];
  transactionsListFilter: any = [];
  defaultVPAAccountDetails: any;
  payType: any;
  payeeObj: any;
  recentPayeeName : any ;
  isListSorted: boolean = false;
  payeeCode: any;

  constructor(private router: Router, public DataService: DataService, private location: Location, private transactionListService: TransactionListService, private http: HttpRestApiService, private storage: LocalStorageService, private constant: AppConstants, private truncatePipe: TruncatePipe,
    private pluginService: PluginService, private payUpiService: payUpiRequestService) { }

  ngOnInit(): void {
    this.recentPayeeName = this.truncatePipe.transform(this.DataService.recentTransactionUPI.nickName);
    // this.headerdata.titleName = recentPayeeName;
    history.pushState({}, 'upiDashboard', this.location.prepareExternalUrl("upiDashboard"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    console.log('DataService.recentTransactionUPI');
    console.log(this.DataService.recentTransactionUPI);

    this.defaultVPAAccountDetails = this.getDefaultVpaAccountDetails();
    this.DataService.changeMessage(this.headerdata);
    console.log("this.DataService.upiTransactionList");
    console.log(this.DataService.upiTransactionList);
    console.log('this.DataService.upiCallTransactionHistoryApi = ', this.DataService.upiCallTransactionHistoryApi);
    if(this.DataService.upiCallTransactionHistoryApi){
      this.getParamTransactionListBankingService();
    } else {
      this.isListSorted = true;
      this.setTransactionsList(this.DataService.upiTransactionList)
    }
  }

  goToTransactionDetail(recentTransaction) {
    this.DataService.isRaiseComplaint = false;
    this.DataService.baseStartUrl = this.DataService.currentPageUrl;
    this.DataService.selectedUPITranForFurtherProcess(recentTransaction);
    // this.router.navigateByUrl('/transactionDetails');
    this.DataService.routeWithNgZone('transactionDetails');
  }



  getParamTransactionListBankingService() {
    var param = this.transactionListService.getParamTransactionList()
    this.callTransactionListBankingService(param);
  }

  /**
* Get Default Vpa Adress/Account Details
*/
  getDefaultVpaAccountDetails() {
    let defaultVpaAccountArr = this.DataService.vpaAddressList.find((vpaAddress) => { return vpaAddress.default == "Y" });
    if (defaultVpaAccountArr) {
      let accountDetails = this.getDefaultAccountNoByVpa(defaultVpaAccountArr.accounts);
      return {
        vpaDetails: defaultVpaAccountArr,
        accountDetails: accountDetails
      }
    } else {
      if (this.DataService.vpaAddressList.length > 0) {
        let vpaAddressListCopy = this.DataService.vpaAddressList
        vpaAddressListCopy.map((vpaAddress: any, index) => {
          if (index == 0) {
            vpaAddress.default = "Y";
          } else {
            vpaAddress.default = "N";
          }
        });
        let defaultVpaAccountArr = vpaAddressListCopy.find((vpaAddress) => { return vpaAddress.default == "Y" });
        if (defaultVpaAccountArr) {
          let accountDetails = this.getDefaultAccountNoByVpa(defaultVpaAccountArr.accounts);
          return {
            vpaDetails: defaultVpaAccountArr,
            accountDetails: accountDetails
          }
        }
      } else {
        // this.showPopup("noAccountAvailable", "");
      }
    }
  }

  /**
   * Get Default Vpa AccountNo Details
   * @param array
   */
  getDefaultAccountNoByVpa(array) {
    if (array.length > 0) {
      return array.find((account) => { return account.isDefaultAccount == "Y" });
    }
  }

  callTransactionListBankingService(param) {
    console.log(param);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICE, true).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        var respJson = resp.upiResponse;
        // this.DataService.processTransactionlist(this.transactions);
        if(respJson.responseParameter.transactions.length > 0){
          this.isListSorted = false;
          this.setTransactionsList(respJson.responseParameter.transactions)
        }
      }
    });
  }

  setTransactionsList(transactions){
    console.log('this.isListSorted', this.isListSorted);
    if(!this.isListSorted) {
      this.transactions = transactions.sort((a, b) => 0 - (a > b ? -1 : 1));
    } else {
      this.transactions =  transactions;
    }
    this.isListSorted = true;
    console.log(' SORTED => this.transactions');
    console.log(this.transactions);
    this.DataService.upiTransactionList = transactions;
    this.DataService.upiCallTransactionHistoryApi = false;
    this.getTransactionsByVpa();
  }

  getTransactionsByVpa() {
    let vpa = this.DataService.recentTransactionUPI.beneVpa;
    this.transactions.map((transaction) => {
      if ((transaction.PAYEEADDR && transaction.PAYEEADDR.toUpperCase() == vpa.toUpperCase()) || (transaction.PAYERADDR && transaction.PAYERADDR.toUpperCase() == vpa.toUpperCase())) {
        this.recentTransactionList.push(transaction)
        this.payeeCode = transaction.payeeCode;
      }
    });
    setTimeout(() => {
      this.scrollToBottom();
    });

    this.recentTransactionList.forEach(el => {
      // el.DATETIME = moment(el.DATETIME).format('DD MMM yyyy');
      el.DATETIME = moment(el.DATETIME).format('DD MMM yyyy hh:mm a');
    });
  }


  goToPage(routeName) {
    this.DataService.routeWithNgZone(routeName);
  }

  proceed(routeName) {
    if (routeName == 'collectRecentRequest') {
      this.payType = 'COLLECT'
      this.pluginService.getTransactionId().subscribe((transactionID) => {
        // this.payUpiService.getUserLocation();
        req = this.payUpiService.setValidateRequest({ upiIdOrMobno: this.DataService.recentTransactionUPI.beneVpa }, this.defaultVPAAccountDetails, transactionID);
        this.UpiApiCall(req);
      });
    } else {
      this.payType == 'PAY'
      var req;
      this.DataService.upiPayRequest.validatedVpaAdress = this.DataService.recentTransactionUPI.beneVpa;
      this.pluginService.getTransactionId().subscribe((transactionID) => {
        // this.payUpiService.getUserLocation();
        this.payeeObj = {};
        this.payeeObj.acctNum = this.DataService.recentTransactionUPI.beneAccount
        this.payeeObj.bankIfsc = this.DataService.recentTransactionUPI.beneIfsc
        this.payeeObj.bankPayeeName = this.DataService.recentTransactionUPI.nickName
        this.payeeObj.reActNum = this.DataService.recentTransactionUPI.beneAccount
        this.payeeObj.payType = this.DataService.recentTransactionUPI.txnMode
        this.DataService.upiPayRequest.amount = '';
        this.DataService.upiPayRequest.remarks = '';
        req = this.payUpiService.setValidateRequest({ upiIdOrMobno: this.DataService.recentTransactionUPI.beneVpa }, this.defaultVPAAccountDetails, transactionID);
        this.UpiApiCall(req);
      });
    }
    this.DataService.fromRecentTransaction = false;
  }


  /**
   * Common Api Call for collect
   * @param request
   */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_VALIDATEADDRESS:
            console.log('this.DataService.verifyAddressResp');

            if (this.payType == 'COLLECT') {
              this.DataService.validateAddressResp = response.responseParameter;
              this.goToPage('collectAmount');
            } else {
              if ((response.responseParameter.validatedVpa == this.DataService.recentTransactionUPI.beneVpa) && this.DataService.recentTransactionUPI.txnMode == 'ACCOUNT') {
                this.DataService.verifyAddressResp = this.payeeObj;
              } else {
                this.DataService.verifyAddressResp = response.responseParameter;
                this.DataService.verifyAddressResp.payType = this.payeeObj.payType;
              }
              this.goToPage('payUpiPayment');
            }
            break;
          default:
            break;
        }
      } else {
        // showToastMessage(data.msg, "error");
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) { }
  }

  goBack(){
    this.location.back()
  }

}
