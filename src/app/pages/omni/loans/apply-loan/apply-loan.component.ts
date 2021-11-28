import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';

declare var emiCalculatorScript:any;

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.scss']
})
export class ApplyLoanComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
  ) { }

  ngOnInit(): void {
 
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    this.DataService.setPageSettings('APPLY_FOR_LOAN');
    this.DataService.getBreadcrumb('APPLY_FOR_LOAN' , this.router.url)
    emiCalculatorScript();
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

}
