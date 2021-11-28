import { NomineeDetailsService } from './../nominee-details/nominee-details.service';
import { NomineeOverviewService } from './nominee-overview.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { Location , DatePipe} from '@angular/common';
import * as moment from 'moment';

declare var showToastMessage: any;

@Component({
  selector: 'app-nominee-overview',
  templateUrl: './nominee-overview.component.html',
  styleUrls: ['./nominee-overview.component.scss']
})
export class NomineeOverviewComponent implements OnInit {

  constructor( 
    private router: Router, 
    public DataService: DataService, 
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private nomineeOverviewService : NomineeOverviewService,
    private location : Location,
    private datePipe : DatePipe,
    private nomineeDetailService : NomineeDetailsService
) { }

accountData : any ;
nomineeList : any = [];
date : any ;
relationname:any;
nomineeAddress1 : any ;
nomineeAddress2 : any ;
stateValue : any ;
cityValue : any ;
stateList : any ;
city : any ;
stateCode : any = '';
cityCode : any = '' ;
nomineeCityList = [] ;
currentDate: any = moment().toDate();
nomineeAge: number = 18;
minorFlag : any ;


ngOnInit(): void {
  this.DataService.setShowThemeObservable(true)
  this.DataService.setShowsideNavObservable(true)
  this.DataService.setShowNotificationObservable(true);
  this.DataService.getBreadcrumb('OVERVIEW' , this.router.url)
  this.accountData = this.location.getState()
  if(this.accountData){
    this.accountData = {}
    this.accountData.account = this.DataService.selectedNomineeAccNo
  }
  console.log("Account Data :: ", this.accountData)
  if(this.DataService.previousPageUrl == "myAccountsInfo" ){
    this.getNomineeDetails() ;
    console.log("Nominee List :: ", this.nomineeList)
  }else{
    this.nomineeList = [this.DataService.nomineeDetailsData ];
    console.log('nominee data coming from add nominee', this.nomineeList);
    this.relationname = this.DataService.nomineeDetailsData.nomineeDtl;
    this.date = this.datePipe.transform(this.DataService.nomineeDetailsData.dob, 'dd/MM/yyyy') ;
    this.nomineeAddress1 = this.DataService.nomineeDetailsData.address1;
    this.nomineeAddress2 = this.DataService.nomineeDetailsData.address2;
    this.stateValue = this.DataService.nomineeDetailsData.stateDtl
    this.cityValue = this.DataService.nomineeDetailsData.cityDtl

  }
  this.DataService.setPageSettings('Nominee Overview');
  history.pushState({}, this.DataService.previousPageUrl, this.location.prepareExternalUrl(this.DataService.previousPageUrl));
  history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
}

updateNominee(){
  this.router.navigateByUrl('/' + 'nomineeDetails', {state : { nominee : this.nomineeList, account :this.accountData.account }});
}

goToPage(routeName){
  this.router.navigateByUrl('/'+routeName);
} 

onDateChange(event) {
  var diff = Math.floor(this.currentDate - event);
  var day = 1000 * 60 * 60 * 24;
  var days = Math.floor(diff / day);
  var months = Math.floor(days / 31);
  this.nomineeAge = Math.floor(months / 12);

  if(this.nomineeAge < 18){
    this.minorFlag = 'Y'
  }else{
    this.minorFlag= 'N'
  }
  this.DataService.minorFlagNominee = this.minorFlag ;
}

  //Nominee function  
  getNomineeDetails(){
    var param = this.nomineeOverviewService.getNomineeData(this.accountData.account, this.DataService.userDetails.cifNumber);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_InquiryNomineeValidation).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log( "Nominneeeeeeeeee ka data 22222222:::::", data.set['records']);
          this.nomineeList = data.set['records'];
       
          // this.stateCode  = this.stateList.find(obj => (obj.ID == this.nomineeList[0]['stateCode']));
          // this.cityCode = this.nomineeCityList.find(obj => (obj.ID == this.nomineeList[0]['cityCode']));
          if(this.nomineeList.nomineeDob != '' && this.nomineeList.nomineeDob !=undefined){
            this.onDateChange( this.datePipe.transform((this.nomineeList[0].nomineeDob).replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"), 'dd/MM/yyyy') ) ;
          }else{
            this.DataService.minorFlagNominee = 'N'
          }
          this.date = this.datePipe.transform((this.nomineeList[0].nomineeDob).replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"), 'dd/MM/yyyy')
          this.relationname = resp.nomineeRelationship 
          this.nomineeAddress1 = this.nomineeList[0].nomineeAddress1;
          this.nomineeAddress2 = this.nomineeList[0].nomineeAddress2;
          this.stateValue = resp.stateCode
          this.cityValue = resp.cityCode
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result, "error");
  }

  nomineeOverviewConfirm(){
    var nomineeDob = this.datePipe.transform(this.DataService.nomineeDetailsData.dob, 'dd-MM-yyyy') ;
    var objCheckFlag = this.DataService.activitySettingData.findIndex(x => x.ACTIVITYNAME == this.DataService.endPoint.split('/')[1]);
    if(this.DataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y') {
      this.DataService.endPoint = this.constant.serviceName_ADDNOMINEEDATA;
      this.DataService.nomineeReceiptObj.nomineeName = this.DataService.nomineeDetailsData.nomineeName 
      this.DataService.nomineeReceiptObj.nomineeRelationship = this.DataService.nomineeDetailsData.nomineeDtl 
      this.DataService.nomineeReceiptObj.address1 = this.DataService.nomineeDetailsData.address1 
      this.DataService.nomineeReceiptObj.address2 = this.DataService.nomineeDetailsData.address2 
      this.DataService.nomineeReceiptObj.dateOfBirth = nomineeDob
      this.DataService.nomineeReceiptObj.minorFlag = this.DataService.nomineeDetailsData.minorFlag 
      this.DataService.nomineeReceiptObj.guardianName = this.DataService.nomineeDetailsData.guardianName 
      this.DataService.nomineeReceiptObj.guardianAddress = this.DataService.nomineeDetailsData.guardianAddress 
      this.DataService.nomineeReceiptObj.state = this.DataService.nomineeDetailsData.stateDtl
      this.DataService.nomineeReceiptObj.city = this.DataService.nomineeDetailsData.cityDtl


  
      this.DataService.authorizeHeader = "Nominee Details";
      this.DataService.screenType = 'nomieeDetails';

      this.router.navigate(['/nomineeAuth']);
      this.DataService.otpName = "OTP"
    }
    else if(this.DataService.activitySettingData[objCheckFlag].TPINALLOWD == 'Y')
    {
      this.DataService.authorizeHeader = "Nominee Details";
      this.DataService.screenType = 'nomieeDetails';
     this.router.navigate(['/nomineeAuth']);
     this.DataService.otpName = "TPIN"
    }
  }


}
