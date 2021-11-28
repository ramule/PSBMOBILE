import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from '../../../services/data.service';
import { UPINotificationService } from './notification.service';
declare var notification : any ;
declare var window: any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notificationList = [];
    headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName':'Notification',
    'footertype':'none'
  }
  constructor( private router:Router, public DataService: DataService, private location : Location, private notificationService : UPINotificationService,private http: HttpRestApiService, private localStorage : LocalStorageService, private constant :AppConstants) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'upiDashboard', this.location.prepareExternalUrl("upiDashboard"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    notification();
    this.getNotificationList();
  }

  /**profie
  * Get Notification List
  */
   getNotificationList() {
    // this.notificationService.getUserLocation();
    var reqParams = this.notificationService.getNotificationListRequest();
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
          case this.constant.upiserviceName_GETAPPNOTIFICATION:
            this.notificationList = response.responseParameter.RESULT;
            break;
          default:
            break;
        }
      }else{
        if(response.subActionId == this.constant.upiserviceName_GETAPPNOTIFICATION){
          this.notificationList = [];
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  share(notification){
    window.plugins.socialsharing.share(notification.message);
  }

  navigateAccToType(notificationType) {
    let url = "";
    if(notificationType) {
      if (notificationType == 'PAY') {
        // url = "payUpi";
        url = "transactionList";
      } else if (notificationType == 'COLLECT') {
        url = "pendingRequestUpi";
        this.DataService.enablePendingWithPayerTab = false;
      } else if (notificationType == 'COLLECT_ACCEPT') {
        url = "pendingRequestUpi";
        this.DataService.enablePendingWithPayerTab = true;
      } else if (notificationType == 'MANDATE') {
        url = "upiMandate";
      } else if (notificationType == 'MANDATE_ACCEPT') {
        url = "approveMandate";
      } else if (notificationType == 'SET_PIN' || notificationType == 'CHANGE_PIN' || notificationType == 'LINK_ACCOUNT' || notificationType == 'BAL_ENQ') {
        url = "manageAccounts";
      } else if (notificationType == 'OTP' || notificationType == 'OTHERS') {
        url = "upiDashboard";
      } else {
        console.log("notificationType not found..");
        url = "upiDashboard";
      }
      this.DataService.routeWithNgZone(url);
    } else {
    console.log("notificationType not found..");
    }
  }
}
