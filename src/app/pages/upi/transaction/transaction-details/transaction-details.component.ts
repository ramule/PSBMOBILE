import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RaiseComplaint } from 'src/app/models/raise-complaint.model';
import { TrackStatus } from 'src/app/models/track-status.model';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../services/data.service';
import { AddBenificiary } from 'src/app/models/add-benificiary-model';
import { BenificiaryService } from '../../benificiary/benificiary.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { Location } from '@angular/common';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { PluginService } from '../../../../services/plugin-service';
import { payUpiRequestService } from '../../pay/pay-upi/pay-upi-request.service';
import { TrackStatusService } from '../../../upi/track-status/track-status.service';
import { NpciAndroidService } from '../../../../services/npci-android.service';
import { NpciIosService } from '../../../../services/npci-ios.service';
import * as moment from 'moment';

declare var cordova;

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {

  headerdata = {
    'headerType': 'none',
    'titleName': '',
    'footertype': 'none'
  }
  upiTrans: any;
  payeePaymentType: any;
  payeerPaymentType: any;
  isFavorite = false;
  defaultVPAAccountDetails: any;
  popupData: any = {};
  payType: any;
  payeeObj: any;
  favoriteName: any;
  favoriteVpa: any;
  recentPayeeReqList = [];
  favPayeeList = [];
  benficiaryListData: any;
  backButtonUrl: any;
  activeTabName: string = "VPA";
  isSelfPayer: boolean = false;
  transactionId: any;

  constructor(private router: Router,
    public DataService: DataService,
    private commonMethod: CommonMethods,
    private benificiaryService: BenificiaryService,
    private http: HttpRestApiService,
    public constant: AppConstants,
    private localStorage: LocalStorageService,
    private location: Location,
    private ngZone: NgZone,
    private translatePipe: TranslatePipe,
    private pluginService: PluginService,
    private payUpiService: payUpiRequestService,
    private npciAndroidService: NpciAndroidService,
    private npciIosService: NpciIosService,
    private trackStatusService: TrackStatusService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    if (this.DataService.previousPageUrl == 'transactionList') {
      this.backButtonUrl = 'transactionList';
    } else if (this.DataService.previousPageUrl == 'recentTransaction') {
      this.backButtonUrl = 'recentTransaction';
    } else {
      this.backButtonUrl = 'upiDashboard';
    }

    history.pushState({}, this.backButtonUrl, this.location.prepareExternalUrl(this.backButtonUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.upiTrans = this.DataService.getUPITransactionSelected();
    this.upiTrans.DATETIME = moment(this.upiTrans.DATETIME).format('DD MMM yyyy hh:mm a');
    console.log("this.upiTrans = ",JSON.stringify(this.upiTrans));
    this.DataService.isTrackStatus = false;
    this.showAccountForUser();
    this.defaultVPAAccountDetails = this.getDefaultVpaAccountDetails();
    this.favoriteName = this.upiTrans.TYPE == 'DR' ? this.upiTrans.BENNAME : this.upiTrans.REMITTERNAME,
    this.favoriteVpa = this.upiTrans.TYPE == 'DR' ? this.upiTrans.PAYEEADDR : this.upiTrans.PAYERADDR;
    this.payeePaymentType = this.getPaymentTypeNValue(this.upiTrans.PAYEEADDR);
    this.payeerPaymentType = this.getPaymentTypeNValue(this.upiTrans.PAYERADDR);
    this.getFavoritePayee();
    // this.getBenificiaryRequest();
  }

  showAccountForUser() {
    let selfMobNo = "91" + this.localStorage.getLocalStorage(this.constant.storage_mobileNo);
    console.log('selfMobNo', selfMobNo);

    console.log('this.upiTrans.REMITTERMOBILE', this.upiTrans.REMITTERMOBILE)
    console.log('this.upiTrans.BENMOBILE', this.upiTrans.BENMOBILE)

    if (this.upiTrans.REMITTERMOBILE && !this.upiTrans.BENMOBILE) {
      if (this.upiTrans.REMITTERMOBILE == selfMobNo) {
        console.log("Case 1 - User is PAYER, show PAYER : FROM A/C");
        this.isSelfPayer = true;
      } else if (this.upiTrans.REMITTERMOBILE != selfMobNo) {
        console.log("Case 2 - User is PAYEE, show PAYEE : TO A/C");
        this.isSelfPayer = false;
      } else {
        console.log("Else 1");
      }
    } else if (this.upiTrans.REMITTERMOBILE && this.upiTrans.BENMOBILE) {
      if (this.upiTrans.REMITTERMOBILE == selfMobNo) {
        console.log("Case 3 - User is PAYER, show PAYER : FROM A/C");
        this.isSelfPayer = true;
      } else if (this.upiTrans.REMITTERMOBILE != selfMobNo) {
        console.log("Case 4 - User is PAYEE, show PAYEE : TO A/C");
        this.isSelfPayer = false;
      } else {
        console.log("Else 2");
      }
    } else if (!this.upiTrans.REMITTERMOBILE && this.upiTrans.BENMOBILE) {
      if (this.upiTrans.BENMOBILE == selfMobNo) {
        console.log("Case 5 - User is PAYEE, show PAYEE : TO A/C");
        this.isSelfPayer = false;
      } else if (this.upiTrans.BENMOBILE != selfMobNo) {
        console.log("Case 6 - User is PAYER, show PAYER : FROM A/C");
        this.isSelfPayer = true;
      } else {
        console.log("Else 3");
      }
    } else {
      console.log("Else 4");
    }
    console.log('this.isSelfPayer', this.isSelfPayer);
  }

  getFavoritePayee() {
    if (this.DataService.favPayeeList.length > 0) {
      this.isFavorite = this.DataService.isFavoritePayee(this.favoriteVpa);
    }
  }

  getPaymentTypeNValue(value) {
    var paymentDtl = [];
    let paymentValue = value;
    if (value.indexOf("ifsc") != -1) {
      paymentDtl[0] = "ifsc"
      paymentValue = paymentValue.replace(".", "@");
      paymentValue = paymentValue.split("@");
      paymentDtl[1] = paymentValue[0];
      paymentDtl[2] = paymentValue[1];
    }
    else if (value.indexOf("mmid") != -1) {
      paymentDtl[0] = "mmid"
      paymentValue = paymentValue.replace(".", "@");
      paymentValue = paymentValue.split("@");
      paymentDtl[1] = paymentValue[0];
      paymentDtl[2] = paymentValue[1];
    }
    else {
      paymentDtl[0] = "vpa"
      paymentDtl[1] = paymentValue;
    }
    return paymentDtl
  }

  /**
     * 
     * @param routeName 
     */
  navigate(routeName: string) {
    // this.router.navigateByUrl(routeName);
    this.DataService.routeWithNgZone(routeName);
  }

  /**
  * Share Receipt via available methods in device
  */
  shareReceipt() {
    if (this.DataService.isCordovaAvailable) {
      var filename = "transaction_Details" + Date.now();
      let section = document.querySelector('#transactionDtl');
      // if(this.DataService.platform.toLowerCase() == this.constant.val_android) {
        this.commonMethod.shareImageInDevice(section, filename);
      // } else if(this.DataService.platform.toLowerCase() == this.constant.val_ios){
      //   this.commonMethod.takeScreenshot();
      // } else {
      //   console.log("Unknown Platform...");
      // }
    }
  }

  /**
   * Download Image in desktop
   * @param name 
   * @param type 
   */
  downloadPdf() {
    if (this.DataService.isCordovaAvailable) {
      var self = this;
      //   var options = {
      //     documentSize: 'A4',
      //     type: 'base64'
      // };
      // The name of your file, note that you need to know if is .png,.jpeg etc
      var filename = "transaction_Details" + Date.now() + '.png';
      let section = document.querySelector('#transactionDtl');
      
      if(self.DataService.platform.toLowerCase() == self.constant.val_android) {
        self.commonMethod.savePDFInDevice(section,filename);
      } else if(self.DataService.platform.toLowerCase() == self.constant.val_ios){
        self.commonMethod.takeScreenshot();
      } else {
        console.log("Unknown Platform...");
      }
    }
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
        this.showPopup("noAccountAvailable", "");
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

  /**
   * Repeat Payment
   */
  repeatPayment(upiTrans) {
    console.log('Retry => ');
    console.log(upiTrans);
    this.DataService.upiPayRequest.validatedVpaAdress = this.upiTrans.PAYEEADDR;
    this.DataService.upiPayRequest.amount = this.upiTrans.AMOUNT;
    this.DataService.fromRecentTransaction = true;
    var req;
    this.pluginService.getTransactionId().subscribe((transactionID) => {
      // this.payUpiService.getUserLocation();
      this.payeeObj = {};
      if (this.payeePaymentType[0] == 'vpa' && upiTrans.requestType == 'PAY') {
        this.payeeObj.payType = 'UPI_ID';
        this.payeeObj.payeeUpiAddress = this.payeePaymentType[1];
        req = this.payUpiService.setValidateRequest({ upiIdOrMobno: this.upiTrans.PAYEEADDR }, this.defaultVPAAccountDetails, transactionID);
        this.UpiApiCall(req);
      } else if (this.payeePaymentType[0] == 'ifsc' && upiTrans.requestType == 'PAY') {
        this.payeeObj.acctNum = this.payeePaymentType[1];
        this.payeeObj.bankIfsc = this.payeePaymentType[2];
        this.payeeObj.bankPayeeName = upiTrans.BENNAME;
        this.payeeObj.reActNum = this.payeePaymentType[1];
        this.payeeObj.payType = 'BNK_ACT';
        this.payeeObj.payeeUpiAddress = this.payeePaymentType[1] + "@" + this.payeePaymentType[2] + ".ifsc.npci";
        req = this.payUpiService.setValidateRequest({ upiIdOrMobno: this.payeeObj.payeeUpiAddress }, this.defaultVPAAccountDetails, transactionID);
        this.UpiApiCall(req);
      } else if (upiTrans.requestType == 'COLLECT') {
        this.payeeObj.payType = 'COLLECT';
        req = this.payUpiService.setValidateRequest({ upiIdOrMobno: this.upiTrans.PAYERADDR }, this.defaultVPAAccountDetails, transactionID);
        this.UpiApiCall(req);
      }
    });
  }

  /**
   * Raise Complaint
   */
  raiseComplaint() {
    this.DataService.isRaiseComplaint = true;
    this.DataService.raiseComplaint = new RaiseComplaint().deserialize({ rrn: this.upiTrans.RRN, transactionID: this.upiTrans.TXNID, complaintType: 'TRANSACTION', txnAmount: this.upiTrans.AMOUNT, payerAddress: this.upiTrans.PAYERADDR,payeeAddress:this.upiTrans.PAYEEADDR,transactionDate:this.upiTrans.DATETIME,refID:this.upiTrans.TXNID, initiationMode: this.upiTrans.INITIATION_MODE, txnStatus: this.upiTrans.TRNSTATUS, transactionType: this.upiTrans.TYPE, payeeCode: this.upiTrans.payeeCode });
    this.navigate('raiseComplaint');
  }

  /**
   * Track Status
   */
  trackStatus() {
    this.DataService.isTrackStatus = true;
    this.DataService.trackStatus = new TrackStatus().deserialize({ rrn: this.upiTrans.RRN, transactionID: this.upiTrans.TXNID, complaintType: 'TRANSACTION', txnAmount: this.upiTrans.AMOUNT, payerAddress: this.upiTrans.PAYERADDR,payeeAddress:this.upiTrans.PAYEEADDR,transactionDate:this.upiTrans.DATETIME,refID:this.upiTrans.TXNID, initiationMode: this.upiTrans.INITIATION_MODE, txnStatus: this.upiTrans.TRNSTATUS, transactionType: this.upiTrans.TYPE, payeeCode: this.upiTrans.payeeCode });
    // this.navigate('trackStatus');  
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
          console.log('Android transactionId Received => ', transactionId);
          this.transactionId = transactionId;
          var reqParams = this.trackStatusService.getTrackStatusReq(this.DataService.trackStatus, this.transactionId);
          this.UpiApiCall(reqParams);
        });
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          console.log('IOS transactionId Received => ', transactionId);
          this.transactionId = transactionId;
          var reqParams = this.trackStatusService.getTrackStatusReq(this.DataService.trackStatus, this.transactionId);
          this.UpiApiCall(reqParams);
        });
      }    
  }


  /**
   * Api call for adding payee as favorite payee
   */
  addPayeeToFavorite() {
    this.closePopup('fav-popup');
    let isAccountOrIfsc: boolean = false, isVPA: boolean = false, isMMid: boolean = false;
    this.isFavorite = !this.isFavorite;
    let favorite = this.isFavorite ? 'Y' : 'N';
    let addBenificiary: AddBenificiary = new AddBenificiary().deserialize(
      {
        isFavourite: favorite,
        payeeName: this.upiTrans.TYPE == 'DR' ? this.upiTrans.BENNAME : this.upiTrans.REMITTERNAME,
        nickName: this.upiTrans.TYPE == 'DR' ? this.upiTrans.BENNAME : this.upiTrans.REMITTERNAME,
        payeeVPA: this.upiTrans.TYPE == 'DR' ? this.upiTrans.PAYEEADDR : this.upiTrans.PAYERADDR
      });

    if (this.upiTrans.TYPE == 'DR') {
      if (this.payeePaymentType[0] == "ifsc") isAccountOrIfsc = true;
      else if (this.payeePaymentType[0] == "vpa") isVPA = true;
      else isMMid = true;
    }
    else {
      if (this.payeerPaymentType[0] == "ifsc") isAccountOrIfsc = true;
      else if (this.payeerPaymentType[0] == "vpa") isVPA = true;
      else isMMid = true;
    }
    this.benificiaryService.getUserLocation();
    var reqParams = this.benificiaryService.setAddBenificiaryRequest(addBenificiary, false, true, false);
    this.closePopup('fav-popup');
    this.UpiApiCall(reqParams);
  }

  /**
 * Get Recent Collect Request List
 */
  getBenificiaryRequest() {
    this.benificiaryService.getUserLocation();
    var reqParams = this.benificiaryService.getBenficiaryListReq(this.constant.val_upi_benListType_ALL, this.constant.val_upi_ANY);
    this.UpiApiCall(reqParams);
  }


  /**
* show popup by popupName
* @param popupName 
* @param data 
*/
  showPopup(popupName, data?) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
    this.popupData = data ? data : {};
    console.log('this.popupData', this.popupData);
  }

  /**
   * Close popup by popupName
   * @param popupName 
   */
  closePopup(popupName) {
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
  }


  /**
   * Common Api Call for collect 
   * @param request 
   */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_ADDBENIFICIARY:
            this.DataService.fetchUPIbenificiaryLists = true;
            if (response.msg) {
              // showToastMessage(response.msg, "success");
              this.ngZone.run(() => {
                this.DataService.information = response.msg;
                this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
                this.DataService.primaryBtnText = this.translatePipe.transform('OK');
                this.commonMethod.openPopup('div.popup-bottom.show-common-info');
              })
            }
            break;
          case this.constant.upiserviceName_VALIDATEADDRESS:
            if (this.payeeObj.payType == 'COLLECT') {
              this.DataService.validateAddressResp = response.responseParameter;
              console.log('this.DataService.verifyAddressResp');
              this.DataService.validateAddressResp.payType = this.payeeObj.payType
              this.navigate('collectAmount');
            } else if (this.upiTrans.requestType == 'PAY') {
              if ((response.responseParameter.validatedVpa == this.payeeObj.payeeUpiAddress) && this.payeePaymentType[0] == 'ifsc') {
                this.DataService.verifyAddressResp = this.payeeObj;
              } else {
                this.DataService.verifyAddressResp = response.responseParameter;
                this.DataService.verifyAddressResp.payType = this.payeeObj.payType;
                console.log('this.DataService.verifyAddressResp');
              }
              this.navigate('payUpiPayment');
            } else {
              this.DataService.validateAddressResp = response.responseParameter;
              break;
            }
          case this.constant.upiserviceName_GETBENIFICIARYLIST:
            this.benficiaryListData = response.responseParameter.beneficiaryList;
            let benficiaryList = this.benficiaryListData;
            this.favPayeeList = [];
            benficiaryList.map((benificiary, index) => {
              if (benificiary.favourites == 'Y' && benificiary.txnMode == this.activeTabName) {
                this.favPayeeList.push(benificiary);
              }
            });
            this.DataService.favPayeeList = this.favPayeeList;
            this.getFavoritePayee();
            break;
            case this.constant.upiserviceName_TRACKSTATUS:
              this.DataService.trackStatusRes = response.responseParameter;
              this.navigate('trackStatus');
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

  goToPage() {
    var routeName;
    if (this.DataService.previousPageUrl == 'transactionList') {
      routeName = 'transactionList';
    } else if (this.DataService.previousPageUrl == 'recentTransaction') {
      routeName = 'recentTransaction';
    } else {
      routeName = 'upiDashboard';
    }
    this.DataService.routeWithNgZone(routeName);
  }

  downloadInvoice() {
    var inAppBrowserRef;
    var self = this;
    inAppBrowserRef = cordova.InAppBrowser.open(self.upiTrans.refURL, '_blank', 'location=no');
    // inAppBrowserRef = cordova.InAppBrowser.open('https://cordova.apache.org', '_blank', 'location=no');
    // inAppBrowserRef.addEventListener('loadstop', function(){
    //   console.log("loading stopped");
    //   self.commonMethod.takeScreenshot();
    // });
  }
}
