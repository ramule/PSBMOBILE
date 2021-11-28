import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AppConstants } from '../../../app.constant';
import { Router } from '@angular/router';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { NotificationService } from '../../omni/notification/notification.service';
import { UPINotificationService } from '../../upi/notification/notification.service';


@Component({
  selector: 'app-notification-mobile',
  templateUrl: './notification-mobile.component.html',
  styleUrls: ['./notification-mobile.component.scss']
})
export class NotificationMobileComponent implements OnInit {
  isWeb:any;
  upiNotificationList = [];
  omniNotificationList = [];
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName':'Notifications',
    'footertype':'none'
  }
  constructor(
    private router: Router,
    public DataService: DataService,
    private constant: AppConstants,
    private http : HttpRestApiService,
    private localStorage : LocalStorageService,
    private upiNotificationService : UPINotificationService,
    private notificationServicemob : NotificationService
  ) { }
  
  commonPageComponent: any;

  ngOnInit(): void {
    this.isWeb = this.constant.getPlatform() == 'web';
    this.DataService.changeMessage(this.headerdata);
    // this.DataService.currentMessage.subscribe(message => (this.commonPageComponent = message));
    this.getNotificationList()
    this.getOmniNoficationList()
  }

  

  /**profie
  * Get Notification List
  */
   getNotificationList() {
    // this.notificationService.getUserLocation();
    var reqParams = this.upiNotificationService.getNotificationListRequest();
    this.UpiApiCall(reqParams);
  }

  getOmniNoficationList(){
    var param = this.notificationServicemob.getNotificationParam();
      let deviceID = this.localStorage.getLocalStorage(this.constant.storage_deviceId);
      this.getNotificationApiCall(param, deviceID)
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
            this.upiNotificationList = response.responseParameter.RESULT;
            break;
          default:
            break;
        }
      }else{
        if(response.subActionId == this.constant.upiserviceName_GETAPPNOTIFICATION){
          this.omniNotificationList = [];
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  
  getNotificationApiCall(param, deviceID) {
    this.http.callBankingAPIService(param, deviceID, this.constant.serviceName_NOTIFICATIONS).subscribe(data => {
      console.log(data);

      var resp = data.responseParameter

      console.log("Notification List=====", this.omniNotificationList);
      if (resp.opstatus == "00") {
        this.omniNotificationList = data.set.records;
        this.DataService.notificationArray = data.set.records
        console.log(data.responseParameter);
        // this.omniNotificationList = data.set.records;
      }
    });
  }

  readNotification(id)
  {
    var param = this.notificationServicemob.getNotificationReadParam(id);
    let deviceID = this.localStorage.getLocalStorage(this.constant.storage_deviceId);
    this.http.callBankingAPIService(param, deviceID, this.constant.serviceName_NOTIFICATIONSTATUSUPDATE).subscribe(data => {
      console.log(data);

      var resp = data.responseParameter
      if (resp.opstatus == "00") {
      }
    });
  }

}
