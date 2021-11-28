import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cheque-status-list',
  templateUrl: './cheque-status-list.component.html',
  styleUrls: ['./cheque-status-list.component.scss']
})
export class ChequeStatusListComponent implements OnInit {

  constructor(
    public dataService: DataService,
    private commonMethod: CommonMethods,
    private location: Location,
    private router: Router
    ) { }

    chequeInquiryList:any = [];
    bulkcheck:any;
    singlecheck:any;

  ngOnInit(): void {
    console.log("this.dataService.chequeInquiryList" + JSON.stringify(this.dataService.singleChequeInquiryList));
    this.dataService.setPageSettings('My Cheque Book');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true),
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('MY_CHEQUE_BOOK' , this.router.url)
    history.pushState({}, this.dataService.previousPageUrl, this.location.prepareExternalUrl(this.dataService.previousPageUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    console.log("singlecheck",this.dataService.singleChequeNumber);
    this.bulkcheck= this.dataService.bulkChequeInquiryList
    this.singlecheck= this.dataService.singleChequeInquiryList
    console.log("bulkcheck", this.bulkcheck);

  }

  goToPage(pagname){
    this.router.navigateByUrl('/' + pagname);
  }


}
