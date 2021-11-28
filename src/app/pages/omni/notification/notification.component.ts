import { CommonMethods } from './../../../utilities/common-methods';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { NotificationService } from '../notification/notification.service';
import { Subscription } from 'rxjs';
declare var notification : any ;
declare var window: any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notificationList:any = [];
  sessionDecryptKey: any;
  // commonPageComponent = {
  //   'headerType': 'innerHeader',
  //   'sidebarNAv': 'OmniNAv',
  //   'footer': 'innerFooter',
  // }
  subscription: Subscription;
  constructor( private router:Router, public DataService: DataService,
    private constant: AppConstants,
    private localstorage: LocalStorageService ,
    private http: HttpRestApiService,
    private commonMethod:CommonMethods,
    private encryptDecryptService: EncryptDecryptService,
    private notificationServicemob : NotificationService,

  ){ }

  ngOnInit(): void {
    this.DataService.setPageSettings('NOTIFICATION');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('NOTIFICATION' , this.router.url)
    this.getNotification();

    this.subscription = this.DataService.getNotification().subscribe(message => {
      if (message) {
        this.notificationList.push(JSON.parse(message));
      } else {
        // /clear messages when empty message received
        this.notificationList = [];
      }
    });
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }


  getNotification()
  {

    var param=this.notificationServicemob.getNotificationParam();
    let deviceID = this.localstorage.getLocalStorage(this.constant.storage_deviceId);
    this.getNotificationApiCall(param,deviceID)
  }

  getNotificationApiCall(param,deviceID)
  {
    this.http.callBankingAPIService(param,deviceID,this.constant.serviceName_NOTIFICATIONS).subscribe(data=>{
      console.log(data);
      var resp = data.responseParameter
     // this.notificationList=data.responseParameter.records;
       console.log("Notification List=====",  this.notificationList);
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
          this.notificationList=data.set.records;
          var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey,resp.Session);
          console.log('sessionKey', sessionKey);
        }
     });


  }
  share(notification){
    window.plugins.socialsharing.share(notification.message);
  }

}
