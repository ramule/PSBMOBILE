import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { PendingReqService } from '../pending-request/pending-request.service';
import { PendingByPayer, PendingRequest, PendingWithMe } from '../../../../models/pending-request.model';
import { Location } from '@angular/common';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { timestamp } from 'rxjs/operators';
import * as moment from 'moment';

declare var showToastMessage: any;
declare var $: any;
declare var pendingRequest: any;
declare var cordova;

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.scss']
})
export class PendingRequestComponent implements OnInit {
  headerdata = {
    'headerType': 'backUpiIdHeader',
    'titleName': 'PENDING_REQUEST',
    'footertype': 'none'
  };
  pendingWithMeList = [];
  pendingWithPayerList = [];

  pendingList: any;

  constructor(private router: Router, public DataService: DataService, private http: HttpRestApiService, private constant: AppConstants, private localStorage: LocalStorageService, private pendingReqService: PendingReqService, private location: Location,private ngZone : NgZone, private translatePipe : TranslatePipe,private commonMethods: CommonMethods) { }

  ngOnInit(): void {
    pendingRequest(); // for making class active inactive for the particular tab selection (if not handle by angular)
    this.DataService.changeMessage(this.headerdata);
    this.getPendingRequest();
    history.pushState({}, 'upiDashboard', this.location.prepareExternalUrl("upiDashboard"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    if (this.DataService.enablePendingWithPayerTab) {
      $("#payerTab").tab('show');
    } else {
      $("#meTab").tab('show');
    }
  }

  goToPendingByPayerDetailPage(payeeDetails: PendingByPayer, routeName) {
    console.log(payeeDetails);
    this.DataService.pendingByPayer = payeeDetails;
    this.DataService.enablePendingWithPayerTab = true;
    this.DataService.routeWithNgZone(routeName);
  }

  goToPendingWithMeDetailPage(payeeDetails: PendingWithMe) {
    console.log(payeeDetails);
    this.DataService.pendingWithMe = payeeDetails;
    this.setReqSeen(payeeDetails);
    this.DataService.enablePendingWithPayerTab = false;
    this.DataService.routeWithNgZone('pendingDetailView');
  }

  /**
  * Get PendingRequest List for payee and payer
  */
  getPendingRequest() {
    var reqParams = this.pendingReqService.setPendingRequest();
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
          case this.constant.upiserviceName_PENDINGREQUESTS:
            console.log('PENDINGREQUESTS ', JSON.stringify(response));
            let pendingList = new PendingRequest().deserialize(response.responseParameter);
            // this.pendingWithMeList = pendingList.pendingWithMe;
            this.pendingWithMeList = [];
            var list = [];
            if(this.localStorage.hasKeyLocalStorage('pendingReqTransIDList')){
              list = JSON.parse(this.localStorage.getLocalStorage('pendingReqTransIDList'));
            }
            pendingList.pendingWithMe.map((pendingWithMe) => {
              if (pendingWithMe.frequency != 'ONETIME') {
                if(this.localStorage.hasKeyLocalStorage('pendingReqTransIDList')){
                  if(list.length > 0){
                    list.map((transaction)=>{
                      if(transaction.isSeen && transaction.txnId == pendingWithMe.txnId){
                        pendingWithMe.isSeen = true;
                      }else{
                        list.push({txnId:pendingWithMe.txnId, isSeen :pendingWithMe.isSeen})
                      }
                    })
                  }else{
                    pendingWithMe.isSeen = false;
                    list.push({txnId:pendingWithMe.txnId, isSeen :pendingWithMe.isSeen})
                  }
                }else{
                  pendingWithMe.isSeen = false;
                  list.push({txnId:pendingWithMe.txnId, isSeen :pendingWithMe.isSeen})
                }
                this.pendingWithMeList.push(pendingWithMe); 
              }
            });
            this.pendingWithMeList.forEach(el => {
              el.expiredDateTimeStamp = el.expiredDate;
              el.expiredDate = moment(el.expiredDate).format('DD MMM yyyy, hh:mm A');
              console.log(el.expiredDate);
              el.requestedDate = moment(el.requestedDate).format('DD MMM yyyy, hh:mm A');
            });
            var uniqueArray = this.removeDuplicates(list, "txnId");
            this.localStorage.setLocalStorage('pendingReqTransIDList',JSON.stringify(uniqueArray));
            this.pendingWithPayerList = pendingList.pendingByPayer;
            this.pendingWithPayerList.forEach(el => {
              el.expiredDate = moment(el.expiredDate).format('DD MMM yyyy, hh:mm A');
              console.log(el.expiredDate);
              el.requestedDate = moment(el.requestedDate).format('DD MMM yyyy, hh:mm A');
            });
            // this.pendingWithMeList =response.responseParameter.Pending;
            break;
          default:
            break;
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}




  navigateToPendingRequestDetails(type,payeeDetails: PendingWithMe) {
    switch (type) {
      case 'setReminder':
        this.DataService.isSetReminderClicked = true;
        this.goToPendingWithMeDetailPage(payeeDetails);
        break;
      case 'blockUPIId':
        this.DataService.isBlockUPIIdClicked = true;
        this.DataService.isRejectClicked = false;
        this.goToPendingWithMeDetailPage(payeeDetails);
        break;
      case 'reject':
        this.DataService.isRejectClicked = true;
        this.DataService.isBlockUPIIdClicked = false;
        this.goToPendingWithMeDetailPage(payeeDetails);
        break;

      default:
        break;
    }
  }

   /**
   * Navigate to page by route name
   * @param routeName 
   */
    acceptPendingReq(routeName,payeeDetails: PendingWithMe) {
      if (routeName == 'pendingConfirmation') {
        this.DataService.pendingWithMe = payeeDetails
        // if (!this.DataService.checkIfUPIIdExists(payeeDetails.payerAddress)) {
        //   this.ngZone.run(() => {
        //     this.DataService.information = this.translatePipe.transform('SOMETHING_WENT_WRONG');
        //     this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
        //     this.DataService.primaryBtnText = this.translatePipe.transform('OK');
        //     this.commonMethods.openPopup('div.popup-bottom.show-common-info');
        //   })
        // } else {
          this.setReqSeen(payeeDetails);
          this.DataService.isAcceptClicked = true;
          this.DataService.upiCollectVpaList = [];
          this.router.navigateByUrl('/' + routeName);
        // }
      }
      this.router.navigateByUrl('/' + routeName);
    }

    setReqSeen(payeeDetails){
      var transIDList =[];
      if(this.localStorage.hasKeyLocalStorage('pendingReqTransIDList')){
        transIDList = JSON.parse(this.localStorage.getLocalStorage('pendingReqTransIDList'));
        if(transIDList.length > 0){
          transIDList.map((transactions)=>{
            if(transactions.txnId == payeeDetails.txnId){
              transactions.isSeen = true;
            }
          });
          this.localStorage.setLocalStorage('pendingReqTransIDList',JSON.stringify(transIDList));
        }
      }
    }
}