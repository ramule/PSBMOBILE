import { Component, NgZone, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { AppConstants } from '../../../app.constant';
import { BenificiaryService } from '../benificiary/benificiary.service';
import { HttpRestApiService } from '../../../services/http-rest-api.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';


declare var createGlobalNavMore: any;

@Component({
  selector: 'app-search-favorite-payee',
  templateUrl: './search-favorite-payee.component.html',
  styleUrls: ['./search-favorite-payee.component.scss']
})
export class SearchFavoritePayeeComponent implements OnInit {

  headerdata = {
    'headerType': 'TitleClose',
    'titleName':'Recents',
    'footertype':'none'
  } 
  beneficiaryList: any;
  searchBeneficiaries = '';

  constructor(private router: Router, public dataService: DataService, private location: Location, public constant: AppConstants, private beneficiaryService: BenificiaryService, private http: HttpRestApiService, private storage:LocalStorageService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.dataService.changeMessage(this.headerdata);
    history.pushState({}, 'upiDashboard', this.location.prepareExternalUrl('upiDashboard'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    createGlobalNavMore();
    this.beneficiaryListData();
  }

  beneficiaryListData(){
    this.beneficiaryList= this.dataService.recentBeneficiaryList;
    this.beneficiaryList = this.dataService.getContactListColour(this.beneficiaryList);
    console.log(" Beneficiary List with Color Code : ", this.beneficiaryList)
  }

  navigateToRecentTransaction(recentTransaction) {
    if (recentTransaction.txnMode == 'ACCOUNT') {
      recentTransaction.beneVpa = recentTransaction.beneVpa ? recentTransaction.beneVpa : recentTransaction.beneAccount + "@" + recentTransaction.beneIfsc + ".ifsc.npci";
    }
    this.dataService.recentTransactionUPI = recentTransaction;
    this.dataService.routeWithNgZone('/recentTransaction');
  }
}
