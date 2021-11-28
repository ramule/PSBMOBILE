import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AppConstants } from '../../../app.constant';
import { Router } from '@angular/router';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { NotificationService } from '../../omni/notification/notification.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  isWeb:any;
  constructor(
    private router: Router,
    public DataService: DataService,
    private constant: AppConstants,
    private http : HttpRestApiService,
    private localStorage : LocalStorageService,
    private notificationServicemob : NotificationService
  ) { }
  
  commonPageComponent: any;

  ngOnInit(): void {
    this.isWeb = this.constant.getPlatform() == 'web';
    this.DataService.currentMessage.subscribe(message => (this.commonPageComponent = message))
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
