import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataService } from '../../../../../services/data.service';
import { NpciAndroidService } from '../../../../../services/npci-android.service';
import { NpciIosService } from '../../../../../services/npci-ios.service';
import { AppConstants } from '../../../../../app.constant';
import { UpiGlobalService } from '../../upi-global.service';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';


@Component({
  selector: 'app-activate-upi-global-confirmation',
  templateUrl: './activate-upi-global-confirmation.component.html',
  styleUrls: ['./activate-upi-global-confirmation.component.scss']
})

export class ActivateUpiGlobalConfirmationComponent implements OnInit {
  confirmGlobalUpiData : any;
  finalCredResponse : any;
  headerdata = {
    'headerType': 'TitleClose',
    'titleName':'Confirmation',
    'footertype':'none'
  } 

  constructor(private router:Router, 
    private dataService: DataService,
    private npciAndroidService: NpciAndroidService,
    private npciIosService: NpciIosService,
    private constants: AppConstants,
    private upiGlobalService : UpiGlobalService,
    private httpService: HttpRestApiService,
    private loaderService: pageLoaderService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.dataService.changeMessage(this.headerdata);
    this.confirmGlobalUpiData = this.dataService.globalUpiFormData;
    console.log("Confirm received data = ", this.confirmGlobalUpiData);
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

  callNpciLibrary() {
    console.log("inside callNpciLibrary => ");
    this.loaderService.showLoader();
    if (window.hasOwnProperty('cordova')) {
      if(this.dataService.platform.toLowerCase() == this.constants.val_android) {
        console.log("Calling NPCI Android service...");
        this.npciAndroidService.initData();
        let subject = new Subject<any>();
        
        this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
          this.npciAndroidService.transactionId = transactionId;
          this.npciAndroidService.androidStartCLLibrary(this.dataService.globalUpiAccountData, this.constants.val_npci_flow_globalUpi_android, subject).subscribe((NPCIResponse) => {
            console.log('Android StartCLLibrary Success => ', NPCIResponse);
            if (NPCIResponse.hasOwnProperty('status') && NPCIResponse.status == "00") {
              this.finalCredResponse = NPCIResponse;
              this.upiGlobalService.initData();
              this.upiGlobalService.globalQrActivateDeactivateRequestObject(this.dataService.globalUpiAccountData, this.finalCredResponse, true);
              this.UpiApiCall();
            } else {
  
            }
          }, err => {
            console.log('Android StartCLLibrary error => ', err);
          });
        });       
      } else if (this.dataService.platform.toLowerCase() == this.constants.val_ios) {
        console.log("Calling NPCI iOS service...");
        this.npciIosService.initData();
        let subject = new Subject<any>();
        
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          console.log('transactionId Received => ', transactionId);
          this.npciIosService.txnId = transactionId;
          
          this.npciIosService.iosStartCLLibrary(this.dataService.globalUpiAccountData, this.constants.val_npci_flow_globalUpi_ios, subject).subscribe((NPCIResponse) => {
            console.log('iOS StartCLLibrary Success => ', NPCIResponse);
            if(NPCIResponse && NPCIResponse.credkey) {
              this.finalCredResponse = NPCIResponse;
              this.upiGlobalService.initData();
              this.upiGlobalService.globalQrActivateDeactivateRequestObject(this.dataService.globalUpiAccountData, this.finalCredResponse, true);
              this.UpiApiCall();
            } else {
              console.log("NPCI flow cancelled...");
            }
          }, err => {
            console.log('iOS StartCLLibrary error => ', err);
          });
        });
      } else {
        console.log("unknown platform = ",this.dataService.platform);
      }
    } else {
      console.log("Cordova not available... unable to start NPCI Library on web");
    }
    
  }

  UpiApiCall() {
    let requestObj = this.upiGlobalService.getEncryptedOmniRequestObject();
    this.httpService.callBankingAPIService(requestObj, this.localStorageService.getLocalStorage(this.constants.storage_deviceId), this.constants.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      console.log('success', data);
      if(data.responseParameter.opstatus == "00") {
        //success handler
        let upiResponseData = data.responseParameter.upiResponse;
        console.log('upiResponseData => ', upiResponseData);
        if (upiResponseData.subActionId == this.constants.upiserviceName_GLOBALQRACTIVATION) {
          console.log("GLOBALQRACTIVATION response handling...");
          if(upiResponseData.status == "00") {
            this.dataService.routeWithNgZone('activateUpiGlobalSuccess');
          } else {
            //failure handler
          }
        }
      }
    });
  }
}
