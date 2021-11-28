import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { UPIBankAccount } from 'src/app/models/account-detail-model';
import { NpciAndroidService } from '../../../../services/npci-android.service';
import { NpciIosService } from '../../../../services/npci-ios.service';
import { InterPayConfirmService } from './international-payment-confirmation.service';
import { AppConstants } from '../../../../app.constant';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { pageLoaderService } from 'src/app/services/pageloader.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-international-payment-confirmation',
  templateUrl: './international-payment-confirmation.component.html',
  styleUrls: ['./international-payment-confirmation.component.scss']
})
export class InternationalPaymentConfirmationComponent implements OnInit {

  payeeDetails: any;
  payerDetails: any;
  scanQrData: any;
  headerdata = {
    'headerType': 'TitleClose',
    'titleName': 'Confirmation',
    'footertype': 'none'
  }

  constructor(private router: Router,
    public DataService: DataService,
    private translate: TranslatePipe,
    private npciAndroidService: NpciAndroidService,
    private npciIosService: NpciIosService,
    private location: Location,
    private ngZone: NgZone,
    private interPayConfirmService: InterPayConfirmService,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private loaderService: pageLoaderService,
    private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    this.payeeDetails = this.DataService.verifyAddressResp;
    this.payerDetails = this.DataService.selectedVpaDetailsPay;
    this.scanQrData = this.DataService.ScanQrCodeData
  }

  /**
 * on pay button click and call NPCI library
 */
  onClickPayAmount() {
      let accountData = this.DataService.selectedVpaDetailsPay.accountDetails;
      this.DataService.verifyAddressResp.payAmount = this.payerDetails.value.amount.trim().replace(/[^.0-9]+/g, '');
      this.DataService.upiPayModelObj.payerAddr = this.DataService.selectedVpaDetailsPay.vpaDetails.paymentAddress ? this.DataService.selectedVpaDetailsPay.vpaDetails.paymentAddress : "";
      this.DataService.upiPayModelObj.payeeAddr = this.payeeDetails.payeeUpiAddress;
      this.DataService.upiPayModelObj.txnAmount = this.payerDetails.value.amount.trim().replace(/[^.0-9]+/g, '');
      this.DataService.upiPayModelObj.payeeName = this.payeeDetails.payeeName ? this.payeeDetails.payeeName : "";
      // this.DataService.upiPayModelObj.payeeMobile = this.DataService.verifyAddressResp.mobileNumber ? this.DataService.verifyAddressResp.mobileNumber : "";
      // this.DataService.upiPayModelObj.payeeMmid = this.DataService.verifyAddressResp.enterMmid ? this.DataService.verifyAddressResp.enterMmid : "";
      // this.DataService.upiPayModelObj.payeeAccount = this.DataService.verifyAddressResp.actNo ? this.DataService.verifyAddressResp.actNo : "";
      // this.DataService.upiPayModelObj.payeeIfsc = this.DataService.verifyAddressResp.IFSC ? this.DataService.verifyAddressResp.IFSC : "";

      // this.payAmount(accountData);
      //check ifsc for pre-approved
      if (accountData.isSelected && accountData.ifsc.includes("PSIB")) {
        this.DataService.preApprovedBankName = accountData.bankName;
        this.DataService.preApprovedAccNo = accountData.maskedAccountNumber;
        this.DataService.preApprovedAmount =  this.DataService.upiPayModelObj.txnAmount;
        this.DataService.preApprovedPreviousPageUrl = this.router.url;
        this.DataService.preApprovedFlowIdentifier = "pay";
        this.router.navigateByUrl('/transactionPin');
      } else {
        this.callNpciLibrary(accountData, this.DataService.selectedFlow);
      }
  }

  callNpciLibrary(accountData: UPIBankAccount, selectedFlow) {
    console.log("calling npci library...");
    this.loaderService.showLoader();
    if (window.hasOwnProperty('cordova')) {
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        console.log("Calling NPCI Android service...");
        this.npciAndroidService.initData();
        this.npciAndroidService.selectedFlow = selectedFlow;
        let subject = new Subject<any>();
        // this.npciAndroidService.credTypeValue = this.constant.val_npci_credTypeUpiPin;
        this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
          this.npciAndroidService.transactionId = transactionId;
          this.DataService.payReceiptTransId = transactionId;
        });
        this.npciAndroidService.androidStartCLLibrary(accountData, this.constant.val_npci_flow_sendMoney_android, subject).subscribe((NPCIResponse) => {
          console.log('Android StartCLLibrary Success => ', NPCIResponse);
          if (NPCIResponse.hasOwnProperty('status') && NPCIResponse.status == "00") {
            this.interPayConfirmService.setPaymentRequest(accountData, this.payeeDetails, this.payerDetails, this.scanQrData, NPCIResponse);
          }
        }, err => {
          console.log('Android StartCLLibrary error => ', err);
        });
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        console.log("Calling NPCI iOS service...");
        this.npciIosService.initData();
        this.npciIosService.selectedFlow = selectedFlow;
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          console.log('transactionId Received => ', transactionId);
          this.npciIosService.txnId = transactionId;
          let subject = new Subject<any>();
          this.npciIosService.iosStartCLLibrary(accountData, this.constant.val_npci_flow_sendMoney_ios, subject).subscribe((NPCIResponse) => {
            console.log('iOS StartCLLibrary Success => ', NPCIResponse);
            if(NPCIResponse && NPCIResponse.credkey) {
              this.interPayConfirmService.setPaymentRequest(accountData, this.payeeDetails, this.payerDetails, this.scanQrData, NPCIResponse);
            } else {
              console.log("NPCI flow cancelled...");
            }
          }, err => {
            console.log('iOS StartCLLibrary error => ', err);
          });
        });
      } else {
        showToastMessage("Unsupported Platform Try After Some Time!", "error");
        console.log("unknown platform = ", this.DataService.platform);
      }
    } else {
      console.log("Cordova not available... unable to start NPCI Library on web");
    }
  }

  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_FUNDSTRANSFER:
            this.DataService.payReceiptObj = response;
            console.log("this.payAmountForm.value => ", this.payeeDetails.value);
            let { remarks, amount } = this.payeeDetails.value;

            this.DataService.payReceiptObj.remarks = remarks;
            this.DataService.payReceiptObj.amount = amount;
            this.DataService.payReceiptObj.payeeName = this.payeeDetails.payeeName;
            this.DataService.payReceiptObj.payeeUpiAddress = this.payeeDetails.payeeUpiAddress;
            this.DataService.payReceiptObj.payeeBankName = this.payeeDetails.payeeBankName;
            this.DataService.payReceiptObj.payeeIfsc = this.payeeDetails.payeeIfsc;
            this.DataService.payReceiptObj.payeeActNo = this.payeeDetails.payeeActNo;
            this.DataService.payReceiptObj.selectedVpa = this.DataService.selectedVpaDetailsPay;
            this.DataService.payReceiptObj.payReceiptTransId = this.npciAndroidService.transactionId;
            // this.DataService.payReceiptObj.debitFrom = ;
            this.goToPage('/payUpiSuccess');
            break;

          default:
            break;
        }
      } else {
        if (response.status == "01") {
          // showToastMessage(response.msg, "error");
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  goToPage(routeName) {
    this.ngZone.run(() => {
      this.router.navigateByUrl('/' + routeName);
    })
    
  }
}
