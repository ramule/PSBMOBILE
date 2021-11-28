import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/app.constant';
import * as moment from 'moment';


@Component({
  selector: 'app-direct-tax',
  templateUrl: './direct-tax.component.html',
  styleUrls: ['./direct-tax.component.scss']
})
export class DirectTaxComponent implements OnInit {

  constructor(private router: Router, public dataService: DataService, public constant: AppConstants) { }

  directTaxForm: FormGroup;

  tinDirectTaxLink = "https://onlineservices.tin.egov-nsdl.com/etaxnew/tdsnontds.jsp"

  ngOnInit(): void {
    this.buildForm();
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('DIRECT_TAX' , this.router.url)
    this.dataService.setPageSettings('DIRECT_TAX');
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  buildForm() {
    this.directTaxForm = new FormGroup({
      termsCondition: new FormControl('', [Validators.required]),
    });
  }

  validateForm() {
    if (this.directTaxForm.invalid) {
      this.directTaxForm.get('termsCondition').markAsTouched();
    }
  }



  directTaxSubmit() {
    if (this.directTaxForm.valid) {
      this.router.navigate([]).then(result => { window.open(this.tinDirectTaxLink, '_blank'); });
    }
    else {
      this.validateForm();
    }
  }


}
