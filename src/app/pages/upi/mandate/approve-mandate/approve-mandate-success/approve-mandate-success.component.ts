import { Location } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { AddBenificiary } from 'src/app/models/add-benificiary-model';
import { Mandate } from 'src/app/models/mandate-model';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../../services/data.service';
import { BenificiaryService } from '../../../benificiary/benificiary.service';
import { PluginService } from 'src/app/services/plugin-service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { MyProfileService } from '../../../profile/my-profile/my-profile.service';
import * as moment from 'moment';

@Component({
  selector: 'app-approve-mandate-success',
  templateUrl: './approve-mandate-success.component.html',
  styleUrls: ['./approve-mandate-success.component.scss']
})
export class ApproveMandateSuccessComponent implements OnInit {

  headerdata = {
    'headerType': 'none',
    // 'headerType': 'upiSuccessHeader',
    'titleName': '',
    'footertype': 'none'
  }

  approveMandateResp: any;
  approveMandateDetail: Mandate;
  frequency: any;
  debitDay: any;
  isFavorite = false;
  information = "";
  generateQR: any;
  favPayeeList:any;
  benficiaryListData:any;
  activeTabName: string = "VPA";

  constructor(public DataService: DataService,
    private pluginService: PluginService,
    private pageLoaderService: pageLoaderService,
    private location: Location, 
    private router: Router, 
    public constant: AppConstants, 
    private commonMethod: CommonMethods, 
    private http: HttpRestApiService, 
    private localStorage: LocalStorageService, 
    private benificiaryService: BenificiaryService, 
    private ngZone: NgZone, 
    private translatePipe: TranslatePipe,
    private myprofileservice: MyProfileService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    this.DataService.fetchUPIbenificiaryLists = true;
    history.pushState({}, 'approveMandate', this.location.prepareExternalUrl("approveMandate"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.approveMandateResp = this.DataService.approveMandateResp;
    this.approveMandateDetail = this.DataService.approveMandateDetail;
    this.approveMandateResp.responseParameter.txnDateTime = moment(this.approveMandateResp.responseParameter.txnDateTime).format('DD MMM yyyy, hh:mm:ss a');
    this.approveMandateResp.responseParameter.validityStart = moment(this.approveMandateResp.responseParameter.validityStart).format('DD/MM/yyyy');
    this.approveMandateResp.responseParameter.validityEnd = moment(this.approveMandateResp.responseParameter.validityEnd).format('DD/MM/yyyy');
    this.frequency = this.approveMandateDetail.frequency;
    // this.debitDay = this.commonMethod.filterValue(this.constant.debitDayList,'value',this.approveMandateDetail.debitDay).debitName;
    this.getBenificiaryRequest()
  }


  /**
 * Get Recent Collect Request List
 */
   getBenificiaryRequest() {
    this.benificiaryService.getUserLocation();
    var reqParams = this.benificiaryService.getBenficiaryListReq(this.constant.val_upi_benListType_ALL, this.constant.val_upi_ANY);
    this.UpiApiCall(reqParams);
  }

  getFavoritePayee() {
    if (this.DataService.favPayeeList.length > 0) {
      this.isFavorite = this.DataService.isFavoritePayee(this.approveMandateResp.responseParameter.payeeAddr);
    }
  }


  /**
   * Share Receipt via available methods in device
   */
  shareReceipt() {
    if (this.DataService.isCordovaAvailable) {
      var filename = "approveMandate_" + Date.now();
      let section = document.querySelector('#approveMandate');
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
 * Dynamic QR Code Generation
 * @param vpaDetails 
 */
  generateQRCode(download?: boolean, share?: boolean) {
    if (this.DataService.isCordovaAvailable) {
      let amt = this.DataService.roundOffAmount(this.approveMandateResp.responseParameter.amount);
      //TODO : generate signature api needed form MW Team fo sign
      // let encodeText = encodeURI(`upi://collect?umn=${this.createMandateResp.responseParameter.umn}&am=${amt}&tn=${this.createMandatePayment.remarks}&validitystart=${this.createMandatePayment.validityStartDate.replace(/\\|\//g,'')}&validityend=${this.createMandatePayment.validityEndDate.replace(/\\|\//g,'')}&amrule=EXACT&pa=${this.createMandatePayment.toPayee}&orgid=159992&mode=13&purpose=00`)
      let encodeText = this.commonMethod.getCollectMandateScanQRString({ umn: this.approveMandateResp.responseParameter.umn, amt: amt, remarks: this.approveMandateResp.responseParameter.txnNote, validityStartDate: this.approveMandateResp.responseParameter.validityStart, validityEndDate: this.approveMandateResp.responseParameter.validityEnd, toPayee: this.approveMandateResp.responseParameter.payeeAddr, recur: this.frequency });
      this.myprofileservice.getUserLocation();
      var reqParams = this.myprofileservice.getGenSigParam(encodeText);
      
      this.http.callBankingAPIService(reqParams, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
        console.log('success', data);
        let profileResponseData = data.responseParameter.upiResponse;
        if (data.responseParameter.opstatus == "00" && profileResponseData.status == "00") {
          //success handler
          console.log('profileResponseData => ', profileResponseData);
          switch (profileResponseData.subActionId) {
            case this.constant.upiserviceName_GENERATEQRSIGNATURE:
              let qrSignature = profileResponseData.responseParameter.RESULT;
              let qrCodeText = this.commonMethod.getCollectMandateScanQRString({ umn: this.approveMandateResp.responseParameter.umn, amt: amt, remarks: this.approveMandateResp.responseParameter.txnNote, validityStartDate: this.approveMandateResp.responseParameter.validityStart, validityEndDate: this.approveMandateResp.responseParameter.validityEnd, toPayee: this.approveMandateResp.responseParameter.payeeAddr, recur: this.frequency, signature: qrSignature });
              this.pluginService.generateQRCode('TEXT_TYPE', qrCodeText, this.constant.QRErrorCorrectLevel.L).then((base64EncodedQRImage) => {
                // setTimeout(() => {
                //   if (download) {
                //     this.QRDownload(base64EncodedQRImage);
                //   } else if (share) {
                //     this.shareQRCode(base64EncodedQRImage);
                //   } else {
                      this.generateQR = base64EncodedQRImage;
                      this.commonMethod.openPopup('div.popup-bottom.show-qr-code');
                //     }
                // })
              }, (error) => {
                console.error('Error generating qr code ', error);
              })
              break;
          }
        }
      }, error => {
        console.log("ERROR!", error);
      });
      // this.pluginService.generateQRCode('TEXT_TYPE', encodeText, this.constant.QRErrorCorrectLevel.L).then((base64EncodedQRImage) => {
      //   if (download) {
      //     this.QRDownload(base64EncodedQRImage);
      //   } else if (share) {
      //     this.shareQRCode(base64EncodedQRImage);
      //   }
      //   else {
      //     this.generateQR = base64EncodedQRImage;
      //     this.commonMethod.openPopup('div.popup-bottom.show-qr-code');
      //   }
      // }, (error) => {
      //   console.error('Error generating qr code ', error);
      // })
    }
  }


  gotoBack() {
    this.location.back();
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
      var filename = "approveMandate_" + Date.now() + '.png';
      let section = document.querySelector('#approveMandate');

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
 * Download QR Code
 * @param base64Image 
 */
  QRDownload() {
    // var filename = "qrCode" + "_" + Date.now() + '.png';
    //   this.pageLoaderService.hideLoader();
    //   //this.showCommonToastMsgWithKey("QR_DOWNLOADED_SUCCESSFULLY", 'success');
    //   var block = base64Image.split(";");
    //   var dataType = block[0].split(":")[1];// In this case "image/png"
    //   var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."
    //   //this.commonMethod.savebase64AsImageFile(filename, realData, dataType);
    //   this.commonMethod.closePopup('div.popup-bottom.show-qr-code');
    //   var msgKey = this.translate.transform("QR_DOWNLOADED_SUCCESSFULLY");
    //   this.commonMethod.savebase64AsImageFile(filename, realData, dataType,msgKey,'success');

    // First we get our section to save from dom
    let section = document.querySelector('#QRContainer');
    var filename = "qrCode" + "_" + Date.now() + '.png';
    // We pass that section to html2Canvas
    console.log(section);
    this.commonMethod.convertHtmlToImage(section).subscribe((base64Image) => {
      this.pageLoaderService.hideLoader();
      //this.showCommonToastMsgWithKey("QR_DOWNLOADED_SUCCESSFULLY", 'success'); 
      var block = base64Image.split(";");
      var dataType = block[0].split(":")[1];// In this case "image/png"
      var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."
      this.commonMethod.closePopup('div.popup-bottom.show-qr-code');
      var msgKey = this.translatePipe.transform("QR_DOWNLOADED_SUCCESSFULLY");
      this.commonMethod.savebase64AsImageFile(filename, realData, dataType, msgKey, 'success');
    });
  }

  /**
   * Share QR Code 
   * @param base64Image 
   */
  shareQRCode() {
    if (this.DataService.isCordovaAvailable) {
      // First we get our section to save from dom
      let section = document.querySelector('#QRContainer');
      var filename = "qrCode" + "_" + Date.now();
      // We pass that section to html2Canvas
      console.log(section);
      this.commonMethod.convertHtmlToImage(section).subscribe((base64Image) => {
        this.pageLoaderService.hideLoader();
        //this.showCommonToastMsgWithKey("QR_DOWNLOADED_SUCCESSFULLY", 'success'); 
        // var block = base64Image.split(";");
        // var dataType = block[0].split(":")[1];// In this case "image/png"
        // var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."
        // this.commonMethod.closePopup('div.popup-bottom.show-qr-code');
        // var msgKey = this.translatePipe.transform("QR_DOWNLOADED_SUCCESSFULLY");
        this.commonMethod.shareImage(filename, base64Image);
      });
      // this.loaderService.hideLoader();
      // var filename = "QRCode_" + Date.now() + '.png';
      // this.commonMethod.shareImage(filename, base64Image);
    }
  }


  /**
   * Api call for adding payee as favorite payee
   */
  addPayeeToFavorite() {
    this.closePopup('fav-popup')
    this.DataService.validateAddressResp = {};
    let mandateDetails = this.approveMandateResp;
    this.isFavorite = !this.isFavorite;
    let favorite = this.isFavorite ? 'Y' : 'N';
    this.DataService.validateAddressResp.validatedVpa = this.approveMandateDetail.payeeAddress
    let addBenificiary: AddBenificiary = new AddBenificiary().deserialize({ isFavourite: favorite, payeeName: this.approveMandateDetail.payeeName, nickName: this.approveMandateDetail.payeeName, payeeVPA: this.approveMandateDetail.payeeAddress });
    var reqParams = this.benificiaryService.setAddBenificiaryRequest(addBenificiary, false, true, false);
    this.UpiApiCall(reqParams);
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
            this.DataService.fetchUPIbenificiaryLists = true

            if (response.msg) {
              this.information = response.msg;
              this.commonMethod.openPopup('div.popup-bottom.show-fav-info');
            }
            break;
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
          default:
            break;
        }
      } else {
        this.ngZone.run(() => {
          this.DataService.errorMsg = response.msg;
          this.DataService.informationLabel = this.translatePipe.transform('ERROR');
          this.DataService.primaryBtnText = this.translatePipe.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.show-common-error')
        })
        // showToastMessage(data.msg, "error");
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  close() {
    this.location.back();
  }

  navigate(routeURL) {
    this.router.navigateByUrl(routeURL);
  }


  openPopup(popup) {
    this.commonMethod.openPopup('div.popup-bottom.' + popup)
  }


  closePopup(popup) {
    this.commonMethod.closePopup('div.popup-bottom.' + popup)
  }
}
