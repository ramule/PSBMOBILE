import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';

@Component({
  selector: 'app-fast-tag',
  templateUrl: './fast-tag.component.html',
  styleUrls: ['./fast-tag.component.scss']
})
export class FastTagComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods

  ) { }

  rechargeTypeOption = [
    { 'vechicleType': 'Vehical Recharge', 'vechicleValue': 'vechical' },
    { 'vechicleType': 'CUG Wallet Recharge', 'vechicleValue': 'cug' },

  ]
  fastTagCugForm: FormGroup
  fastTagVechicleForm: FormGroup

  rechargeType = ''

  ngOnInit(): void {
    this.buildForm()
    this.DataService.setPageSettings('FASTTAG');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('FASTTAG', this.router.url)
  }

  buildForm() {
    this.fastTagVechicleForm = new FormGroup({
      vechicalNumber: new FormControl('', [Validators.required]),
      rechargeAmount: new FormControl('', [Validators.required]),
    })

    this.fastTagCugForm = new FormGroup({
      customerID: new FormControl('', [Validators.required]),
      thresholdAmount: new FormControl('', [Validators.required]),
      rechargeAmount: new FormControl('', [Validators.required]),
    })

    this.rechargeOptionValidate(this.rechargeType);
  }

  validateForm(e) {
    switch (e) {
      case 'vechical':
        if (this.fastTagVechicleForm.invalid) {
          this.fastTagVechicleForm.get('vechicalNumber').markAsTouched();
          this.fastTagVechicleForm.get('rechargeAmount').markAsTouched();
          return;
        }
        break;

      case 'cug':

        if (this.fastTagCugForm.invalid) {
          this.fastTagCugForm.get('customerID').markAsTouched();
          this.fastTagCugForm.get('thresholdAmount').markAsTouched();
          this.fastTagCugForm.get('rechargeAmount').markAsTouched();

          return;
        }
        break;
    }


  }


  rechargeOptionValidate(e) {
    switch (e) {
      case 'vechical':
        this.fastTagVechicleForm.get('vechicalNumber').setValidators([Validators.required]);
        this.fastTagVechicleForm.get('rechargeAmount').setValidators([Validators.required]);

        this.fastTagCugForm.get('customerID').clearValidators();
        this.fastTagCugForm.get('thresholdAmount').clearValidators();
        this.fastTagCugForm.get('rechargeAmount').clearValidators();

        break;

      case 'cug':
        this.fastTagCugForm.get('customerID').setValidators([Validators.required]);
        this.fastTagCugForm.get('thresholdAmount').setValidators([Validators.required]);
        this.fastTagCugForm.get('rechargeAmount').setValidators([Validators.required]);

        this.fastTagVechicleForm.get('vechicalNumber').clearValidators();
        this.fastTagVechicleForm.get('rechargeAmount').clearValidators();
        break;
    }
  }

  onSelectOption(e) {
    console.log("FAST TAG : ", e)
    this.rechargeType = e
    this.rechargeOptionValidate(e);
  }

  fastTagSubmit() {
    this.rechargeOptionValidate(this.rechargeType)
    switch (this.rechargeType) {
      case 'vechical':
        if (this.fastTagVechicleForm.valid) {
          this.goToPage('retailFastTagPayment')
        } else {
          this.validateForm(this.rechargeType)
        }
      break;

      case 'cug':
        if (this.fastTagCugForm.valid) {
          this.goToPage('retailFastTagPayment')
        } else {
          this.validateForm(this.rechargeType)
        }
      break;
    }
  }


  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }
}
