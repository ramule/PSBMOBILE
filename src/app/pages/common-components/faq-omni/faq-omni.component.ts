import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { FaqOmniService } from './faq-omni.service';

declare var showToastMessage: any;
declare var cordova:any;

@Component({
  selector: 'app-faq-omni',
  templateUrl: './faq-omni.component.html',
  styleUrls: ['./faq-omni.component.scss']
})
export class FaqOmniComponent implements OnInit {

  faqList:any = [];

  constructor(
    private faqOmniService: FaqOmniService,
    private constant: AppConstants,
    private localStorage: LocalStorageService,
    private dataService:DataService,
    private http: HttpRestApiService
  ) { }

    ngOnInit(): void {
      this.getFaqList();
    }

    // to get list of FAQ List

    getFaqList() {
      var req = this.faqOmniService.getFAQList();
      this.faqApiCall(req);
    }

    faqApiCall(param){
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_OMNIFAQ).subscribe(data => {
      console.log("FAQ API RESPONSE => ");
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.set.records);
        data.set.records.forEach(el => {
            this.faqList.push(el);
        });
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result,"error");
  }

   /**
   * navigate to login page
   */
    cancelContact(){
      // window.history.back();
      // this.location.back();
    }

    cancel() {
      window.history.back();
    }

}
