import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-inward-cheque-inquiry-list',
  templateUrl: './inward-cheque-inquiry-list.component.html',
  styleUrls: ['./inward-cheque-inquiry-list.component.scss']
})
export class InwardChequeInquiryListComponent implements OnInit {
  inwardchecks:any;

  constructor(
    private router: Router,
    public DataService: DataService,
  ) { }

  ngOnInit(): void  {
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    this.DataService.getBreadcrumb('INWARD_CHEQUE_INQUIRY_LIST' , this.router.url)
    this.DataService.setPageSettings('INWARD_CHEQUE_INQUIRY_LIST');

      this.initialization();
    // this.interval;


    // this.DataService.inwardcheck.cheque_Number
    // console.log(" this.DataService.inwardcheck.cheque_Number::::::::::",  this.DataService.inwardcheck.cheque_Number);
  }

  initialization(){
    this.inwardchecks= this.DataService.inwardchecklistvalue;
    this.inwardchecks= this.DataService.inwardchecklistvalue;
    console.log("checklist::::::::::",  this.inwardchecks);
    this.inwardchecks.sort((x, y) => +new Date(x.dateOfPassing) - +new Date(y.dateOfPassing));
    console.log( "sorted",this.inwardchecks.sort((x, y) => (x.dateOfPassing) - +new Date(y.dateOfPassing)))
  }

  goToPage(routeName,inwardchecks) {
    this.router.navigateByUrl('/' + routeName,inwardchecks);
  }

  gotoInwardcheckDetail(inwardchecks){
    console.log("InwardCheckDetails:::::::::::::",inwardchecks)
    this.DataService.inwardCheckDetailL=inwardchecks
    this.router.navigate(['/inwardChequeInquiryDetails']);
  }

  // interval=setTimeout(() => {
  //   this.inwardchecks= this.DataService.inwardchecklistvalue;
  //   console.log("checklist::::::::::",  this.inwardchecks);

  // }, 1000);


}
