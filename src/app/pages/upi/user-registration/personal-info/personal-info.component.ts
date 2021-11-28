import { Location } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, NavigationStart, NavigationEnd } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { filter } from 'rxjs/operators';


declare function datepickerLaunch(): any;
declare var $: any;
declare var showisMPINEnabledModal: any;
declare var hideisMPINEnabledModal: any;

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})

export class PersonalInfoComponent implements OnInit {

  personalInfoForm: FormGroup;
  mobileNumber: any;
  isMPINEnabled: any;
  userPersonlaData: any = {
    fl: "",
    em: "",
    isLocalOrApiData: ""
  }
  previousUrl: [];

  headerdata = {
    'headerType': 'UpiMainHeader',  //Options: TitleHeader , preloginHeader
    'titleName': '',            // Note : add titlename if headerType = TitleHeader
    'footertype': 'none' //Options: upiFooter , none
  };

  constructor(
    private form: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private location: Location,
    private translate: TranslatePipe,
    private commonMethod : CommonMethods,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    // this.dataService.removePreLoginFooterCss();
    history.pushState({}, 'LandingPage', this.location.prepareExternalUrl("LandingPage"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.dataService.changeMessage(this.headerdata);
    // if (this.dataService.selectedSim) {
      this.mobileNumber =this.storage.getLocalStorage(this.constant.storage_mobileNo);
    // }
    this.isMPINEnabled = this.storage.getLocalStorage(this.constant.storage_isMPINEnable),
      this.buildForm();
      this.commonMethod.closeAllPopup();
    // datepickerLaunch();
  }

  buildForm() {
    this.personalInfoForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.constant.email_regex)]),
    });

    if (this.dataService.regUPICustData.email_id || this.dataService.regUPICustData.customerName) {
      // var str = this.dataService.regUPICustData.customerName;
      // this.personalInfoForm.get('fullName').markAsTouched();
      // this.personalInfoForm.get('email').markAsTouched();
      this.personalInfoForm.get('fullName').setValidators(Validators.nullValidator);
      this.personalInfoForm.get('email').setValidators(Validators.nullValidator);

      // this.personalInfoForm.get('fullName').clearValidators();
      // this.personalInfoForm.get('email').clearValidators();





      // this.gasBillForm.get('gasProvider').setValidators(Validators.nullValidator);
      // this.gasBillForm.get('gasProvider').updateValueAndValidity();
      // this.gasBillForm.get('gasProvider').disable();

      this.personalInfoForm.patchValue({ fullName: this.dataService.regUPICustData.customerName });
      this.personalInfoForm.patchValue({ email: this.dataService.regUPICustData.email_id });
      this.userPersonlaData.fn = this.dataService.regUPICustData.customerName;
      this.userPersonlaData.em = this.dataService.regUPICustData.email_id;
      this.userPersonlaData.isLocalOrApiData = this.dataService.regUPICustData.isLocalOrApiData;
      // this.personalInfoForm.get('fullName').disable()
      // this.personalInfoForm.controls['fullName'].disable()
      // this.personalInfoForm.get('email').disable()
      // this.personalInfoForm.controls['email'].disable()

      this.personalInfoForm.get('fullName').updateValueAndValidity();
      this.personalInfoForm.get('email').updateValueAndValidity();
    }
  }

  validateForm() {
    if (this.personalInfoForm.invalid) {
      this.personalInfoForm.get('fullName').markAsTouched();
      this.personalInfoForm.get('email').markAsTouched();
      return;
    }
  }

  submitForm() {
    this.validateForm();
    if (this.isMPINEnabled == 'Y') {
      this.showMPINEnabledModal();
    } else {
      // this.validateForm();
      console.log("this.isMPINEnabled", this.isMPINEnabled);
      console.log("this.personalInfoForm.valid", this.personalInfoForm.valid);
      console.log("this.personalInfoForm", this.personalInfoForm);

      if (this.personalInfoForm.valid) {
        console.log("form valid ", this.personalInfoForm.value);
        // this.router.navigate(['/upi-registration/set-mpin']);
        // MobileNo
        // customerName
        // MPIN
        // email_id
        // dateOfBirth
        // gender
        // isBIOMETRICEnable
        this.dataService.regUPICustData.email_id = this.personalInfoForm.value.email
        this.dataService.regUPICustData.customerName = this.personalInfoForm.value.fullName;
        this.router.navigate(['/setMpin']);
      }
    }
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  hideMPINEnabledModal() {
    // $('#isMPINEnabledModel').modal('hide');
    hideisMPINEnabledModal()
    this.router.navigate(['/upiLogin']);
  }

  showMPINEnabledModal() {
    // $('#isMPINEnabledModel').modal('show');
    showisMPINEnabledModal()
  }

  goBack() {
    this.router.navigateByUrl("/LandingPage")
    // this.router.navigateByUrl("/smsVerification")
    // this.router.navigate(["/smsVerification"], { replaceUrl: true, skipLocationChange: true })
    //this.location.back();

  }


}
