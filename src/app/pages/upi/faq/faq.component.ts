import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service'
import { FaqService } from '../faq/faq.service';
declare var faq: any;
declare var showToastMessage: any;

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName':'FAQ',
    'footertype':'none'
  }
  faqList: any;
  constructor( private router:Router, 
    public DataService: DataService,
    public localStorage: LocalStorageService,
    public constant: AppConstants,
    public http: HttpRestApiService,
    public faqService: FaqService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    faq();
    this.getFaqList();
  }
  // to get list of FAQ List

  getFaqList() {
    var req = this.faqService.getFaqRequest();
    this.UpiApiCall(req);
  }

  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      console.log(data);
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_GETFAQ:
            this.faqList = response.responseParameter.FAQ;
            break;
        }
      } else {
        switch (response.subActionId) {
          case this.constant.upiserviceName_GETFAQ:
            // showToastMessage(response.msg, "error");
            break;
          default:
            break;
        }
      }
    }, error=> {
      console.log("ERROR!", error);
    });
  }

}
