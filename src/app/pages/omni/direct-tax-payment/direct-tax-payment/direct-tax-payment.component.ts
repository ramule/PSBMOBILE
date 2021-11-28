import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-direct-tax-payment',
  templateUrl: './direct-tax-payment.component.html',
  styleUrls: ['./direct-tax-payment.component.scss']
})
export class DirectTaxPaymentComponent implements OnInit {

  // commonPageComponent = {
  //   'headerType': 'innerHeader',
  //   'sidebarNAv': 'OmniNAv',
  //   'footer': 'innerFooter',
  // }

  constructor( private router:Router, public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.setPageSettings('Direct Tax Payment');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)

    this.dataService.getBreadcrumb('DIRECT_TAX_PAYMENT' , this.router.url)
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

}
