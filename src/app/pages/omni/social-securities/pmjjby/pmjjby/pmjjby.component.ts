import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { DatePipe } from '@angular/common';
import { ProfileDetailsService } from '../../../profile/profile-details/profile-details.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { DomSanitizer } from '@angular/platform-browser';
import { PmjjbyService } from './pmjjby.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import * as moment from 'moment';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { Location } from '@angular/common'
declare var cordova: any;
declare var sssCarousel : any ;
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-pmjjby',
  templateUrl: './pmjjby.component.html',
  styleUrls: ['./pmjjby.component.scss']
})
export class PmjjbyComponent implements OnInit {
  pmjjbyForm: FormGroup;
  todayDate: any;
  permanentAdd: any;
  convertedDate: any;
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
    gender : ''
  }
  customOptions: OwlOptions;
  notenrolled: boolean = false;

  constructor(
    private router: Router,
    public dataService: DataService,
    private commonMethod:CommonMethods,
    private datePipe: DatePipe,
    private profileDtlsService: ProfileDetailsService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private domSanitizer: DomSanitizer,
    private pmjjbyService: PmjjbyService,
    private loader:pageLoaderService,
    private translatePipe: TranslatePipe,
    private location : Location,
    ) { }

  ngOnInit(): void {
    // sssCarousel() ;
    this.customOptions = this.dataService.getCustomOptions();
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('PMJJBY' , this.router.url)
    this.dataService.setPageSettings('PMJJBY');
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
    console.log('customer object: ', this.customerObj);
    // this.getProfileDetails();

    this.getJBYAccountDetails();

  }

  goToPage(routeName){
    let date = this.customerObj.custBirthDate.split("-")[0];
    let month = this.customerObj.custBirthDate.split("-")[1];
    let year = this.customerObj.custBirthDate.split("-")[2];
    var convertedDate = new Date(month+'-'+date+'-'+year);
    console.log('converted Date: ', convertedDate);
    // this.router.navigateByUrl('/'+routeName);
  }

  getJBYAccountDetails() {
    this.loader.showLoader()
    var param = this.pmjjbyService.getJBYAccountDetailsCall();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_JBYACCOUNTDETAILS).subscribe(data => {
      console.log(data);
      this.loader.hideLoader();
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        var pmjjbyAccDetailsArr = data.set.records[0];
        console.log('pmjjbyAccDetailsArr: ', pmjjbyAccDetailsArr);
        this.router.navigateByUrl('/pmjjbyRecord', {state: {enrollmentDetails: pmjjbyAccDetailsArr}});
      }
      if(resp.Result == "Not Enrolled to this scheme") {
        this.notenrolled = true;
       
        // let stepindex = 0;
        // console.log("Step index",stepindex)
        // this.pmjjby[stepindex].stepStatus = "completed";
        // this.pmjjby[stepindex].stepActive = false;
        // this.pmjjby[stepindex + 1].stepActive = true;
        // if (this.pmjjby[stepindex + 1].stepStatus != "completed") {
        //   this.pmjjby[stepindex + 1].stepStatus = "inprogress"
        // }
        // this.activeTab = "step" + 2
        // this.curentTabIndex = 2
      }
    });
  }

  openPopUp(value){
    switch(value){
      case 'ageVerification' :
        this.commonMethod.openPopup('div.age-verification');
      break ;

      case 'ageVerify' :
        this.commonMethod.openPopup('div.age-verification2');
      break ;
    }
  }

  closePopup() {
    this.commonMethod.closeAllPopup();
  }

  calculateDateRange() {
    let date = this.customerObj.custBirthDate.split("-")[0];
    let month = this.customerObj.custBirthDate.split("-")[1];
    let year = this.customerObj.custBirthDate.split("-")[2];
    // var convertedDate = new Date(month+'-'+date+'-'+year);
    // /* below condtion is to test popup */
    // // var convertedDate = new Date('01-01-1941');
    // this.dateDiff = this.calculateDiff(convertedDate);
    // var ageDiff = parseInt(""+this.dateDiff/365);
    // console.log('Age difference: ', ageDiff);
    var ageDiff = parseInt(""+moment().diff(year+"-"+month+"-"+date,'years',true))
    // this.getJBYAccountDetails();
    // this.router.navigateByUrl('/pmjjbyDetails', {state: {customerData: this.customerObj, age: ageDiff}});
    if(ageDiff < 50 && ageDiff >= 18) {
      this.router.navigateByUrl('/pmjjbyDetails', {state: {customerData: this.customerObj, age: ageDiff}});
    }
    else {
      this.commonMethod.openPopup('div.age-verification2');
    }
  }

  calculateDiff(dateSent) {
    let currentDate = new Date();
    // dateSent = new Date(dateSent);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  onSchemeDetailsClick() {
    if (!this.dataService.isCordovaAvailable) window.open('https://punjabandsindbank.co.in/content/pradhan-mantri-jeevan-jyoti');
    else cordova.InAppBrowser.open('https://punjabandsindbank.co.in/content/pradhan-mantri-jeevan-jyoti', '_blank', 'location=no');
  }

}
