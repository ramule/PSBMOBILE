import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import {DatePipe, Location} from '@angular/common'
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { PmsbyDetailsService } from '../pmsby-details/pmsby-details.service';
import { HttpClient } from '@angular/common/http';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
declare var cordova: any;
declare  var  sssCarousel : any
import * as moment from 'moment';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';

import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-pmsby',
  templateUrl: './pmsby.component.html',
  styleUrls: ['./pmsby.component.scss']
})
export class PmsbyComponent implements OnInit {
  todayDate: any;
  dateDiff: any;
  customerObj: any = {
    userName: '',
    mobileNo: '',
    emailId: '',
    custName: '',
    custBirthDate: '',
    accNo: '',
    communicationAdd: '',
    add1: '',
    add2: '',
    cityCode: '',
    addharCard: '',
    panCard: '',
    pin: '',
    gender : '',
  }

  customOptions: OwlOptions;
  constructor(
    private router: Router,
    public dataService: DataService,
    private commonMethod:CommonMethods,
    private datePipe : DatePipe,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private pmsbyDetailsService:PmsbyDetailsService,
    private http:HttpRestApiService,
    private translatePipe: TranslatePipe,
    private location : Location
  ) { }

  dateOfBirth : any ="";
  notEnrolled = false;

  ngOnInit(): void {
    // sssCarousel() ;
    this.customOptions = this.dataService.getCustomOptions();
    this.dataService.setPageSettings('PMSBY');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('PMSBY' , this.router.url);
    console.log('cust profile details: ', this.dataService.profiledateDetails);
    // var previousURL = this.dataService.isCordovaAvailable ? 'dashboardMobile' : 'dashboard';
    var backURL = '';
    if(this.dataService.isCordovaAvailable){
      if(this.dataService.socialSecFromDashboard){
        backURL = 'mobSocialLanding';
      }else{
        backURL = 'dashboardMobile';
      }
    }else{
      backURL = 'dashboard';
    }
    history.pushState({}, backURL, this.location.prepareExternalUrl(backURL));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.customerObj.mobileNo = !this.commonMethod.validateEmpty(this.dataService.profiledateDetails[0].mobileNo) ? this.dataService.profiledateDetails[0].mobileNo : '-';
    this.customerObj.emailId = !this.commonMethod.validateEmpty(this.dataService.profiledateDetails[0].emailId) ? this.dataService.profiledateDetails[0].emailId : '-';
    this.customerObj.custName = !this.commonMethod.validateEmpty(this.dataService.profiledateDetails[0].custName) ? this.dataService.profiledateDetails[0].custName : '-';
    this.customerObj.custBirthDate = !this.commonMethod.validateEmpty(this.dataService.profiledateDetails[0].custBirthDate) ? this.dataService.profiledateDetails[0].custBirthDate : '-';
    if(this.dataService.primaryAccountDtl!=undefined && this.dataService.primaryAccountDtl!="")
    this.customerObj.accNo = this.dataService.primaryAccountDtl.sbAccount;
    else
    {
      
      this.dataService.information = this.translatePipe.transform('NO_ASSOCIATED_PRIMARY_AC');
          this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
          this.dataService.primaryBtnText = this.translatePipe.transform('OK');
      this.commonMethod.openPopup('div.popup-bottom.show-common-info');
      if(this.dataService.isCordovaAvailable){
        this.router.navigateByUrl('/dashboardMobile')
      }else{
        this.router.navigateByUrl('/dashboard')
      }
      return
    }
    this.customerObj.communicationAdd = (this.dataService.profiledateDetails[0].add1 + ', ' + this.dataService.profiledateDetails[0].add2 + ", " + this.dataService.profiledateDetails[0].cityCode).replace(", ,", ",");
    this.customerObj.add1 = this.dataService.profiledateDetails[0].add1 == "" ? this.dataService.profiledateDetails[0].permenantAdd1 : this.dataService.profiledateDetails[0].add1;
    this.customerObj.add2 = this.dataService.profiledateDetails[0].add2 == "" ? this.dataService.profiledateDetails[0].permenantAdd2 : this.dataService.profiledateDetails[0].add2;
    this.customerObj.cityCode = this.dataService.profiledateDetails[0].cityCode;
    this.customerObj.pin = this.dataService.profiledateDetails[0].pin == "" ? this.dataService.profiledateDetails[0].permenantPin : this.dataService.profiledateDetails[0].pin;
    this.customerObj.permanentAdd = "-"//(this.dataService.profiledateDetails[0].permenantAdd1 + ', ' + this.dataService.profiledateDetails[0].permenantAdd2 + ", "+ this.dataService.profiledateDetails[0].permenantCityCode)
    this.customerObj.addharCard = !this.commonMethod.validateEmpty(this.dataService.profiledateDetails[0].aadharNumber) ? this.dataService.profiledateDetails[0].aadharNumber : '-';
    this.customerObj.panCard = !this.commonMethod.validateEmpty(this.dataService.profiledateDetails[0].panNumber) ? this.dataService.profiledateDetails[0].panNumber : '-';
    this.customerObj.gender = !this.commonMethod.validateEmpty(this.dataService.profiledateDetails[0].gender) ? this.dataService.profiledateDetails[0].gender : '-';
    
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.customerObj.userName = this.storage.getLocalStorage(this.constant.storage_username);

    this.getSBYAccountDetails();
  }

  getSBYAccountDetails() {
    var param = this.pmsbyDetailsService.getSBYAccountEnquiryCall();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_SBYACCOUNTINQUIRY).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.notEnrolled = false;
        var pmsbyAccDetailsArr = data.set.records[0];
        console.log('pmsbyAccDetailsArr: ', pmsbyAccDetailsArr);
        this.router.navigateByUrl('/pmsbyRecord', {state: {enrollmentDetails: pmsbyAccDetailsArr}});
      }
      if(resp.Result == "Not Enrolled to this scheme") {
        this.notEnrolled = true;
        sssCarousel() ;
        // let stepindex = 0;
        // console.log("Step index",stepindex)
        // this.pmsby[stepindex].stepStatus = "completed";
        // this.pmsby[stepindex].stepActive = false;
        // this.pmsby[stepindex + 1].stepActive = true;
        // if (this.pmsby[stepindex + 1].stepStatus != "completed") {
        //   this.pmsby[stepindex + 1].stepStatus = "inprogress"
        // }
        // this.activeTab = "step" + 2
        // this.curentTabIndex = 2
      }
    });
  }

  goToPage(routeName) {
    let date = this.customerObj.custBirthDate.split("-")[0];
    let month = this.customerObj.custBirthDate.split("-")[1];
    let year = this.customerObj.custBirthDate.split("-")[2];
    var convertedDate = new Date(month+'-'+date+'-'+year);
    console.log('converted Date: ', convertedDate);
    // this.router.navigateByUrl('/' + routeName);
  }

  openPopUp(value){
    switch(value){
      case 'ageVerification' :
        this.commonMethod.openPopup('div.age-verification');
      break ;

      case 'ageVerify' :
        this.dateOfBirth = this.datePipe.transform( this.dateOfBirth, 'dd-MM-yyyy') ;
        this.commonMethod.openPopup('div.age-verification2');
      break ;

    }
  }

  closePopup(){
    this.commonMethod.closeAllPopup();
  }

  calculateDateRange() {
    let date = this.customerObj.custBirthDate.split("-")[0];
    let month = this.customerObj.custBirthDate.split("-")[1];
    let year = this.customerObj.custBirthDate.split("-")[2];
    var convertedDate = new Date(month+'-'+date+'-'+year);
    /* below condtion is to test popup */
    // var convertedDate = new Date('01-01-1941');
    // this.dateDiff = this.calculateDiff(convertedDate);
    // var ageDiff = parseInt(""+this.dateDiff/365);
    var ageDiff = parseInt(""+moment().diff(year+"-"+month+"-"+date,'years',true))
    console.log('Age difference: ', ageDiff);
    // this.router.navigateByUrl('/pmsbyDetails', {state: {customerData: this.customerObj, age: ageDiff}});
    if(ageDiff < 70 && ageDiff >= 18) {
      this.router.navigateByUrl('/pmsbyDetails', {state: {customerData: this.customerObj, age: ageDiff}});
    }
    else {
      this.commonMethod.openPopup('div.age-verification2');
    }
  }

  calculateDiff(dateSent) {
    let currentDate = new Date();
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  onSchemeDetailsClick() {
    if (!this.dataService.isCordovaAvailable) window.open('https://punjabandsindbank.co.in/content/pradhan-mantri-surakha-beema');
    else cordova.InAppBrowser.open('https://punjabandsindbank.co.in/content/pradhan-mantri-surakha-beema', '_blank', 'location=no');
  }

}
