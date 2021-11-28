import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { PluginService } from 'src/app/services/plugin-service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../services/data.service';
import { ManageBlockUPIService } from './manage-block-upi-id.service';
declare var manageBlockUpiId: any;

@Component({
  selector: 'app-manage-block-upi-id',
  templateUrl: './manage-block-upi-id.component.html',
  styleUrls: ['./manage-block-upi-id.component.scss']
})
export class ManageBlockUpiIdComponent implements OnInit {

  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'MANAGED_BLOCKED_UPID_ID',
    'footertype': 'none'
  }
  information = "";
  constructor(private router: Router, public DataService: DataService, private location: Location, private manageBlockUPIService: ManageBlockUPIService, private localStorage: LocalStorageService, private http: HttpRestApiService, private constant: AppConstants, private commonMethod: CommonMethods, private pluginService:PluginService) { }
  blockedUPIIdList = [];
  vpaDetails:any;
  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'upiDashboard', this.location.prepareExternalUrl("upiDashboard"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    manageBlockUpiId();
    this.getBlockUPIIdList();
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  /**
  * Get Recent & Favorite Collect Request List
  */
  getBlockUPIIdList() {
    // this.manageBlockUPIService.getUserLocation();
    var reqParams = this.manageBlockUPIService.getManageBlockUPIIdRequest();
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
          case this.constant.upiserviceName_GETBLOCKNOTIFICATIONLIST:
            this.blockedUPIIdList = response.responseParameter.blockedVpaList;
            break;
          case this.constant.upiserviceName_UNBLOCKNOTIFICATION:
            this.information = response.msg;
            this.showPopup('UPIID-Unblock-success');
            break;
          default:
            break;
        }
      }else{
        if(response.subActionId == this.constant.upiserviceName_GETBLOCKNOTIFICATIONLIST){
          this.blockedUPIIdList = [];
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }
  /**
  * show popup by popupName
  * @param popupName 
  * @param data 
  */
  showPopup(popupName, vpaDetails?) {
    if (popupName == 'unblockUPIId') {
      this.vpaDetails = vpaDetails;
    }
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }

  /**
   * Close popup by popupName
   * @param popupName 
   */
  closePopup(popupName) {
    if (popupName == 'UPIID-Unblock-success') {
      this.getBlockUPIIdList();
    }
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
  }


  UnblockUPIId() {
    this.closePopup('unblockUPIId');
    this.pluginService.getTransactionId().subscribe((transactionID) => {
      // this.manageBlockUPIService.getUserLocation();
      var reqParams = this.manageBlockUPIService.getUnblockUPIDRequest(this.vpaDetails,transactionID);
      this.UpiApiCall(reqParams);
    });
  }

}
