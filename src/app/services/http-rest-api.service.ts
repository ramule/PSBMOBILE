import { Injectable, Injector, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from, Subject } from 'rxjs';
import { map, catchError, tap, timeout } from 'rxjs/operators';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { CommonMethods } from '../utilities/common-methods';
import { AppConstants } from '../app.constant';
import { LocalStorageService } from './local-storage-service.service';
import { IRequest, IStatus } from '../utilities/app-interface';
import { pageLoaderService } from './pageloader.service';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { PluginService } from './plugin-service';
import { forkJoin } from 'rxjs';
import { TranslatePipe } from '../pipes/translate.pipe';

declare var showToastMessage: any;
declare var networkinterface: any;
declare var $: any;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpRestApiService {
  contactSync = false;
  notificationSync = false;
  showErrorPopup = false;
  STATUS: IStatus;
  constructor(
    private http: HttpClient,
    private encryptDecryptService: EncryptDecryptService,
    private commonMethod: CommonMethods,
    private constants: AppConstants,
    private storage: LocalStorageService,
    private loader: pageLoaderService,
    private router: Router,
    public dataService: DataService,
    private plugin: PluginService,
    private ngZone: NgZone,
    private injector: Injector,
  ) { this.STATUS = this.constants.Status }

  /**
   * This function is invoked whenever api call is made
   * @param endpoint
   * @param request
   */
  apiCall(endpoint: string, request: any): Promise<any> {
    if ((endpoint != this.constants.upiserviceName_CHECKSIMBINDINGSTATUS
      && endpoint != this.constants.serviceName_TRANSACTIONHISTORY
      && endpoint != this.constants.serviceName_GETCARDSLIST
      && endpoint != this.constants.serviceName_FREQUENTTRANS
      && endpoint != this.constants.serviceName_GETOFFERS
      && endpoint != this.constants.serviceName_CUSTOMIZEMENU
      && endpoint != this.constants.serviceName_AUTOLINKACCOUNTS
      ) && this.notificationSync == false) this.loader.showLoader();
    if (endpoint == this.constants.serviceName_GETACTIVITYSETTINGDATA) this.loader.hideLoader();

    console.log(JSON.stringify(request));
    /**** request Param ***/
    var timeOut = endpoint == this.constants.upiserviceName_CHECKSIMBINDINGSTATUS ? 30000 : 200000;
    var url = this.constants.publicURL.serviceURL;
    // if(endpoint == this.constants.upiserviceName_CHECKSIMBINDINGSTATUS ){
    //     url = "https://psbomnigateway.onlinepsb.co.in/PNSMiddleware/rest/";
    // }else{
    //     url = this.constants.publicURL.serviceURL;
    // }

    //url = this.constants.publicURL.serviceURL;
    return this.http.post(`${url}${endpoint}`, JSON.stringify(request), httpOptions).pipe(
      timeout(timeOut),
      catchError(this.handleError<any>(endpoint))
    ).toPromise()
      .then((response) => {
        return new Promise((resolve, reject) => {
          if (this.dataService.isCordovaAvailable) {
            resolve(response);
            // window['plugins'].sslCertificateChecker.check((message) => {
            //   console.log('sslCertificateChecker message = ', message);
            //   if (message == "CONNECTION_SECURE") {
            //     resolve(response);
            //   }
            // }, (message) => {
            //   if (message === "CONNECTION_NOT_SECURE") {
            //     reject(response);
            //   } else if (message.indexOf("CONNECTION_FAILED") > - 1) {
            //   }
            // },
            //   this.constants.publicURL.serviceURL,
            //   this.constants.val_fingerPrint);
          } else {
            resolve(response);
          }
        });
      });
  }


  /**
   * This is the main function which is invoked for api call's
   * @param request
   * @param deviceId
   * @param endpoint  
   */
  callBankingAPIService(request, deviceId, endpoint, upiFlag?: boolean, extraParams?: any): Observable<any> {
    console.log('extra params: ', extraParams);
    let connectionStatus = navigator.onLine ? 'online' : 'offline';
    this.contactSync = extraParams?.contactSync;  
    this.notificationSync = extraParams?.notificationSync ? extraParams.notificationSync : false;
    this.showErrorPopup = extraParams?.hasOwnProperty('showErrorPopup') ? extraParams.showErrorPopup : true;
    console.log('extra params: ', this.showErrorPopup);
    //if(endpoint == this.constants.serviceName_GetPaymentAddressListDetails) deviceId = 9;
    var self = this;
    var subject = new Subject<any>();
    const requestObj: IRequest = <IRequest>{
      sourceIp: this.dataService.ipAddress,
      prefered_Language: this.storage.hasKeyLocalStorage(this.constants.storage_language) ? this.storage.getLocalStorage(this.constants.storage_language) : this.constants.val_default_lang,
      entityId: upiFlag && !this.dataService.omniUPIFlow ? this.constants.getEntityId(this.constants.val_entityId_UMOB) : this.constants.getEntityId(),
      deviceId: deviceId,
      map: request
      // map: this.encryptDecryptService.decryptText(this.constants.languageKey, request)
    };
    console.log('HTTPSERVICE => requestObj==== ', JSON.stringify(requestObj));
    if (connectionStatus == 'online') {
      if (this.dataService.isCordovaAvailable) {
        if (this.dataService.platform.toLowerCase() == this.constants.val_android) {
          networkinterface.getHttpProxyInformation(this.constants.publicURL.serviceURL, (onSuccess) => {
            console.log("On NetworkInterface Success", onSuccess);
            this.apiCall(endpoint, requestObj).then((response) => {
              console.log('response', JSON.stringify(response));
              if (response != undefined) {
                var decryptKey = "";

                switch (response.secType) {
                  case "M":
                    decryptKey = self.constants.staticKey;
                    break;

                  case "S":
                    decryptKey = self.storage.getLocalStorage(self.constants.storage_mobileNo) + self.constants.mapEncryptKey;
                    break;

                  case "D":
                    decryptKey = self.storage.getSessionStorage(self.constants.val_sessionKey);
                    // decryptKey = "19816465728282";
                    break;

                  default:
                    decryptKey = "";
                    break;
                }

                var decryptedData = decryptKey == "" ? response : self.encryptDecryptService.decryptText(decryptKey, self.commonMethod.removeLineBreaksFromBase64(response.data));
                if (decryptKey != "") {
                  var responseData = JSON.parse(decryptedData);
                  for (var key in responseData) {
                    response[key] = responseData[key];
                  }
                }
                if (response.responseParameter.hasOwnProperty('upiResponse')) {
                  response.responseParameter.upiResponse = JSON.parse(response.responseParameter.upiResponse);
                  let upiResponse = response.responseParameter.upiResponse;
                  // Show popup with message

                  if (upiResponse.subActionId != this.constants.upiserviceName_GETPAYMENTADDRESSLISTDETAILS && upiResponse.subActionId != this.constants.upiserviceName_GETPAYMENTADDRESSLIST && upiResponse.subActionId != this.constants.upiserviceName_GETBENIFICIARYLIST && upiResponse.subActionId != this.constants.upiserviceName_PENDINGREQUESTS && upiResponse.subActionId != this.constants.upiserviceName_VALIDATEMIGRATEDUSERDETAIL && upiResponse.subActionId != this.constants.upiserviceName_GETMANDATETXNDETAIL && upiResponse.subActionId != this.constants.upiserviceName_GETCOMPLAINTSFORMOBILE && upiResponse.subActionId != this.constants.upiserviceName_GETBLOCKNOTIFICATIONLIST && upiResponse.subActionId != this.constants.upiserviceName_UPIFORGOTMPINVALIDATEOTP && upiResponse.subActionId != this.constants.upiserviceName_GETAPPNOTIFICATION && upiResponse.subActionId != this.constants.upiserviceName_GETFORGOTMPINDEFAULTACCOUNT && upiResponse.subActionId != this.constants.upiserviceName_VALIDATEFORGOTMPINDETAILS && upiResponse.subActionId != this.constants.upiserviceName_VALIDATEQRSIGNATURE && upiResponse.subActionId != this.constants.upiserviceName_GETNOTIFICATIONCOUNT && upiResponse.subActionId != this.constants.upiserviceName_TransactionHistory && endpoint != this.constants.serviceName_VERIFYUPIPAYMENTADDRESS && endpoint != this.constants.serviceName_DEBITCARDPINCHANGE && endpoint != this.constants.serviceName_BENIFICIARYLIST ) {
                    if (upiResponse.status == '01') {
                      //if(this.dataService.errorMsg == upiResponse.msg) return;
                      if (endpoint != this.constants.upiserviceName_CHECKSIMBINDINGSTATUS && !(upiResponse.subActionId == this.constants.upiserviceName_FUNDSTRANSFER && ((this.dataService.previousPageUrl == 'payUpiPayment' || this.dataService.previousPageUrl == 'payUpiConfirm' || this.dataService.previousPageUrl == 'selfTransferPayment' || this.dataService.previousPageUrl == 'scanQRPayment' || this.dataService.previousPageUrl == 'scanQrConfirm') ||
                        (this.dataService.currentPageUrl == 'transactionPin' || this.dataService.currentPageUrl == 'payUpiConfirm' || this.dataService.previousPageUrl == 'scanQrConfirm')))) {
                        this.ngZone.run(() => {
                          this.dataService.errorMsg = upiResponse.msg;
                          this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('ERROR');
                          this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                          this.commonMethod.openPopup('div.popup-bottom.show-common-error')
                        })
                      }
                    }
                  }
                  else if (upiResponse.status == '03' && endpoint != this.constants.upiserviceName_VALIDATEMIGRATEDUSERDETAIL && endpoint != this.constants.upiserviceName_GETBENIFICIARYLIST) {
                    //popup-active
                    //if(this.dataService.information == upiResponse.msg ) return;
                    this.ngZone.run(() => {
                      this.dataService.information = upiResponse.msg;
                      this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                      this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                      this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                    })
                  } else if (upiResponse.status == '83' && endpoint != this.constants.upiserviceName_GETBENIFICIARYLIST) {
                    //popup-active
                    //if(this.dataService.information == upiResponse.msg ) return;
                    this.ngZone.run(() => {
                      this.dataService.information = upiResponse.msg;
                      this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                      this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                      this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                    })
                  } else if (upiResponse.status == '01' && upiResponse.hasOwnProperty('responseParameter')) {
                    if (upiResponse.responseParameter.hasOwnProperty('responseCode')) {
                      if (upiResponse.responseParameter.responseCode == "U66" || upiResponse.responseParameter.msg.includes("U66")) {
                        //clear token
                        this.storage.setLocalStorage('NpciToken', '');
                        this.storage.setLocalStorage('NpciTokenExpiry', '');
                      }
                    }
                  }
                }
                delete response['data'];
                console.log(endpoint + " response--->" + JSON.stringify(response));
                if (response.hasOwnProperty('responseParameter')) {
                  this.ngZone.run(() => {
                    if (response.responseParameter.hasOwnProperty('opstatus')) {
                      if (response.subActionId != "TRANSFERTRANSACTION" && endpoint != this.constants.serviceNmae_GETFAVORITETRANSACTIONS && endpoint != this.constants.serviceName_Login && response.subActionId != "BALANCEINQUIRY" && response.subActionId != "MINISTATEMENT" && endpoint != this.constants.serviceName_LOANMINISTATEMENT && endpoint != this.constants.serviceName_GetPaymentAddressListDetails && endpoint != this.constants.serviceName_GetAccountList && endpoint != this.constants.serviceName_CHECKOMNIUSERNAME && endpoint != this.constants.serviceNmae_GETFAVORITETRANSACTIONS  && endpoint != this.constants.serviceName_CHANGECARDSTATE && endpoint != this.constants.serviceName_JOINTACCOUNTHOLDERDETAILS && endpoint != this.constants.serviceName_ACCOUNTNAME && endpoint != this.constants.serviceName_PAYERTOPAYEEUSINGIFSCACCOUNTNUMBER && endpoint !=  this.constants.serviceName_SCHEDULARTLIST && endpoint != this.constants.serviceName_VALIDATEOTP && endpoint != this.constants.serviceName_CARDDETAILSBYACCOUNTNO && endpoint != this.constants.serviceName_GETIMPSSUCCESSTRANSACTION && endpoint != this.constants.serviceName_GETCARDTYPELIST && endpoint != this.constants.serviceName_LOANCREDITS && endpoint != this.constants.serviceName_VERIFYUPIPAYMENTADDRESS && endpoint != this.constants.serviceName_DEBITCARDISSUE && endpoint != this.constants.serivceName_AAADHARCVALIDATION && endpoint != this.constants.serviceName_VALIDATEBANKTOKEN && endpoint != this.constants.serviceName_LienEnquiry && endpoint != this.constants.serviceName_STANDINGINSTRUCTIONCHECKDETAILS && endpoint != this.constants.serviceName_MOBILELIST && endpoint != this.constants.serviceName_DEBITCARDPINCHANGE && endpoint != this.constants.serviceName_BENIFICIARYLIST && endpoint != this.constants.serviceName_CARDSERVICEONOFF && endpoint != this.constants.serviceName_CIFACCOUNTMOBILECHECK && endpoint != this.constants.serviceName_ACCOUNTINQUIRY) {
                        if (response.responseParameter.opstatus == "01" && this.showErrorPopup) {
                          if (this.contactSync) {
                            this.dataService.isContactsSyncEnabled = false;
                            this.storage.setLocalStorage('isContactSynced', "N")
                            this.dataService.mobileContacts = this.dataService.mobileContactsClone;
                            this.dataService.upiContactsList = this.commonMethod.getAscendingContactList(this.dataService.mobileContacts);
                          }
                          if (response.responseParameter.hasOwnProperty("Result") && response.responseParameter.Result && response.responseParameter.Result != "" && response.responseParameter.Result != null) {
                            if (response.subActionId != this.constants.upicheck_CHECKSIMBINDINGSTATUS) {
                              this.ngZone.run(() => {
                                this.dataService.information = response.responseParameter.Result;
                                this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                                this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                                this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                              })
                            }
                          }
                          else {
                            // this.dataService.information = 'There is some difficulty in processing the request. Please try again later.';
                            this.ngZone.run(() => {
                              this.dataService.information = this.injector.get(TranslatePipe).transform('PLEASE_TRY_AGAIN_LATER');
                              this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                              this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                              // if (endpoint != this.constants.upicheck_CHECKSIMBINDINGSTATUS) this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                              if (endpoint != this.constants.upiserviceName_CHECKSIMBINDINGSTATUS) this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                            })


                          }

                        }
                        else if ((response.responseParameter.opstatus == "03" || response.responseParameter.opstatus == "04" || response.responseParameter.opstatus == "05") && endpoint != this.constants.upiserviceName_UPIFORGOTMPINVALIDATEOTP) {
                          this.ngZone.run(() => {
                            if (this.contactSync) {
                              this.dataService.isContactsSyncEnabled = false;
                              this.storage.setLocalStorage('isContactSynced', "N")
                              this.dataService.mobileContacts = this.dataService.mobileContactsClone;
                              this.dataService.upiContactsList = this.commonMethod.getAscendingContactList(this.dataService.mobileContacts);
                            }
                            this.dataService.information = response.responseParameter.Result;
                            this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                            this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                            this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                          })
                        }
                        else if (response.responseParameter.opstatus == "19") {
                          this.dataService.information = response.responseParameter.Result;
                          this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                          this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                          this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                        }
                      }
                      if (response.responseParameter.opstatus == self.constants.InvalidSessionCode) {
                        showToastMessage(response.responseParameter.Result);
                        console.log("this.router.url", this.router.url);
                        if (this.constants.getPlatform() == "web") {
                          this.dataService.timeoutHeader = "Timed out!"
                          this.dataService.timeoutMsg = "You were idle for too long, please Login again"
                          self.router.navigateByUrl('/temporaryServiceOut');
                          
                        }
                        else if (self.dataService.isUPILoginFlow) {
                          self.router.navigateByUrl('/upiLogin');
                        }
                        else {
                          self.router.navigateByUrl('/loginMobile');
                        }
                      }
                    }
                  })
                }
                if (response) {
                  subject.next(response);
                  subject.complete();
                } else {
                  subject.complete();
                  // subject.unsubscribe();
                }
              }
              if (endpoint != self.constants.upiserviceName_CHECKSIMBINDINGSTATUS) self.loader.hideLoader();
            }, (error) => {
              if (endpoint == this.constants.upiserviceName_CHECKSIMBINDINGSTATUS) {
                $('#sendsmsModal').modal('hide');
              } else if (this.contactSync) {
                this.dataService.isContactsSyncEnabled = false;
                this.storage.setLocalStorage('isContactSynced', "N")
                this.dataService.mobileContacts = this.dataService.mobileContactsClone;
                this.dataService.upiContactsList = this.commonMethod.getAscendingContactList(this.dataService.mobileContacts);
              }
              subject.next({ responseParameter: { opstatus: "01" } });
              if (endpoint != self.constants.upiserviceName_CHECKSIMBINDINGSTATUS) self.loader.hideLoader();
              console.log('Error in httpservice ', error);
            });
          }, (onError) => {
            this.dataService.errorMsg = this.injector.get(TranslatePipe).transform('TECHNICAL_ISSUE');
            this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('ERROR');
            this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
            this.commonMethod.openPopup('div.popup-bottom.proxy-ip-error');
          });
        } else if (this.dataService.platform.toLowerCase() == this.constants.val_ios) {
          this.plugin.checkSIMAvailable().subscribe((response) => {
            this.ngZone.run(() => {
              console.log('HTTP Service Check Sim response => ');
              console.log(response);
              if (response == "true" || response == true) {
                this.apiCall(endpoint, requestObj).then((response) => {
                  console.log('response', JSON.stringify(response));
                  if (response != undefined) {
                    var decryptKey = "";

                    switch (response.secType) {
                      case "M":
                        decryptKey = self.constants.staticKey;
                        break;
                      case "S":
                        decryptKey = self.storage.getLocalStorage(self.constants.storage_mobileNo) + self.constants.mapEncryptKey;
                        break;
                      case "D":
                        decryptKey = self.storage.getSessionStorage(self.constants.val_sessionKey);
                        break;
                      default:
                        decryptKey = "";
                        break;
                    }

                    var decryptedData = decryptKey == "" ? response : self.encryptDecryptService.decryptText(decryptKey, self.commonMethod.removeLineBreaksFromBase64(response.data));
                    if (decryptKey != "") {
                      var responseData = JSON.parse(decryptedData);
                      for (var key in responseData) {
                        response[key] = responseData[key];
                      }
                    }
                    if (response.responseParameter.hasOwnProperty('upiResponse')) {
                      response.responseParameter.upiResponse = JSON.parse(response.responseParameter.upiResponse);
                      let upiResponse = response.responseParameter.upiResponse;
                      // Show popup with message
                      if (upiResponse.subActionId != this.constants.upiserviceName_GETPAYMENTADDRESSLISTDETAILS && upiResponse.subActionId != this.constants.upiserviceName_GETPAYMENTADDRESSLIST && upiResponse.subActionId != this.constants.upiserviceName_GETBENIFICIARYLIST && upiResponse.subActionId != this.constants.upiserviceName_PENDINGREQUESTS && upiResponse.subActionId != this.constants.upiserviceName_VALIDATEMIGRATEDUSERDETAIL && upiResponse.subActionId != this.constants.upiserviceName_GETMANDATETXNDETAIL && upiResponse.subActionId != this.constants.upiserviceName_GETCOMPLAINTSFORMOBILE && upiResponse.subActionId != this.constants.upiserviceName_GETBLOCKNOTIFICATIONLIST && upiResponse.subActionId != this.constants.upiserviceName_UPIFORGOTMPINVALIDATEOTP && upiResponse.subActionId != this.constants.upiserviceName_GETAPPNOTIFICATION && upiResponse.subActionId != this.constants.upiserviceName_GETFORGOTMPINDEFAULTACCOUNT && upiResponse.subActionId != this.constants.upiserviceName_VALIDATEFORGOTMPINDETAILS && upiResponse.subActionId != this.constants.upiserviceName_VALIDATEQRSIGNATURE && upiResponse.subActionId != this.constants.upiserviceName_GETNOTIFICATIONCOUNT && upiResponse.subActionId != this.constants.upiserviceName_TransactionHistory && endpoint != this.constants.serviceName_VERIFYUPIPAYMENTADDRESS && endpoint != this.constants.serviceName_DEBITCARDISSUE && endpoint != this.constants.serivceName_AAADHARCVALIDATION && endpoint != this.constants.serviceName_LienEnquiry && endpoint != this.constants.serviceName_STANDINGINSTRUCTIONCHECKDETAILS && endpoint != this.constants.serviceName_MOBILELIST && endpoint != this.constants.serviceName_DEBITCARDPINCHANGE && endpoint != this.constants.serviceName_BENIFICIARYLIST && endpoint != this.constants.serviceName_CARDSERVICEONOFF  && endpoint != this.constants.serviceName_ACCOUNTINQUIRY ) {
                        if (upiResponse.status == '01') {
                          if (endpoint != this.constants.upiserviceName_CHECKSIMBINDINGSTATUS && !(upiResponse.subActionId == this.constants.upiserviceName_FUNDSTRANSFER && ((this.dataService.previousPageUrl == 'payUpiPayment' || this.dataService.previousPageUrl == 'payUpiConfirm' || this.dataService.previousPageUrl == 'selfTransferPayment' || this.dataService.previousPageUrl == 'scanQRPayment' || this.dataService.previousPageUrl == 'scanQrConfirm') ||
                            (this.dataService.currentPageUrl == 'transactionPin' || this.dataService.currentPageUrl == 'payUpiConfirm' || this.dataService.previousPageUrl == 'scanQrConfirm')))) {
                            this.ngZone.run(() => {
                              this.dataService.errorMsg = upiResponse.msg;
                              this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('ERROR');
                              this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                              this.commonMethod.openPopup('div.popup-bottom.show-common-error');
                            })
                          }
                        }
                      }
                      else if (upiResponse.status == '03' && endpoint != this.constants.upiserviceName_VALIDATEMIGRATEDUSERDETAIL) {
                        //popup-active
                        //if(this.dataService.information == upiResponse.msg ) return;
                        this.ngZone.run(() => {
                          this.dataService.information = upiResponse.msg;
                          this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                          this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                          this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                        })
                      } else if (upiResponse.status == '83') {
                        //popup-active
                        //if(this.dataService.information == upiResponse.msg ) return;
                        this.ngZone.run(() => {
                          this.dataService.information = upiResponse.msg;
                          this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                          this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                          this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                        })
                      } else if (upiResponse.status == '01' && upiResponse.hasOwnProperty('responseParameter')) {
                        if (upiResponse.responseParameter.hasOwnProperty('responseCode')) {
                          if (upiResponse.responseParameter.responseCode == "U66" || upiResponse.responseParameter.msg.includes("U66")) {
                            //clear token
                            this.storage.setLocalStorage('NpciToken', '');
                            this.storage.setLocalStorage('NpciTokenExpiry', '');
                          }
                        }
                      }

                    }
                    delete response['data'];
                    console.log(endpoint + " response--->" + JSON.stringify(response));
                    if (response.hasOwnProperty('responseParameter')) {
                      this.ngZone.run(() => {
                        if (response.responseParameter.hasOwnProperty('opstatus')) {
                          if (response.subActionId != "TRANSFERTRANSACTION" && endpoint != this.constants.serviceNmae_GETFAVORITETRANSACTIONS && endpoint != this.constants.serviceName_Login && response.subActionId != "BALANCEINQUIRY" && response.subActionId != "MINISTATEMENT" && endpoint != this.constants.serviceName_LOANMINISTATEMENT && endpoint != this.constants.serviceName_GetPaymentAddressListDetails && endpoint != this.constants.serviceName_GetAccountList && endpoint != this.constants.serviceName_CHECKOMNIUSERNAME && endpoint != this.constants.serviceName_CHANGECARDSTATE && endpoint != this.constants.serviceName_JOINTACCOUNTHOLDERDETAILS && endpoint != this.constants.serviceName_ACCOUNTNAME && endpoint != this.constants.serviceName_PAYERTOPAYEEUSINGIFSCACCOUNTNUMBER && endpoint !=  this.constants.serviceName_SCHEDULARTLIST && endpoint != this.constants.serviceName_VALIDATEOTP && endpoint != this.constants.serviceName_CARDDETAILSBYACCOUNTNO && endpoint != this.constants.serviceName_GETIMPSSUCCESSTRANSACTION && endpoint != this.constants.serviceName_GETCARDTYPELIST && endpoint != this.constants.serviceName_LOANCREDITS && endpoint != this.constants.serviceName_VERIFYUPIPAYMENTADDRESS && endpoint != this.constants.serviceName_VALIDATEBANKTOKEN && endpoint != this.constants.serviceName_CARDSERVICEONOFF && endpoint != this.constants.serviceName_ACCOUNTINQUIRY) {
                            if (response.responseParameter.opstatus == "01"  && this.showErrorPopup) {
                              if (this.contactSync) {
                                this.dataService.isContactsSyncEnabled = false;
                                this.storage.setLocalStorage('isContactSynced', "N")
                                this.dataService.mobileContacts = this.dataService.mobileContactsClone;
                                this.dataService.upiContactsList = this.commonMethod.getAscendingContactList(this.dataService.mobileContacts);
                              }
                              if (response.responseParameter.hasOwnProperty("Result") && response.responseParameter.Result && response.responseParameter.Result != "" && response.responseParameter.Result != null) {
                                if (response.subActionId != this.constants.upicheck_CHECKSIMBINDINGSTATUS) {
                                  this.ngZone.run(() => {
                                    this.dataService.information = response.responseParameter.Result;
                                    this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                                    this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                                    this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                                  })
                                }
                              }
                              else {
                                // this.dataService.information = 'There is some difficulty in processing the request. Please try again later.';
                                this.ngZone.run(() => {
                                  this.dataService.information = this.injector.get(TranslatePipe).transform('PLEASE_TRY_AGAIN_LATER');
                                  this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                                  this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                                  // if (endpoint != this.constants.upicheck_CHECKSIMBINDINGSTATUS) this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                                  if (endpoint != this.constants.upiserviceName_CHECKSIMBINDINGSTATUS) this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                                })


                              }
                              // Handling for OTP back page in OMNI and redirect to previous url
                            } else if (response.responseParameter.opstatus == "02") {
                              if(endpoint != this.constants.serviceName_BENIFICIARYLIST && endpoint != this.constants.serviceName_CIFACCOUNTMOBILECHECK){
                              this.dataService.information = response.responseParameter.Result;
                              this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                              this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                              this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                              }

                            }
                            else if (response.responseParameter.opstatus == "03" || response.responseParameter.opstatus == "04" || response.responseParameter.opstatus == "05" ) {
                              this.ngZone.run(() => {
                                if (this.contactSync) {
                                  this.dataService.isContactsSyncEnabled = false;
                                  this.storage.setLocalStorage('isContactSynced', "N")
                                  this.dataService.mobileContacts = this.dataService.mobileContactsClone;
                                  this.dataService.upiContactsList = this.commonMethod.getAscendingContactList(this.dataService.mobileContacts);
                                }
                                this.dataService.information = response.responseParameter.Result;
                                this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                                this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                                this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                              })
                            }
                          }

                          if (response.responseParameter.opstatus == self.constants.InvalidSessionCode) {
                            showToastMessage(response.responseParameter.Result);
                            console.log("this.router.url", this.router.url);
                            if (this.constants.getPlatform() == "web") {
                              this.dataService.timeoutHeader = "Timed out!"
                              this.dataService.timeoutMsg = "You were idle for too long, please Login again"
                              self.router.navigateByUrl('/temporaryServiceOut');
                            }
                            else if (self.dataService.isUPILoginFlow) {
                              self.router.navigateByUrl('/upiLogin');
                            }
                            else {
                              self.router.navigateByUrl('/loginMobile');
                            }
                          }
                        }
                      })
                    }
                    if (response) {
                      subject.next(response);
                      subject.complete();
                    } else {
                      subject.complete();
                      // subject.unsubscribe();
                    }
                  }
                  if (endpoint != self.constants.upiserviceName_CHECKSIMBINDINGSTATUS) self.loader.hideLoader();
                }, (error) => {
                  if (endpoint == this.constants.upiserviceName_CHECKSIMBINDINGSTATUS) {
                    $('#sendsmsModal').modal('hide');
                  } else if (this.contactSync) {
                    this.dataService.isContactsSyncEnabled = false;
                    this.storage.setLocalStorage('isContactSynced', "N")
                    this.dataService.mobileContacts = this.dataService.mobileContactsClone;
                    this.dataService.upiContactsList = this.commonMethod.getAscendingContactList(this.dataService.mobileContacts);
                  }
                  subject.next({ responseParameter: { opstatus: "01" } });
                  if (endpoint != self.constants.upiserviceName_CHECKSIMBINDINGSTATUS) self.loader.hideLoader();
                  console.log('Error in httpservice ', error);
                });
              } else {
                this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                this.dataService.simInfoDetails = this.injector.get(TranslatePipe).transform('NO_SIM_AVAILABLE');
                this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                this.commonMethod.openPopup('div.popup-bottom.no-sim-available-ios');
              }
            }, (err)=>{
              console.log("CheckSim Available Error!");
              console.log(err);
            });
          });
        } else {
          console.log("unknown platform...");
        }
      } else {
        var _decryptKey:any = "";
        this.apiCall(endpoint, requestObj).then((response) => {
          console.log('response', JSON.stringify(response));
          console.log(response.secType);
          if (response != undefined) {
            

            switch (response.secType) {
              case "M":
                _decryptKey = self.constants.staticKey;
                break;

              case "S":
                _decryptKey = self.storage.getLocalStorage(this.constants.storage_mobileNo) + self.constants.mapEncryptKey;
                // decryptKey = 8668557192+self.constants.mapEncryptKey;
                break;

              case "D":
                //console.log(self.storage.getSessionStorage(self.constants.val_sessionKey));
                _decryptKey = self.storage.getSessionStorage(self.constants.val_sessionKey);
                // decryptKey = "19816465728282";
                break;

              default:
                _decryptKey = "";
                break;
            }

            _decryptKey == "" && response.secType == "D" ? self.storage.getSessionStorage(self.constants.val_sessionKey): _decryptKey;
            //console.log("decryptKey ====>"+_decryptKey);
            var decryptedData = _decryptKey == "" ? response : self.encryptDecryptService.decryptText(_decryptKey, self.commonMethod.removeLineBreaksFromBase64(response.data));
            console.log("decryptedData ====>",decryptedData);
            if (_decryptKey != "") {
              var responseData = JSON.parse(decryptedData);
              for (var key in responseData) {
                response[key] = responseData[key];
              }
            }
            if (response.responseParameter.hasOwnProperty('upiResponse')) {
              response.responseParameter.upiResponse = JSON.parse(response.responseParameter.upiResponse);
              let upiResponse = response.responseParameter.upiResponse;
              // Show popup with message
              if (upiResponse.subActionId != this.constants.upiserviceName_GETPAYMENTADDRESSLISTDETAILS && upiResponse.subActionId != this.constants.upiserviceName_GETPAYMENTADDRESSLIST && upiResponse.subActionId != this.constants.upiserviceName_GETBENIFICIARYLIST && upiResponse.subActionId != this.constants.upiserviceName_PENDINGREQUESTS && upiResponse.subActionId != this.constants.upiserviceName_VALIDATEMIGRATEDUSERDETAIL && upiResponse.subActionId != this.constants.upiserviceName_GETMANDATETXNDETAIL && upiResponse.subActionId != this.constants.upiserviceName_GETCOMPLAINTSFORMOBILE && upiResponse.subActionId != this.constants.upiserviceName_GETBLOCKNOTIFICATIONLIST && upiResponse.subActionId != this.constants.upiserviceName_UPIFORGOTMPINVALIDATEOTP && upiResponse.subActionId != this.constants.upiserviceName_GETAPPNOTIFICATION && upiResponse.subActionId != this.constants.upiserviceName_GETFORGOTMPINDEFAULTACCOUNT && upiResponse.subActionId != this.constants.upiserviceName_VALIDATEFORGOTMPINDETAILS && upiResponse.subActionId != this.constants.upiserviceName_TransactionHistory && endpoint != this.constants.serviceName_VERIFYUPIPAYMENTADDRESS && endpoint != this.constants.serviceName_CARDSERVICEONOFF && endpoint != this.constants.serviceName_ACCOUNTINQUIRY ) {
                if (upiResponse.status == '01') {
                  //if(this.dataService.errorMsg == upiResponse.msg) return;
                  if (endpoint != this.constants.upiserviceName_CHECKSIMBINDINGSTATUS && !(upiResponse.subActionId == this.constants.upiserviceName_FUNDSTRANSFER && this.dataService.currentPageUrl == 'payUpiConfirm' || this.dataService.previousPageUrl == 'transactionPin')) {
                    this.ngZone.run(() => {
                      this.dataService.errorMsg = upiResponse.msg;
                      this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('ERROR');
                      this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                      this.commonMethod.openPopup('div.popup-bottom.show-common-error')
                    })
                  }
                }
              }
              else if (upiResponse.status == '03' && endpoint != this.constants.upiserviceName_VALIDATEMIGRATEDUSERDETAIL) {
                //popup-active
                //if(this.dataService.information == upiResponse.msg ) return;
                this.ngZone.run(() => {
                  this.dataService.information = upiResponse.msg;
                  this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                  this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                  this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                })
              } else if (upiResponse.status == '83') {
                //popup-active
                //if(this.dataService.information == upiResponse.msg ) return;
                this.ngZone.run(() => {
                  this.dataService.information = upiResponse.msg;
                  this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                  this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                  this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                })
              } else if (upiResponse.status == '01' && upiResponse.hasOwnProperty('responseParameter')) {
                if (upiResponse.responseParameter.hasOwnProperty('responseCode')) {
                  if (upiResponse.responseParameter.responseCode == "U66" || upiResponse.responseParameter.msg.includes("U66")) {
                    //clear token
                    this.storage.setLocalStorage('NpciToken', '');
                    this.storage.setLocalStorage('NpciTokenExpiry', '');
                  }
                }
              }

            }
            delete response['data'];
            console.log(endpoint + " response--->" + JSON.stringify(response));
            if (response.hasOwnProperty('responseParameter')) {
              this.ngZone.run(() => {
                if (response.responseParameter.hasOwnProperty('opstatus')) {
                  if (response.subActionId != "TRANSFERTRANSACTION" && endpoint != this.constants.serviceNmae_GETFAVORITETRANSACTIONS && endpoint != this.constants.serviceName_Login && response.subActionId != "BALANCEINQUIRY" && response.subActionId != "MINISTATEMENT" && endpoint != this.constants.serviceName_LOANMINISTATEMENT && endpoint != this.constants.serviceName_GetPaymentAddressListDetails && endpoint != this.constants.serviceName_GetAccountList && endpoint != this.constants.serviceName_CHECKOMNIUSERNAME && endpoint != this.constants.serviceNmae_GETFAVORITETRANSACTIONS  && endpoint != this.constants.serviceName_CHANGECARDSTATE && endpoint != this.constants.serviceName_JOINTACCOUNTHOLDERDETAILS && endpoint != this.constants.serviceName_ACCOUNTNAME && endpoint != this.constants.serviceName_PAYERTOPAYEEUSINGIFSCACCOUNTNUMBER && endpoint !=  this.constants.serviceName_SCHEDULARTLIST && endpoint != this.constants.serviceName_VALIDATEOTP && endpoint != this.constants.serviceName_CARDDETAILSBYACCOUNTNO && endpoint != this.constants.serviceName_GETIMPSSUCCESSTRANSACTION && endpoint != this.constants.serviceName_GETCARDTYPELIST && endpoint != this.constants.serviceName_LOANCREDITS && endpoint != this.constants.serviceName_VERIFYUPIPAYMENTADDRESS && endpoint != this.constants.serviceName_DEBITCARDISSUE && endpoint != this.constants.serivceName_AAADHARCVALIDATION && endpoint != this.constants.serviceName_VALIDATEBANKTOKEN && endpoint != this.constants.serviceName_LienEnquiry && endpoint != this.constants.serviceName_STANDINGINSTRUCTIONCHECKDETAILS && endpoint != this.constants.serviceName_MOBILELIST && endpoint != this.constants.serviceName_CARDSERVICEONOFF && endpoint != this.constants.serviceName_ACCOUNTINQUIRY ) {
                    if (response.responseParameter.opstatus == "01" && this.showErrorPopup) {
                      if (this.contactSync) {
                        this.dataService.isContactsSyncEnabled = false;
                        this.storage.setLocalStorage('isContactSynced', "N")
                        this.dataService.mobileContacts = this.dataService.mobileContactsClone;
                        this.dataService.upiContactsList = this.commonMethod.getAscendingContactList(this.dataService.mobileContacts);
                      }
                      if (response.responseParameter.hasOwnProperty("Result") && response.responseParameter.Result && response.responseParameter.Result != "" && response.responseParameter.Result != null) {
                        if (response.subActionId != this.constants.upicheck_CHECKSIMBINDINGSTATUS && endpoint != this.constants.serviceName_GETREFCODE && endpoint != this.constants.serviceNmae_GETFAVORITETRANSACTIONS) {
                          this.ngZone.run(() => {
                            this.dataService.information = response.responseParameter.Result;
                            this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                            this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                            this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                          })
                        }
                      }
                      else {
                        if (endpoint != this.constants.serviceName_GETREFCODE) {
                          // this.dataService.information = 'There is some difficulty in processing the request. Please try again later.';
                          this.ngZone.run(() => {
                            this.dataService.information = this.injector.get(TranslatePipe).transform('PLEASE_TRY_AGAIN_LATER');
                            this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                            this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                            // if (endpoint != this.constants.upicheck_CHECKSIMBINDINGSTATUS) this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                            if (endpoint != this.constants.upiserviceName_CHECKSIMBINDINGSTATUS) this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                          })
                        }
                      }
                      // Handling for OTP back page in OMNI and redirect to previous url
                    } else if (response.responseParameter.opstatus == "02") {
                      if(endpoint != this.constants.serviceName_BENIFICIARYLIST && endpoint != this.constants.serviceName_CIFACCOUNTMOBILECHECK){
                      this.dataService.information = response.responseParameter.Result;
                      this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                      this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                      this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                      }
                    }
                    else if (response.responseParameter.opstatus == "03" || response.responseParameter.opstatus == "04" || response.responseParameter.opstatus == "05" ) {
                      this.ngZone.run(() => {
                        if (this.contactSync) {
                          this.dataService.isContactsSyncEnabled = false;
                          this.storage.setLocalStorage('isContactSynced', "N")
                          this.dataService.mobileContacts = this.dataService.mobileContactsClone;
                          this.dataService.upiContactsList = this.commonMethod.getAscendingContactList(this.dataService.mobileContacts);
                        }
                        this.dataService.information = response.responseParameter.Result;
                        this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
                        this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
                        this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                      })
                    }
                  }


                  if (response.responseParameter.opstatus == self.constants.InvalidSessionCode) {
                    showToastMessage(response.responseParameter.Result);
                    console.log("this.router.url", this.router.url);
                    if (this.constants.getPlatform() == "web") {
                      this.dataService.timeoutHeader = "Timed out!"
                          this.dataService.timeoutMsg = "You were idle for too long, please Login again"
                      self.router.navigateByUrl('/temporaryServiceOut');
                    }
                    else if (self.dataService.isUPILoginFlow) {
                      self.router.navigateByUrl('/upiLogin');
                    }
                    else {
                      self.router.navigateByUrl('/loginMobile');
                    }
                  }
                }
              })
            }
            if (response) {
              subject.next(response);
              subject.complete();
            } else {
              subject.complete();
              // subject.unsubscribe();
            }
          }
          if (endpoint != self.constants.upiserviceName_CHECKSIMBINDINGSTATUS) self.loader.hideLoader();
        }, (error) => {
          if (endpoint == this.constants.upiserviceName_CHECKSIMBINDINGSTATUS) {
            $('#sendsmsModal').modal('hide');
          } else if (this.contactSync) {
            this.dataService.isContactsSyncEnabled = false;
            this.storage.setLocalStorage('isContactSynced', "N")
            this.dataService.mobileContacts = this.dataService.mobileContactsClone;
            this.dataService.upiContactsList = this.commonMethod.getAscendingContactList(this.dataService.mobileContacts);
          }
          subject.next({ responseParameter: { opstatus: "01" } });
          if (endpoint != self.constants.upiserviceName_CHECKSIMBINDINGSTATUS) self.loader.hideLoader();
          console.log('Error in httpservice ', error);
        });
      }
    } else {
      if (endpoint == this.constants.upiserviceName_CHECKSIMBINDINGSTATUS) {
        $('#sendsmsModal').modal('hide');
        clearInterval(this.dataService.simBindingInterval);
      } else if (this.contactSync) {
        this.dataService.isContactsSyncEnabled = false;
        this.storage.setLocalStorage('isContactSynced', "N")
        this.dataService.mobileContacts = this.dataService.mobileContactsClone;
        this.dataService.upiContactsList = this.commonMethod.getAscendingContactList(this.dataService.mobileContacts);
      }
      subject.unsubscribe();
      this.ngZone.run(() => {
        this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
        this.dataService.informationDetails = this.injector.get(TranslatePipe).transform('NO_INTERNET_CONNECTION');
        this.commonMethod.openPopup('div.popup-bottom.network-info')
      });
    }
    return subject.asObservable();
  }

  
  

  /**
   * For handling http error this function is invoked
   * @param operation
   * @param result
   */
  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {
      this.loader.hideLoader();
      if (this.contactSync && this.dataService.isContactsSyncEnabled) {
        this.dataService.isContactsSyncEnabled = false;
        this.dataService.mobileContacts = this.dataService.mobileContactsClone;
        this.storage.setLocalStorage('isContactSynced', "N")
        this.dataService.upiContactsList = this.commonMethod.getAscendingContactList(this.dataService.mobileContacts);
      }
      // TODO: send the error to remote logging infrastructure
      console.error('Error in http-rest-api ===> ', error); // log to console instead
      this.ngZone.run(() => {
        // this.dataService.information = 'There is some difficulty in processing the request. Please try again later.';
        $('#sendsmsModal').modal('hide');
        this.dataService.information = this.injector.get(TranslatePipe).transform('PLEASE_TRY_AGAIN_LATER');
        this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
        this.dataService.primaryBtnText = this.injector.get(TranslatePipe).transform('OK');
        this.commonMethod.openPopup('div.popup-bottom.show-common-info');
      })

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      switch (error.status) {
        case this.STATUS.ERR_CODE_SERVER_UNAVAILABLE:
          console.log(this.constants.SERVICE_UNAVAILABLE_MSG);
          break;
        case this.STATUS.ERR_CODE_TIMEOUT:
          // showToastMessage(this.constants.SERVICE_TIMEOUT_MSG);
          console.log(this.constants.SERVICE_TIMEOUT_MSG);
          break;
        //don't add toast msg from here
        case this.STATUS.ERR_CODE_SERVER_ERROR:
          // showToastMessage(this.constants.SERVICE_SERVER_ERROR_MSG);
          console.log(this.constants.SERVICE_SERVER_ERROR_MSG);
          break;
        case this.STATUS.ERR_CODE_BAD_REQUEST:
          console.log(this.constants.SERVICE_BAD_REQ_MSG);
          break;
        case this.STATUS.ERR_CODE_UNAUTHORIZED:
          console.log(this.constants.SERVICE_UNAUTHORIZED_MSG);
          break;
        case this.STATUS.ERR_CODE_NOT_FOUND:
          console.log(this.constants.SERVICE_NOT_FOUND_MSG);
          break;
        case this.STATUS.ERR_CODE_METHOD_NOT_ALLOWED:
          console.log(this.constants.SERVICE_METHOD_NOT_ALLOWED_MSG);
          break;
        case this.STATUS.ERR_CODE_UNKNOWN:
          console.log(this.constants.SERVICE_METHOD_UNKNOWN_ERR_MSG);
          // console.log(this.plugin.checkConnection());
          break;

        default:
          break;
      }
      return of(result as T);
    };
  }

  public getIPAddress() {
    return this.http.get("https://jsonip.com");
  }

  /**
   *
   * fork join implementation
   */

  multipleApiCreation(request, deviceId, endpoint, upiFlag?: boolean): Observable<any> {
    var self = this;
    var subject = new Subject<any>();
    const requestObj: IRequest = <IRequest>{
      sourceIp: this.dataService.ipAddress,
      prefered_Language: "en",
      entityId: "UPIDESKTOP", //UPIMOBILE or UPIDESKTOP
      deviceId: deviceId,
      map: request
    };
    return this.http.post(`${this.constants.publicURL.serviceURL}${endpoint}`, JSON.stringify(request), httpOptions);
  }


  public requestDataFromMultipleSources(requestArray): Observable<any[]> {
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin(requestArray);
  }


}
