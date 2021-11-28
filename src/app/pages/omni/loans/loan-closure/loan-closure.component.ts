import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loan-closure',
  templateUrl: './loan-closure.component.html',
  styleUrls: ['./loan-closure.component.scss']
})
export class LoanClosureComponent implements OnInit {

  nextStep : boolean = false ;
  
  constructor(
    public dataService : DataService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)

    this.dataService.getBreadcrumb('LOAN_CLOSURE_PRE_CLOSURE' , this.router.url)
    this.dataService.setPageSettings('LOAN_CLOSURE_PRE_CLOSURE');
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  calculateClosure(){
    this.nextStep = true ;
  }

}
