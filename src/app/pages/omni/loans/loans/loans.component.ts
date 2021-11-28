import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  totalEMIAmt:any;
  totalLoanAmt:any;
  constructor( 
    public dataService: DataService,
    private router: Router,
    ) { }
  commonPageComponent: any;
  myPersonalLoan:any=[];
  myHomeLoan:any=[];
  myVehicleLoan: any=[];


  ngOnInit(): void {
    	 
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)

    this.dataService.getBreadcrumb('LOANS' , this.router.url)
    this.dataService.setPageSettings('LOANS');
    this.initialize();
  }

  
  initialize(){
    this.dataService.customerAccountList.forEach(el => {
      if(el.accountCategory == "HOME LOAN" ){
        el.showBal = false;
        this.myHomeLoan.push(el);
      }
      else if(el.accountCategory == "PERSONAL LOAN"){
        el.showBal = false;
        this.myPersonalLoan.push(el);
      }
      else if(el.accountCategory == "VEHICLE LOAN"){
        el.showBal = false;
        this.myVehicleLoan.push(el);
      }
    });
  }



  navigateToLoanDetails(loanType,loanDetails){
    this.dataService.loanType = loanType;
    loanDetails.totalEMIAmt = this.totalEMIAmt;
    loanDetails.totalLoanAmt = this.totalLoanAmt;
    this.dataService.loanDetails = loanDetails;
    this.router.navigate(['/loanDetails']);
  }

  /**
   * get total loan EMI amount
   * @accountsArray saving or current account list 
   */
  getTotalEMIAmount(loanArray){
    var totalEMIAmt = 0;
    var arr = loanArray;
    for (let index = 0; index < arr.length; index++) {
      totalEMIAmt += Number(arr[index].EMI);
    }
    this.totalEMIAmt = totalEMIAmt;
    return totalEMIAmt;
  }

  /**
   * get total loan amount
   * @accountsArray saving or current account list 
   */
  getTotalLoanAmount(accountsArray){
    var totalLoanAmt = 0;
    var arr = accountsArray;
    for (let index = 0; index < arr.length; index++) {
      totalLoanAmt += Number(arr[index].sbBalance);
    }
    this.totalLoanAmt = totalLoanAmt;
    return totalLoanAmt;
  }
}
