import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/app.constant';
import * as moment from 'moment';



@Component({
  selector: 'app-state-tax',
  templateUrl: './state-tax.component.html',
  styleUrls: ['./state-tax.component.scss']
})
export class StateTaxComponent implements OnInit {

  constructor(private router: Router, public dataService: DataService, public constant: AppConstants) { }

  stateTaxForm : FormGroup ;

  ngOnInit(): void {
    this.buildForm();
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('STATE_TAX' , this.router.url)
    this.dataService.setPageSettings('STATE_TAX');
  }

  buildForm() {
    this.stateTaxForm = new FormGroup({
      termsCondition: new FormControl('', [Validators.required]),
    });
  }

  
  validateForm() {
    if (this.stateTaxForm.invalid) {
      this.stateTaxForm.get('termsCondition').markAsTouched();
    }
  }

  stateTaxSubmit() {
    if (this.stateTaxForm.valid) {
      console.log('state tax')
    }
    else {
      this.validateForm();
    }
  }
}
