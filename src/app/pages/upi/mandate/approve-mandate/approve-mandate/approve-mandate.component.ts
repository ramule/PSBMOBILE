import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PendingByPayer, PendingRequest, PendingWithMe } from '../../../../../models/pending-request.model';
import { DataService } from '../../../../../services/data.service';
import { ApproveMandateService } from './approve-mandate.service';
import { AppConstants } from '../../../../../app.constant';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import * as moment from 'moment';

@Component({
  selector: 'app-approve-mandate',
  templateUrl: './approve-mandate.component.html',
  styleUrls: ['./approve-mandate.component.scss']
})
export class ApproveMandateComponent implements OnInit {

  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'APPROVE_MANDATE',
    'footertype': 'none'
  }
  approveMandateList = [];
  pendingWithPayerList = [];
  showapproveMandateList = false;

  constructor(private router: Router,
    public DataService: DataService,
    private location: Location,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private approveMandateService: ApproveMandateService,
    private localStorage: LocalStorageService,
    private translate: TranslatePipe
  ) { }
  // 14 - recurring mandate
  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'upiMandate', this.location.prepareExternalUrl("upiMandate"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.getApproveMandateList();
    // this.approveMandateList = this.DataService.pendingWithMeMandateList;
  }

  goToPage(approveMandateDetail, routeName) {
    // approveMandateDetail.validityStart = moment(approveMandateDetail.validityStart).format('DD/MM/yyyy');
    // approveMandateDetail.validityEnd = moment(approveMandateDetail.validityEnd).format('DD/MM/yyyy');
    this.DataService.approveMandateDetail = approveMandateDetail;
    console.log('this.DataService.approveMandateDetail', this.DataService.approveMandateDetail);
    
    this.DataService.selectedFlow = this.constant.val_npci_approveMandate;
    this.DataService.routeWithNgZone(routeName);
  }

  //API Implementation pending

  /**
   * get All Approve MandateList
   */
  getApproveMandateList() {
    var req = this.approveMandateService.approveMandateListRequest();
    this.UpiApiCall(req);
  }

  /**
 * Common Api Call for collect 
 * @param request 
 */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      console.log("GETMANDATETXNDETAIL =>", data.responseParameter.upiResponse);
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_PENDINGREQUESTS:
            console.log('PENDINGREQUESTS ', JSON.stringify(response));
            let pendingList = new PendingRequest().deserialize(response.responseParameter);
            this.approveMandateList = pendingList.pendingWithMe;

            // Formatting Validating Start and End Date
            for(let i=0 ; i < this.approveMandateList.length ; i++){
              this.approveMandateList[i].validityStart = moment(this.approveMandateList[i].validityStart).format('DD/MM/yyyy');
              this.approveMandateList[i].validityEnd = moment(this.approveMandateList[i].validityEnd).format('DD/MM/yyyy');
              this.approveMandateList[i].expiredDate = moment(this.approveMandateList[i].expiredDate).format('DD/MM/yyyy, hh:mm A');

            }
     
            // this.DataService.pendingWithMeMandateList = this.approveMandateList
            this.showapproveMandateList = this.approveMandateList.find((mandate) => { return mandate.notificationType == 'MANDATE_NOTIFICATION' })
            // this.filterRecords(response);
            break;
          default:
            console.log("default ", response.subActionId);
            break;
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });

  
  }

  
}
