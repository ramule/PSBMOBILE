import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { AppConstants } from 'src/app/app.constant';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import {ExistingGetBillService} from './existing-get-bill.service'
@Component({
  selector: 'app-existing-get-bill',
  templateUrl: './existing-get-bill.component.html',
  styleUrls: ['./existing-get-bill.component.scss']
})
export class ExistingGetBillComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods, 
    private constant:AppConstants,
     private storage :LocalStorageService,
     private http:HttpRestApiService,
     private existingBillService : ExistingGetBillService
     ) { }
    billerId
   custId
   billdetails
   billername
  paymentTypeForm: FormGroup;

  ngOnInit(): void {
    this.buildForm();
    this.DataService.setPageSettings('EXISTING_BILLER_PAYMENT');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('EXISTING_BILLER_PAYMENT', this.router.url);
    this.custId =  this.DataService.electricBillObj.custID
    this.billerId =  this.DataService.electricBillObj.billerID
    this.billername = this.DataService.electricBillObj.billername
    this.getBillDetails();
  }


  getBillDetails() {
    let BillDetailsparam = this.existingBillService.getBillDetails(this.custId , this.billerId, 'RetrieveBillService');
    this.http.callBankingAPIService(BillDetailsparam, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
      console.log(JSON.parse(data.responseParameter.bbpsResponse));
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
     
          this.billdetails =JSON.parse(data.responseParameter.bbpsResponse).responseParameter.result
          this.billdetails = JSON.parse(this.billdetails)
         
          console.log('billdetails billdetails : ', JSON.parse(this.billdetails).billid);


      }
      else {
      ///  this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  buildForm() {
    this.paymentTypeForm = new FormGroup({
      paymentMode: new FormControl('', [Validators.required]),
    })
  }

  validateForm(){
    if(this.paymentTypeForm.invalid){
      this.paymentTypeForm.get('paymentMode').markAsTouched();
    }
  }

  existingGetBillSubmit() {
    if(this.paymentTypeForm.valid){
      this.goToPage('existingBillPayment') ;
    } else{ 
      this.validateForm() ;
    }
  }

}
