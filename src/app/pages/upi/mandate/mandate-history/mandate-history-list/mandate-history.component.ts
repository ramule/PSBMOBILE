import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../../../../../app.constant';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { UPIMandateHistory } from './mandate-history-service';
@Component({
  selector: 'app-mandate-history',
  templateUrl: './mandate-history.component.html',
  styleUrls: ['./mandate-history.component.scss']
})
export class MandateHistoryComponent implements OnInit {
  mandateHistoryList = [];
  mandateHistoryDetails: any;
  
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName':'MANDATE_HISTORY',
    'footertype':'none'
  }
  constructor( private router:Router, public DataService: DataService, private location: Location, private http : HttpRestApiService, private localStorage : LocalStorageService, private constant : AppConstants, private mandateHistory : UPIMandateHistory) { }
  
  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    // history.pushState({}, this.DataService.previousPageUrl, this.location.prepareExternalUrl(this.DataService.previousPageUrl));
    history.pushState({}, 'upiMandate', this.location.prepareExternalUrl('upiMandate'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    if(this.DataService.umn){
      // this.getMandateHistoryByUmn('1f0c31c85e0d46e1a15f4e453c4c6668@psb');
      this.getMandateHistoryByUmn(this.DataService.umn);
    }else{
      this.getMandateHistory();
    }
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  getMandateHistory() {
    var req = this.mandateHistory.getMandateHistoryList();
    this.UpiApiCall(req);
  }

  getMandateHistoryByUmn(umn) {
    var req = this.mandateHistory.getMandateHistoryListByUmn(umn);
    this.UpiApiCall(req);
  }

  viewDetails(mandateHistory){
    this.DataService.mandateHistoryDetails = mandateHistory;
    this.router.navigateByUrl('mandateHistoryDetails');
  }

  backbtnClick(){
    this.location.back();
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
          case this.constant.upiserviceName_GETMANDATEHISTORYONMOBILE:
            this.mandateHistoryList = response.responseParameter.mandateDetailOnMobile;
            // console.log(JSON.stringify(this.mandateHistoryList))
          break;
          case this.constant.upiserviceName_GETMANDATEHISTORY:
            this.mandateHistoryList = response.responseParameter.mandateDetail;
            // console.log(JSON.stringify(this.mandateHistoryList))
          break;
          default:
            console.log("default ", response.subActionId);
            break;
        }
      } else {
        
      }
      
      for (let i = 0; i < this.mandateHistoryList.length; i++) {
        if (this.mandateHistoryList[i].action == 'EXECUTION') {
          //If action is exceution then FAILED, PENDING, REJECTED, EXPIRED, DEEMED, COMPLETED, PARTIAL, FAILURE, CREATED, REVOKED
          //If action is not exceution  then   status : COMPLETED ,FAILURE
          this.mandateHistoryList[i].actionLabel = this.mandateHistoryList[i].status;
        }
      }
      console.log("Mandate History List => ");
      console.log(JSON.stringify(this.mandateHistoryList));  
    }, error => {
      console.log("ERROR!", error);
    });
  }
}
