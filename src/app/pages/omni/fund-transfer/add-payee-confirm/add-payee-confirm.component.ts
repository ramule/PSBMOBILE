import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { FormValidationService } from '../../../../services/form-validation.service';
import { AddPayeeService} from '../add-payee/add-payee.service';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { AppConstants } from '../../../../app.constant';
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-add-payee-confirm',
  templateUrl: './add-payee-confirm.component.html',
  styleUrls: ['./add-payee-confirm.component.scss']
})
export class AddPayeeConfirmComponent implements OnInit,OnDestroy {
  customerDtls:any;
  addPayeeObj:any;
  constructor(private router: Router, private form: FormBuilder, public dataService: DataService, private formValidation: FormValidationService,private addPayeeService :AddPayeeService,private http:HttpRestApiService,private storage : LocalStorageService, private constant:AppConstants) { }
  ngOnInit() {
    this.initialization();
  }

  /**
   * Initialization functionality
   */
  initialization(){
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)

    this.dataService.getBreadcrumb('ADD_PAYEE_CONFIRM' , this.router.url)
    this.dataService.addPayeeConfirmObservable.subscribe(customerDtls => this.customerDtls = customerDtls);
    this.dataService.setPageSettings('ADD_PAYEE_CONFIRM');
  }

  /**
   * on cancel click
   */
  cancel(){
    this.router.navigateByUrl('/addPayee');
  }

  /**
   * submit confirmation
   */
  submit(){
    this.dataService.otpSessionPreviousPage = '/addPayeeConfirm';
    this.dataService.screenType = 'addPayee';
    let addBenfParam = this.addPayeeService.getAddBenficiaryParams(this.customerDtls.values, this.customerDtls.bankType,this.customerDtls.amountLimit);
    this.dataService.request = addBenfParam;
    this.dataService.endPoint = this.constant.serviceName_ADDBENEFICIARY;
    this.dataService.otpSessionPreviousPage = "/addPayeeConfirm"
    this.router.navigateByUrl('/otpSession');
  }

  ngOnDestroy(){
    // this.dataService.setPayeeConfirmationDetails({});
  }
}


