import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { UPIBankAccount } from 'src/app/models/account-detail-model';
import { MandateRequest } from 'src/app/models/mandate-model';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { PluginService } from 'src/app/services/plugin-service';
import { DataService } from '../../../../../services/data.service';
import { RequestMandateService } from '../request-mandate/request-mandate-service';
declare var mandate: any;

@Component({
  selector: 'app-request-mandate-confirmation',
  templateUrl: './request-mandate-confirmation.component.html',
  styleUrls: ['./request-mandate-confirmation.component.scss']
})
export class RequestMandateConfirmationComponent implements OnInit {

  headerdata = {
    'headerType': 'TitleClose',
    'titleName': 'CONFIRMATION',
    'footertype': 'none'
  }
  requestMandate: MandateRequest;
  constructor(private router: Router, public DataService: DataService, private pluginService: PluginService, private requestMandateService: RequestMandateService, private http: HttpRestApiService, private constant: AppConstants, private localStorage: LocalStorageService,private location : Location) { }
  //requestMandateSuccess
  ngOnInit(): void {
    history.pushState({}, 'requestMandatePayment', this.location.prepareExternalUrl("requestMandatePayment"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.DataService.changeMessage(this.headerdata);
    this.requestMandate = this.DataService.requestMandate;

  }

  goToPage(routeName) {
    // this.router.navigateByUrl('/' + routeName);
    this.DataService.routeWithNgZone(routeName);
  }

  /**
   * Request Mandate
   */
  requestTheMandate() {
    this.pluginService.getTransactionId().subscribe((transactionID) => {
      let req = this.requestMandateService.requestMandate(transactionID);
      this.UpiApiCall(req);
    });
  }

  /**
  * Common Api Call for create mandate 
  * @param request 
  */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      this.DataService.requestMandateResp = response;
      this.DataService.upiCallTransactionHistoryApi = true;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_COLLECTMANDATE:
            this.goToPage('requestMandateSuccess');
            break;
          default:
            break;
        }
      } else {

      }
    }, error => {
      console.log("ERROR!", error);
    });
  }
}
