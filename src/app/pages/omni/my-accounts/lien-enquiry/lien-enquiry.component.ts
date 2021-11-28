import { LienEnquiryService } from './lien-enquiry.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';

@Component({
  selector: 'app-lien-enquiry',
  templateUrl: './lien-enquiry.component.html',
  styleUrls: ['./lien-enquiry.component.scss']
})
export class LienEnquiryComponent implements OnInit {

  lienDtl:any = [];
  sum: any = 0;
  constructor( 
    private router: Router, 
    public DataService: DataService,  
    private location : Location,
    private lienEnquiryService : LienEnquiryService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
) { }

accountData : any ;

ngOnInit(): void {
  this.accountData = this.location.getState()
  console.log('Lien =', this.accountData.account)
  this.DataService.setShowThemeObservable(true)
  this.DataService.setShowsideNavObservable(true)
  this.DataService.setShowNotificationObservable(true)
  this.DataService.setPageSettings('LIEN_ENQUIRY');
  this.DataService.getBreadcrumb('LIEN_ENQUIRY' , this.router.url) 
  this.lienEnquiry();
}

goToPage(routeName){
  this.router.navigateByUrl('/'+routeName);
} 


lienEnquiry() {
  var param = this.lienEnquiryService.getLienEnquiry(this.DataService.lienAccSel?.accountNo);
  this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LienEnquiry).subscribe(data => {
    var resp = data.responseParameter;
    if (resp.opstatus == "00") {
      console.log( "lien enquiry service response :", data);
      this.lienDtl = data.set.records;
      this.sum = 0;
      this.lienDtl.forEach(el => {
        this.sum = parseFloat(this.sum) + parseFloat(el.lienAmount)
      });
    }
    else {

    }
  });
}
}
