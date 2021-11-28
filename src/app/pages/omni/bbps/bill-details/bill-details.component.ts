import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})
export class BillDetailsComponent implements OnInit {

  constructor(private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods,) { }
    billdetails:any
    renderableData:any
  ngOnInit(): void {
    this.DataService.setPageSettings('BILL_INFO');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('BILL_INFO' , this.router.url)
    this.billdetails = this.DataService.billHistoryDetails 
    this.renderData()
  }
renderData(){
    this.renderableData={
      'shortName' :  this.billdetails.billlist[0].customer_name,
      'logo' : this.billdetails.moreDetails.biller_logo,
      'billerName': this.billdetails.moreDetails.biller_name,
      'paidDate': this.billdetails.txn_date_time,
      'amt': this.billdetails.debit_amount,
      'dueDate': this.billdetails.billlist[0]?.billduedate,
      'billStatus' : this.billdetails.biller_status,
      'loopingData': [
        
        {
          'label':'Bill Category',
          'field':this.billdetails.moreDetails.biller_category
        },
        {
          'label':this.billdetails.billlist[0]?.authenticators[0].parameter_name,
          'field' : this.billdetails.billlist[0]?.authenticators[0].value,
        },
        {
          'label': "Reference Number",
          'field': this.billdetails.bbps_ref_no
        },
        {
        'label': "Payment Type",
        'field' : this.billdetails.payment_type
        }
      ]
    }
}

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

}