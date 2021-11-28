import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';
import { MyBorrowingService } from '../../my-accounts/my-borrowings/my-borrowings.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';

@Component({
  selector: 'app-loan-repayment-schedule',
  templateUrl: './loan-repayment-schedule.component.html',
  styleUrls: ['./loan-repayment-schedule.component.scss']
})
export class LoanRepaymentScheduleComponent implements OnInit,AfterViewInit {

  accNo : any;
  loanRepayemtDtl :any;
  overdueAmt : any;
  installmentDue : any;
  constructor(
    public dataService : DataService,
    private router : Router,
    private myBorrowingService : MyBorrowingService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
  ) { }

  ngOnInit(): void {
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)

    this.dataService.getBreadcrumb('REPAYMENT_SCHEDULE' , this.router.url)
    this.dataService.setPageSettings('REPAYMENT_SCHEDULE');
    this.accNo = this.dataService.selLoanAccDtlNo.accountNo;
    this.overdueAmt = parseFloat(this.dataService.loanUserDtl?.pricipalDemandArrears) + parseFloat(this.dataService.loanUserDtl?.interestDemandsArrears) + parseFloat(this.dataService.loanUserDtl?.chargesDemandArrears) + parseFloat(this.dataService.loanUserDtl?.otherChargesDemand)
  }

  ngAfterViewInit(){
    this.getLoanRepaymentSchedule()
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }


  getLoanRepaymentSchedule(){
    var param = this.myBorrowingService.getLoanRepaymentSchedule(this.accNo);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOANREPAYMENTSCHEDULE).subscribe(data => {
      console.log("loan enq resp===>",data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        if (data.hasOwnProperty("set")) {
          this.loanRepayemtDtl = data.set.records[0];
          this.loanRepayemtDtl._flowStartDate = this.setDate(this.loanRepayemtDtl.flowStartDate);
          this.loanRepayemtDtl._nextDemandDate = this.setDate(this.loanRepayemtDtl.nextDemandDate);
          this.loanRepayemtDtl.numberOfFlows = parseInt(this.loanRepayemtDtl?.numberOfFlows);

          //(Number Of Flows – (Next Demand Date - Flow Start Date) / Repayment Frequency Type )
          // nextDemandDate - flowStartDate /
          this.installmentDue = this.getInstallmentDue(this.loanRepayemtDtl);
        }
      }
    });
  }


  getInstallmentDue(loanRepayemtDtl){
    var intallMent;
    var dateDiff = this.dateDiff(loanRepayemtDtl.nextDemandDate,loanRepayemtDtl.flowStartDate )
    switch(loanRepayemtDtl.repaymentFrequencyType){
      case "Daily":
        intallMent = (parseFloat(loanRepayemtDtl.numberOfFlows) - (dateDiff)/1);
        break;
      case "Weekly":
        intallMent = (parseFloat(loanRepayemtDtl.numberOfFlows) - (dateDiff)/7);
        break;
      case "Monthly":
        intallMent = (parseFloat(loanRepayemtDtl.numberOfFlows) - (dateDiff)/30);
        break;
      case "Fortnightly":
        intallMent = (parseFloat(loanRepayemtDtl.numberOfFlows) - (dateDiff)/14);
        break;
      case "Quarterly":
        intallMent = (parseFloat(loanRepayemtDtl.numberOfFlows) - (dateDiff)/90);
        break;
      case "Half-Yearly":
        intallMent = (parseFloat(loanRepayemtDtl.numberOfFlows) - (dateDiff)/182);
        break;
      case "Yearly":
        intallMent = (parseFloat(loanRepayemtDtl.numberOfFlows) - (dateDiff)/365);
        break;
    }
    return Math.ceil(intallMent);
  }

  dateDiff(fromDate,toDate){
    var date1 = new Date(fromDate.slice(4, 6) + '-' +fromDate.slice(6) + '-' + fromDate.slice(0, 4));
    var date2 = new Date(toDate.slice(4, 6) + '-' + toDate.slice(6) + '-' + toDate.slice(0, 4));
    var diff = Math.abs(date1.getTime() - date2.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  }


  setDate(date){
    var validDate;
    var urDate = date.match(/(\d{4})(\d{2})(\d{2})/);
    validDate = urDate[3]+"/"+urDate[2]+"/"+urDate[1];
    return validDate
  }


}
