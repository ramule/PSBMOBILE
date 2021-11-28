import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { Complaint, ComplaintList } from '../../../../models/complaint-model';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { ComplaintService } from '../complaint/complaint.service';
import { Location } from '@angular/common';
import { RaiseComplaint } from 'src/app/models/raise-complaint.model';
import * as moment from 'moment';

declare var createGlobalNavMore: any;
declare var showToastMessage: any;
declare var dashBoardFooterActive: any;

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {
  complaintList: ComplaintList[] = [];
  raiseComplaint: RaiseComplaint[] = [];
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'COMPLAINT',
    'footertype': 'upiDashboardFooter'
  }
  constructor(private router: Router, public DataService: DataService, private http: HttpRestApiService,
    private constant: AppConstants, private localStorage: LocalStorageService,
    private complaintService: ComplaintService, private location: Location, private ngZone: NgZone,) { }

  ngOnInit(): void {
    dashBoardFooterActive();
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'upiDashboard', this.location.prepareExternalUrl("upiDashboard"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    // let complaintLists = [
    //   {
    //       "feedbackTime": 1610530643000,
    //       "subject": "testRaise",
    //       "customerEmail": "infra@gmail.com",
    //       "complaintType": "Transaction",
    //       "description": "baba",
    //       "entityID": 1,
    //       "mobileNo": "918651125953",
    //       "escalate": "Y",
    //       "transactionID": "PSB8c8598b9a000947abb69f2a85949a2e8",
    //       "complaintNo": 4,
    //       "rrn": "034400201470",
    //       "status": "OPEN"
    //   },
    //    {
    //       "feedbackTime": 1610530643000,
    //       "subject": "testRaise",
    //       "customerEmail": "infra@gmail.com",
    //       "complaintType": "Transaction",
    //       "description": "baba",
    //       "entityID": 1,
    //       "mobileNo": "918651125953",
    //       "escalate": "Y",
    //       "transactionID": "PSB8c8598b9a000947abb69f2a85949a2e8",
    //       "complaintNo": 4,
    //       "rrn": "034400201470",
    //       "status": "CLOSED"
    //   }
    // ]
    // this.complaintList = new ComplaintList().deserialize(complaintLists).complaintList;
    // console.log('complaintList',this.complaintList)
    this.getComplaintLists();
    createGlobalNavMore();
  }

  goToPage(complaint: Complaint, routeName) {
    this.DataService.complaint = complaint;
    this.router.navigateByUrl('/' + routeName);
  }

  /**
  * Get Complaint List
  */
  getComplaintLists() {
    var reqParams = this.complaintService.getComplaintRequest();
    this.UpiApiCall(reqParams);
  }


  /**
  * Common Api Call for complaint 
  * @param request 
  */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_GETCOMPLAINTSFORMOBILE:
            console.log('complaints list ', JSON.stringify(response));
            this.complaintList = new ComplaintList().deserialize(response.responseParameter.complaints).complaintList;
            // this.pendingWithMeList =response.responseParameter.Pending;
            this.complaintList.forEach(el => {
              console.log("INISDE FOREACH");
              // el["feedbackTime"] = new Date(el["feedbackTime"]);
              el["feedbackTime"] = moment(el["feedbackTime"]).format('DD MMM yyyy, hh:mm a');
              // if(el.hasOwnProperty('transactionDate')){
              //   el["transactionDate"] = moment(el["transactionDate"]).format('DD MMM yyyy, HH:mm:ss');
              // }
              console.log(el);
              console.log("========================");
            });
            break;
          default:
            break;
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  goToRaiseComplaint() {
    this.DataService.isRaiseComplaint = false;
    this.DataService.isTrackStatus = false;
    this.router.navigateByUrl('/raiseComplaint');
  }

  routeTo(location) {
    console.log('location', location);
    this.ngZone.run(() => {
      this.router.navigateByUrl(location);
    })
  }

}
