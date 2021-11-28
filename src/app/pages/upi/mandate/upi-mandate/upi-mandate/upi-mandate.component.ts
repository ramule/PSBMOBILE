import { Location } from '@angular/common';
import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../../services/data.service';
import { ScanQrService } from '../../../../../services/ScanQr.service';
import { UPIMandateService } from './upi-mandate-service';
import { MandateList, Mandate } from '../../../../../models/mandate-model';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { ScanQrRequestService } from '../../../../upi/scan-qr/scan-qr-code/scan-qr-request.service';
import { PluginService } from 'src/app/services/plugin-service';
import * as moment from 'moment';

declare var mandate: any;
declare var cordova: any;

@Component({
  selector: 'app-upi-mandate',
  templateUrl: './upi-mandate.component.html',
  styleUrls: ['./upi-mandate.component.scss']
})
export class UpiMandateComponent implements OnInit,AfterViewInit {
  createdByMeList: MandateList[] = [];
  acceptedByMeList: MandateList[] = [];
  pendingWithPayerList: MandateList[] = [];
  pendingWithMeList: MandateList[] = [];
  completedList: MandateList[] = [];
  defaultVPAAccountDetails: any;
  scanQrText: any;
  popupData: any = {};
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'MANDATE_IPO',
    'footertype': 'upiDashboardFooter'
  }
  mandateNotificationCount: any;

  constructor(private router: Router,
    public DataService: DataService,
    private location: Location,
    private upiMandateService: UPIMandateService,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private localStorage: LocalStorageService,
    private commonMethod: CommonMethods,
    private scanQrService: ScanQrService,
    private translate: TranslatePipe,
    private pluginService: PluginService,
    public scanQrRequestService: ScanQrRequestService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'upiDashboard', this.location.prepareExternalUrl("upiDashboard"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.defaultVPAAccountDetails = this.getDefaultVpaAccountDetails();
    this.updateIcons();
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.getMyMandateList();
    })
  }

  updateIcons() {
    this.DataService.updateIconsObservable.subscribe((notificationCountObj: any) => {
      if (notificationCountObj) {
        this.mandateNotificationCount = parseInt(notificationCountObj.mandateNotificationCount);
      }
      console.log("this.mandateNotificationCount = ", this.mandateNotificationCount);
    });
  }

  /**
   * get All MandateList
   */
  getMyMandateList() {
    var req = this.upiMandateService.getMyMandateListReq();
    this.UpiApiCall(req);
  }

  validateQrSign() {
    var req = this.scanQrRequestService.setValidateQrSignRequest(this.scanQrText);
    this.UpiApiCall(req);
  }

  /**
   * Common Api Call for collect 
   * @param request 
   */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      console.log("Response getMandateTxnDetails =>", JSON.stringify(response));
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_GETMANDATETXNDETAIL:
            this.filterRecords(response);
            break;
          case this.constant.upiserviceName_VALIDATEMANDATE:
            this.ngZone.run(() => {
              this.DataService.acceptedMandate = new Mandate().deserialize(response.responseParameter.MANDATE_DETAILS)
              this.goToPage('upiMandateRevokeViewDetails');
            })
            break;
          case this.constant.upiserviceName_VALIDATEADDRESS:
            this.DataService.validateAddressResp = response.responseParameter;
            // this.validateQrSign();
            // this.DataService.selectedFlow = this.constant.val_npci_scanQrPay;
            this.ngZone.run(() => {
              if(this.DataService.ScanQrCodeData.qrType == 'collect'){
                this.pluginService.getTransactionId().subscribe((transactionID) => {
                var req = this.scanQrRequestService.setValidateMandateRequest(transactionID);
                this.UpiApiCall(req); 
                });
              }
              else if (this.DataService.ScanQrCodeData.qrType == 'mandate') {
                this.DataService.createMandateObj.frequency = this.DataService.ScanQrCodeData.recur
                this.DataService.createMandateObj.startDate = this.commonMethod.convertNumToDate(this.DataService.ScanQrCodeData.validitystart);
                this.DataService.createMandateObj.endDate = this.commonMethod.convertNumToDate(this.DataService.ScanQrCodeData.validityend)
                this.DataService.createMandateObj.amount = this.DataService.ScanQrCodeData.am
                this.DataService.createMandateObj.validatedVpaAdress = this.DataService.ScanQrCodeData.pa;
                this.goToPage('/createMandatePayment');
              }
            })

            
            break;
          case this.constant.upiserviceName_VALIDATEQRSIGNATURE:
            // this.DataService.selectedFlow = this.constant.val_npci_scanQrPay;
            this.ngZone.run(() => {
              this.goToPage('/createMandatePayment');
            })
            break;
          default:
            console.log("default ", response.subActionId);
            break;
        }
      } else {
        switch (response.subActionId) {
          case this.constant.upiserviceName_VALIDATEADDRESS:
            this.showPopup("inValidQrCode", "");
            break;
          case this.constant.upiserviceName_VALIDATEQRSIGNATURE:
            this.showPopup("insecure-qrcode", "");
            break;
          default:
            break;
        }
      }
    }, error => {
      this.showPopup("inValidQrCode", "");
      console.log("ERROR!", error);
    });
  }

  filterRecords(response) {
    this.DataService.pendingWithMeMandateList = [];
    let mandateList: MandateList[] = new MandateList().deserialize(response.responseParameter.transactions).MandateList;
    mandateList.map((mandate: any) => {
      // mandate.initiatedBy = mandate.initiatedBy == 'PAYER' && mandate.mobileNo == this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo)) ? 'PAYER' : 'PAYEE';
      mandate.createdTime = moment(mandate.createdTime).format('DD/MM/yyyy hh:mm A');
       if (mandate.status == 'PENDING' && mandate.createdBy == 'CREATED_BY_ME') {
        mandate.requestExpireTime = moment(mandate.requestExpireTime).format('DD/MM/yyyy, hh:mm A');
        this.pendingWithPayerList.push(mandate);
      } else if (mandate.status == 'COMPLETED' || mandate.status == 'REJECTED' || mandate.status == 'EXPIRED' || mandate.status == 'REVOKED' || mandate.status == 'FAILED') {
        this.completedList.push(mandate)
      } else if (mandate.status == 'CREATED' && mandate.createdBy == 'CREATED_BY_ME') {
        this.createdByMeList.push(mandate)
      } else if (mandate.status == 'CREATED' && mandate.createdBy == 'CREATED_BY_OTHERS') {
        this.acceptedByMeList.push(mandate)
      } else if (mandate.status == 'PAUSED' && mandate.createdBy == 'CREATED_BY_ME') {
        this.createdByMeList.push(mandate)
      }else if (mandate.status == 'PAUSED' && mandate.createdBy == 'CREATED_BY_OTHERS') {
        this.acceptedByMeList.push(mandate)
      }
    })
  }
  validateVpa() {
    this.pluginService.getTransactionId().subscribe((transactionID) => {
      // this.scanQrRequestService.getUserLocation();
      var req = this.scanQrRequestService.setValidateVpaRequest(this.DataService.ScanQrCodeData, this.defaultVPAAccountDetails, transactionID);
      this.UpiApiCall(req);
    });
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
   * Get Default Vpa AccountNo Details
   * @param array 
   */
  getDefaultAccountNoByVpa(array) {
    if (array.length > 0) {
      return array.find((account) => { return account.isDefaultAccount == "Y" });
    }
  }

  scanMandate() {
    if (this.defaultVPAAccountDetails) {
      var self = this;
      if (self.DataService.platform.toLowerCase() == this.constant.val_android) {
        cordova.plugins.diagnostic.requestCameraAuthorization((status) => {
          switch (status) {
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
              cordova.plugins.QRCodeScannerPlugin.scan({ invalidQRMsg: self.translate.transform(self.constant.QRCodeErrorDesc), pointQRMsg: self.translate.transform(self.constant.QRCodeDesc), scanGalleryMsg: self.translate.transform(this.constant.ScanGalleryDesc), recentPayees: ''}, (QRDetals) => {
                console.log('QRDetals Success => ', QRDetals);
                self.scanQrText = JSON.parse(QRDetals.text);
                let scanQrResponse = self.scanQrText.response
                
                let qrScanResult = self.scanQrService.getQrResponse(scanQrResponse);
                if (!qrScanResult) {
                  self.showPopup("inValidQrCode", "");
                } else {
                  self.DataService.ScanQrCodeData = qrScanResult;
                  console.log("DataService.ScanQrCodeData", self.DataService.ScanQrCodeData);
                
                  if (self.DataService.ScanQrCodeData.sign) {
                    if (qrScanResult.qrPaymentAddress || qrScanResult.pa) {
                      self.validateVpa();
                      
                    } else {
                      self.showPopup("inValidQrCode", "");
                    }
                  } else {
                    self.showPopup("insecure-qrcode", "");
                  }
                }
              }, (e) => {
                console.log("QRDetals Error => ", e)
              });
              break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
              this.showPopup('enable-camera-permissions');
              return;
            default:
              break;
          }
        }, function (error) {
          console.error(error);
        });
      } else if (self.DataService.platform.toLowerCase() == this.constant.val_ios) {
        window['plugins'].qrscan.startCamera((data) => {
          console.log('qrscan success', data);
          console.log("Other data => ", JSON.stringify({ invalidQRMsg: this.translate.transform(this.constant.QRCodeErrorDesc), pointQRMsg: this.translate.transform(this.constant.QRCodeDesc), scanGalleryMsg: this.translate.transform(this.constant.ScanGalleryDesc), recentPayees: '' }));
          if (data != "Cancelled") {
            //success handler
            if (data) {
              if (data == "DENIED" || data == "Not Authorized") {
            //show popup to user to go to settings
            this.DataService.cameraPermissionGrantedIos = false;
            this.commonMethod.openPopup('div.popup-bottom.enable-camera-permission');
            } else {
              this.scanQrText = data;
              let qrScanResult = self.scanQrService.getQrResponse(this.scanQrText);
              if (!qrScanResult) {
                self.showPopup("inValidQrCode", "");
              } else {
                self.DataService.ScanQrCodeData = qrScanResult;
                console.log("DataService.ScanQrCodeData", self.DataService.ScanQrCodeData);
              
                if (self.DataService.ScanQrCodeData.sign) {
                  if (qrScanResult.qrPaymentAddress || qrScanResult.pa) {
                    self.validateVpa();
                    
                  } else {
                    self.showPopup("inValidQrCode", "");
                  }
                } else {
                  self.showPopup("insecure-qrcode", "");
                }
              }
            }
            }
          } else {
            //failure handler
          }
        }, (error) => {
          console.log('qrscan error ', error);
        })
      } else {
        console.log("Unknown platform");
      }
    } else {
      this.showPopup("noAccountLinkAlert", "");
    }

  }

  grant() {
    cordova.plugins.diagnostic.switchToSettings(function () {
      console.log("Successfully switched to Settings app");
    }, function (error) {
      console.error("The following error occurred: " + error);
    });
  }

  routePage(type, mandate: Mandate) {
    if (type == 'acceptedMandate') {
      this.DataService.acceptedMandate = mandate;
      this.goToPage('upiMandateRevokeViewDetails');
    } else if (type == 'pendingMandate') {
      this.DataService.pendingMandateWithPayer = mandate;
      this.goToPage('upiMandatePendingDetails')
    } else if (type == 'createdMandate') {
      this.DataService.createdMandate = mandate;
      this.goToPage('upiMandateActiveDetails');
    } else if (type == 'completedMandate') {
      this.DataService.completedMandate = mandate;
      this.goToPage('upiMandateCompletedDetails');
    }

  }

  goToPage(routeName) {
    if(routeName == 'mandateHistory'){
      this.DataService.umn = null;
    }
    this.DataService.routeWithNgZone(routeName);
  }
}
