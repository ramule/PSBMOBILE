import { Location } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { UPIBankAccount } from 'src/app/models/account-detail-model';
import { PendingWithMe } from 'src/app/models/pending-request.model';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { PendingReqService } from '../pending-request/pending-request.service';
import { NpciAndroidService } from '../../../../services/npci-android.service';
import { NpciIosService } from '../../../../services/npci-ios.service';
import { Subject } from 'rxjs';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { pageLoaderService } from 'src/app/services/pageloader.service';

declare var createGlobalNavMore: any;
declare var showToastMessage: any;
declare var cordova;

@Component({
  selector: 'app-pending-request-confirmation',
  templateUrl: './pending-request-confirmation.component.html',
  styleUrls: ['./pending-request-confirmation.component.scss']
})
export class PendingRequestConfirmationComponent implements OnInit,OnDestroy {
  pendingWithMe: PendingWithMe;
  VPADetails :any;
  VPAAccountDetails:any;
  headerdata = {
    'headerType': 'TitleClose',
    'titleName': 'CONFIRMATION',
    'footertype': 'none'
  }
  consentFlag = false;
  constructor(private router: Router, public DataService: DataService, private pendingReqService: PendingReqService, private http: HttpRestApiService, private constant: AppConstants, private localStorage: LocalStorageService, private location: Location, private npciAndroidService: NpciAndroidService, private npciIosService: NpciIosService,private translatePipe : TranslatePipe, private commonMethod: CommonMethods,private loaderService: pageLoaderService,private ngZone : NgZone, private translate : TranslatePipe) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    createGlobalNavMore();
    this.pendingWithMe = this.DataService.pendingWithMe;
    this.DataService.backURLCollectVPAList = this.router.url;
    history.pushState({}, this.DataService.isAcceptClicked ? 'pendingRequestUpi': 'pendingDetailView', this.location.prepareExternalUrl( this.DataService.isAcceptClicked ? 'pendingRequestUpi': 'pendingDetailView'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    let vpaAddressList = JSON.parse(JSON.stringify(this.DataService.vpaAddressList));
    if (this.DataService.upiCollectVpaList.length == 0) {
      this.DataService.upiCollectVpaList = vpaAddressList.map((vpaAddress: any) => {
        vpaAddress.isSelected || vpaAddress.paymentAddress.toLowerCase() == this.pendingWithMe.payerAddress.toLowerCase() ? vpaAddress.isSelected = true : vpaAddress.isSelected = false;
        vpaAddress.accounts.map((account: any) => {
          account.isSelected || account.isDefaultAccount == "Y" ? account.isSelected = true : account.isSelected = false;
          return account;
        })
        return vpaAddress;
      });
    }
    this.getLinkedAccount();
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  acceptReq() {
    /**
     * get cred data from NPCI library
     */
    //  if(Number(this.pendingWithMe.amount) > this.VPAAccountDetails.currentLimit){
    //   this.ngZone.run(()=>{
    //     this.DataService.information = this.translate.transform('CURRENT_LIMIT_EXCEEDED');
    //     this.DataService.informationLabel = this.translate.transform('INFORMATION');
    //     this.DataService.primaryBtnText = this.translate.transform('OK');
    //     this.commonMethod.openPopup('div.popup-bottom.show-common-info');
    //   })
    //   return;
    // }
    if(this.VPAAccountDetails.mbeba == 'N'){
      this.ngZone.run(()=>{
        this.DataService.information = this.translatePipe.transform('UPI_PIN_NOT_SET');
        this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
        this.DataService.primaryBtnText = this.translatePipe.transform('OK');
        this.commonMethod.openPopup('div.popup-bottom.show-common-info');
      })
    } else {
      let accountDetails = this.VPAAccountDetails;
      console.log('ACCEPT accountDetails => ', this.pendingWithMe);
      //check for ifsc
      if(accountDetails.ifsc.includes("PSIB")) {
        this.DataService.preApprovedFlowIdentifier = "collectAccept";
        this.DataService.preApprovedBankName = accountDetails.bankName;
        this.DataService.preApprovedAccNo = accountDetails.maskedAccountNumber;
        this.DataService.preApprovedAmount =  this.pendingWithMe.amount;
        this.DataService.preApprovedPreviousPageUrl = this.router.url;
        this.router.navigateByUrl('/transactionPin');
      } else {
        this.callNpciLibrary(accountDetails);
      }
    }    
  }

  callNpciLibrary(accountData) {
    this.loaderService.showLoader();
    console.log("calling npci library...");
    console.log('accountData', accountData);
    
    if (window.hasOwnProperty('cordova')) {
      var subject = new Subject<any>();
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        console.log("Calling NPCI Android service...");
        this.npciAndroidService.initData();
        this.npciAndroidService.androidStartCLLibrary(accountData, this.constant.val_npci_flow_acceptPendingRequest, subject).subscribe((NPCIResponse) => {
          console.log('Android StartCLLibrary Success => ', NPCIResponse);
          /**
          * set cred data in api
          */
          if (NPCIResponse.hasOwnProperty('status') && NPCIResponse.status == "00") {
            // this.callApiForFlow(flowName, accountData,NPCIResponse);
            var reqParams = this.pendingReqService.setAcceptCollectReq(this.pendingWithMe, NPCIResponse,this.consentFlag);
            this.UpiApiCall(reqParams);
          } else {

          }
        }, err => {
          console.log('Android StartCLLibrary error => ', err);
        });
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        console.log("Calling NPCI iOS service...");
        this.npciIosService.initData();
        this.npciIosService.selectedFlow = this.constant.val_npci_pendingRequest;
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          console.log('transactionId Received => ', transactionId);
          this.npciIosService.txnId = transactionId;
          this.npciIosService.iosStartCLLibrary(accountData, this.constant.val_npci_flow_sendMoney_ios, subject).subscribe((NPCIResponse) => {
            console.log('iOS StartCLLibrary Success => ', NPCIResponse);
            if (NPCIResponse && NPCIResponse.credkey) {
              /**
              * set cred data in api
              */
              var reqParams = this.pendingReqService.setAcceptCollectReq(this.pendingWithMe, NPCIResponse,this.consentFlag);
              this.UpiApiCall(reqParams);
            } else {
              console.log("NPCI flow cancelled...");
            }  
          }, err => {
            console.log('iOS StartCLLibrary error => ', err);
          });
        });
      } else {
        console.log("unknown platform = ", this.DataService.platform);
      }
    } else {
      console.log("Cordova not available... unable to start NPCI Library on web");
    }
  }

  /**
  * Common Api Call for pending request 
  * @param request 
  */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      this.DataService.upiCallTransactionHistoryApi = true;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_ACCEPTNOTIFICATION:
            this.DataService.pendindReqResp = response;
            this.DataService.pendingBlockSuccessURL = 'pendingRequestUpi';
            console.log('upiserviceName_ACCEPTNOTIFICATION ', JSON.stringify(response));
            this.ngZone.run(()=>{
              this.goToPage('pendingSuccess');
            })
            break;
          default:
            break;
        }
      } else {

      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  getLinkedAccount(){
    if(this.DataService.upiCollectVpaList.length > 0){
      this.VPADetails = this.DataService.upiCollectVpaList.find(vpa=> vpa.isSelected == true);
      this.VPAAccountDetails = this.VPADetails.accounts.find(account => account.isSelected ==  true);
      this.DataService.collectAcceptVPADetails = this.VPAAccountDetails;
      this.DataService.collectAcceptVPADetails.paymentAddress = this.VPADetails.paymentAddress;
    }
  }

  
  routePage(url) {
    if(url == 'collectUpiIdList'){
      if(this.DataService.checkIfUPIIdExists(this.pendingWithMe.payerAddress)){
        this.router.navigateByUrl(url);
      }else{
        this.openPopup('pendingReq-NoVPA')
      }
    }else{
      this.router.navigateByUrl(url);
    }
  }


  ngOnDestroy(){
    this.DataService.isAcceptClicked = false;
  }

  viewInvoice() {
    cordova.InAppBrowser.open(this.pendingWithMe.refUrl, '_blank', 'location=no');
  }

  openPopup(popupName){
    this.commonMethod.openPopup('div.popup-bottom.' +popupName);
  }

  closePopup(popupName){
    this.commonMethod.closePopup('div.popup-bottom.' +popupName);
  }
}