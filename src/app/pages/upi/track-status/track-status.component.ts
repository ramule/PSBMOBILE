import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { Location } from '@angular/common';
import { PluginService } from '../../../services/plugin-service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { TrackStatusService } from './track-status.service';
import { RaiseComplaint } from 'src/app/models/raise-complaint.model';
import { NpciAndroidService } from '../../../services/npci-android.service';
import { NpciIosService } from '../../../services/npci-ios.service';


@Component({
  selector: 'app-track-status',
  templateUrl: './track-status.component.html',
  styleUrls: ['./track-status.component.scss']
})
export class TrackStatusComponent implements OnInit {

  headerdata = {
    'headerType': 'TitleClose',
    'titleName': 'TRACK_STATUS',
    'footertype': 'none'
  }
  transactionDetails: any;
  transactionId: any;
  trackStatusRes: any;
  complaintDetails: any = {};

  constructor(private router: Router,
    public DataService: DataService,
    private commonMethod: CommonMethods,
    private http: HttpRestApiService,
    public constant: AppConstants,
    private localStorage: LocalStorageService,
    private location: Location,
    private ngZone: NgZone,
    private translatePipe: TranslatePipe,
    private pluginService: PluginService,
    private trackStatusService: TrackStatusService,
    private npciAndroidService: NpciAndroidService,
    private npciIosService: NpciIosService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    this.trackStatusRes = this.DataService.trackStatusRes;
    this.transactionDetails = this.DataService.trackStatus
    if (this.trackStatusRes.COMPLAINT == true) {
      this.complaintDetails = this.trackStatusRes.complaintStatus
    } else {

    }
  }

  /**
 * Raise Complaint
 */
  raiseComplaint() {
    this.DataService.isRaiseComplaint = true;
    if (this.DataService.isTrackStatus == false) {
      this.navigate('raiseComplaintConfirmation');
    } else {
      this.DataService.raiseComplaint = new RaiseComplaint().deserialize({
        rrn: this.transactionDetails.rrn, transactionID: this.transactionDetails.transactionID,
        complaintType: 'TRANSACTION', txnAmount: this.transactionDetails.txnAmount, payerAddress: this.transactionDetails.payerAddress,
        payeeAddress: this.transactionDetails.payeeAddress, transactionDate: this.transactionDetails.transactionDate,
        refID: this.transactionDetails.refID, initiationMode: this.transactionDetails.initiationMode,
        txnStatus: this.transactionDetails.txnStatus, transactionType: this.transactionDetails.transactionType, payeeCode: this.transactionDetails.payeeCode
      });

      this.navigate('raiseComplaint');
    }
  }

  /**
 * Common Api Call for collect 
 * @param request 
 */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (data.responseParameter.upiResponse.subActionId) {
          case this.constant.upiserviceName_TRACKSTATUS:
            this.trackStatusRes = response.responseParameter;
            // if (response.msg) {
            //   showToastMessage(response.msg, "success");
            //   this.ngZone.run(() => {
            //     this.DataService.information = response.msg;
            //     this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
            //     this.DataService.primaryBtnText = this.translatePipe.transform('OK');
            //     this.commonMethod.openPopup('div.popup-bottom.show-common-info');
            //   })
            // }
            break;
          default:
            break;
        }
      } else {
        // showToastMessage(data.msg, "error");
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  /**
     * 
     * @param routeName 
     */
  navigate(routeName: string) {
    // this.router.navigateByUrl(routeName);
    this.DataService.routeWithNgZone(routeName);
  }

}
