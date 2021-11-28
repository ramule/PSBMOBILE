import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { HttpRestApiService } from '../../../services/http-rest-api.service';
import { SelectOtherBankService } from './select-other-bank.service';
import { AppConstants } from '../../../app.constant';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage-service.service';


@Component({
  selector: 'app-select-other-bank',
  templateUrl: './select-other-bank.component.html',
  styleUrls: ['./select-other-bank.component.scss']
})

export class SelectOtherBankComponent implements OnInit {
  headerdata = {
    'headerType': 'TitleHeader',  //Options: TitleHeader , preloginHeader
    'titleName':'Select Account',            // Note : add titlename if headerType = TitleHeader
    'footertype':'none' //Options: upiFooter , none
  } 

  bankList: any;

  constructor(public dataService: DataService, public http: HttpRestApiService, public selectOtherBankService: SelectOtherBankService, public constant: AppConstants, private router: Router, private storage: LocalStorageService) { }

  ngOnInit(): void {
    this.dataService.changeMessage(this.headerdata);
    // this.loadBankListFromAPI();

    console.log(this.dataService.accountProviderList);

    this.bankList = this.dataService.accountProviderList;
  }

  loadBankListFromAPI() {
    var requestObj = this.selectOtherBankService.getEncryptedOmniRequestObject();

    this.http.callBankingAPIService(requestObj, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICE, true).subscribe(data => {
      console.log('success', data);
    }, error => {
      console.log("ERROR! ", error);
    });
  }

  goToPage(routeName, param?) {
    console.log('param', param);
    this.dataService.selectedOtherBankName = param; 
    this.router.navigateByUrl('/' + routeName);
  }
  

}
