import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
@Component({
  selector: 'app-unpaid-bill-infos',
  templateUrl: './unpaid-bill-infos.component.html',
  styleUrls: ['./unpaid-bill-infos.component.scss']
})
export class UnpaidBillInfosComponent implements OnInit {

  constructor(private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods,) { }
    billdetails:any
    renderableData:any
  ngOnInit(): void {
    this.DataService.setPageSettings('UNPAID_BILL_INFO');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('UNPAID_BILL_INFO' , this.router.url)
    this.billdetails = this.DataService.unpaidbilldetail 
    this.renderData()
  }
renderData(){
    this.renderableData={
      'shortName' :  this.billdetails.billeraccount.short_name,
      'logo' : this.billdetails.moreDetails.biller_logo,
      'billerName': this.billdetails.moreDetails.biller_name,
      'leftDays': this.billdetails.daysLeft,
      'amt': this.billdetails.billlist[0]?.net_billamount,
      'dueDate': this.billdetails.billlist[0]?.billduedate,
      'loopingData': [
        
        {
          'label':'Bill Category',
          'field':this.billdetails.moreDetails.biller_category
        },
        {
          'label':this.billdetails.billlist[0]?.authenticators[0].parameter_name,
          'field' : this.billdetails.billlist[0]?.authenticators[0].value,
        }
      ]
    }
}

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

}