import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-inward-cheque-inquiry-details',
  templateUrl: './inward-cheque-inquiry-details.component.html',
  styleUrls: ['./inward-cheque-inquiry-details.component.scss']
})
export class InwardChequeInquiryDetailsComponent implements OnInit {
  newinwardDetail:any;
  constructor(
    private router: Router,
    public DataService: DataService,
  ) { }

  ngOnInit() {
    // this.DataService.setPageSettings('Inward Cheque Inquiry Details');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    this.DataService.getBreadcrumb('INWARD_CHEQUE_INQUIRY_DETAILS' , this.router.url)
    this.DataService.inwardCheckDetailL
    this.newinwardDetail= this.DataService.inwardCheckDetailL
    console.log(" this.newinwardDetail:::::::::::::", this.newinwardDetail)

  }


  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }
  cancel(){
    this.router.navigate(['/inwardChequeInquiryList']);
  }

}
