import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from '../../../../utilities/common-methods';
import { SocialSecurityLandingPageService } from './social-security-landing-page.service';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { AccountOpeningStepsService } from '../../pre-login/account-opening/account-opening-steps/account-opening-steps.service';
import { DropDownMaster, AccountOpeningSteps } from '../../../../utilities/app-enum';
import { DatePipe, Location } from '@angular/common';
import { FontBase64 } from 'src/app/utilities/app-enum';
import * as jsPDF from 'jspdf';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';

declare var cordova: any;
declare var OSREC: any;
declare var sssCarousel : any ;
import * as moment from 'moment';

@Component({
  selector: 'app-social-security-landing-page',
  templateUrl: './social-security-landing-page.component.html',
  styleUrls: ['./social-security-landing-page.component.scss']
})
export class SocialSecurityLandingPageComponent implements OnInit {

  dateOfBirth : any ="";
  custDOB:any='';
  apyDataObj:any;
  receiptType:any;
  receiptmsg:any;
  todayDateTime:any;
  currentDate: any = moment().toDate();
  nomineeAge: number = 18;
  formattedDate:any;
  userBirthDate:any;
  Day = 1000 * 60 * 60 * 24;
  dateDiff:any;
  enrollmentExist:boolean = false;
  maturityDateVal:any;
  relationShipList: any;
  gardianTypeList:any;
  profileDetailsData:any;
  apyInquiryResponseData:any;
  maritalStatus:any;
  premiumFreq:any;
  relationshipDesc:any;
  totalAccountList: any = [];

  customOptions: OwlOptions;

  refTransJson: any = [
    {
      'key': 'Transaction ID',
      'value': ''
    }
  ];

  receiptApyJson: any = [
    {
      'key': 'Name',
      'value': ''
    },
    {
      'key': 'Date of Birth',
      'value': ''
    },
    {
      'key': 'Nominee Name',
      'value': ''
    },
    {
      'key': 'Debit Account',
      'value': ''
    },
    {
      'key': 'Pension Amount',
      'value': ''
    },
    {
      'key': 'Premium Frequency',
      'value': ''
    }
  ];

  constructor(
    private router: Router, public DataService: DataService,
    private commonMethod:CommonMethods,
    private socialSecurityService: SocialSecurityLandingPageService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    public accOpeningService: AccountOpeningStepsService,
    private datepipe: DatePipe,
    private location: Location,
  ) { }


  ngOnInit(): void {
    // sssCarousel();
    this.customOptions = this.DataService.getCustomOptions();
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('APY' , this.router.url)
    this.DataService.setPageSettings('APY');
    this.profileDetailsData = this.DataService.profiledateDetails;
    console.log("customerFetchDetailInsocialsecurity::::::::",this.DataService.profiledateDetails);
    //this.calculateDateRange();
    this.maturityDate();
    console.log(this.maturityDateVal);

    this.getRelationShip();
    this.getGardianType();

    this.receiptType = this.DataService.receiptType;
    this.receiptmsg = this.DataService.receiptmsg;
    this.apyDataObj = this.DataService.transactionReceiptObj;
    console.log(this.apyDataObj);
    this.todayDateTime = this.datepipe.transform(new Date(), 'ddMMyyyyhhmmss');
    this.refTransJson[0].value = this.DataService.receipdRefID;
    this.totalAccountList = this.DataService.customerOperativeAccList;
    console.log(this.totalAccountList);

    //console.log(this.DataService.userDetails.customerId);
    var param = this.socialSecurityService.apyDetailsAllParam();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_APYREGINQUIRY, false, {showErrorPopup:false}).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;

      if (resp.opstatus == "00") {
        this.enrollmentExist = true;
        console.log(data.responseParameter);
        if (data.hasOwnProperty('set')) {
          this.apyInquiryResponseData = data.set.records;
          console.log(this.apyInquiryResponseData);
          if(this.apyInquiryResponseData[0].maritalStatus == 'Y'){
            this.maritalStatus = 'Married';
          }else{
            this.maritalStatus = 'Unmarried';
          }

          if(this.apyInquiryResponseData[0].frequency == 'MON'){
            this.premiumFreq = 'Monthly';
          }

          if(this.apyInquiryResponseData[0].nomineeRelation){
            var relationship = this.relationShipList.find(e => e.ref_code === this.apyInquiryResponseData[0].nomineeRelation);
            this.relationshipDesc = relationship.DESCRIPTION;
          }

          console.log('Relationship',this.relationShipList.find(e => e.ref_code === this.apyInquiryResponseData[0].nomineeRelation));

        }
      }
      if(resp.Result == "Not Enrolled to this scheme") {
        sssCarousel();
      }
    });

    // var previousURL = this.DataService.isCordovaAvailable ? 'dashboardMobile' : 'dashboard';
    var backURL = '';
    if(this.DataService.isCordovaAvailable){
      if(this.DataService.socialSecFromDashboard){
        backURL = 'mobSocialLanding';
      }else{
        backURL = 'dashboardMobile';
      }
    }else{
      backURL = 'dashboard';
    }
    history.pushState({}, backURL, this.location.prepareExternalUrl(backURL));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

  }

  convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear() ].join("-");
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  // openPopUp(value){
  //   switch(value){
  //     case 'ageVerification' :
  //       this.commonMethod.openPopup('div.age-verification');
  //     break ;

  //     case 'ageVerify' :
  //       this.dateOfBirth = this.convertDate(this.dateOfBirth);
  //       this.commonMethod.openPopup('div.age-verification2');
  //     break ;

  //   }
  // }

  closePopup(){
    this.commonMethod.closeAllPopup();

  }

  // openPopUpss(){
  //   this.commonMethod.openPopup('div.age-verification2ss');

  // }

  // ToDateChange(event){
  //   console.log("eventsssssssssssssssss",event);

  //   var diff = Math.floor(this.inwardChequeInquiryForm.value.fromDate - this.inwardChequeInquiryForm.value.toDate);
  //   var day = 1000 * 60 * 60 * 24;

  //   var days = Math.floor(diff / day);
  //   var months = Math.floor(days / 31);
  //   this.toDate = Math.floor(months / 12);

  //   console.log("this.toDate: " + this.toDate)
  //   // if(this.toDate==0)
  //   // {
  //   //  alert("please selet right date")
  //   // }
  //   }


// a and b are javascript Date objects
dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / this.Day);
}

calculateDateRange() {
  var dateData = this.DataService.profiledateDetails[0].custBirthDate;
  // let date = this.customerObj.custBirthDate.split("-")[0];
  // let month = this.customerObj.custBirthDate.split("-")[1];
  // let year = this.customerObj.custBirthDate.split("-")[2];
  let date = dateData.split("-")[0];
  let month = dateData.split("-")[1];
  let year = dateData.split("-")[2];
  console.log(year);
  var convertedDate = new Date(month+'-'+date+'-'+year);
  /* below condtion is to test popup */
  // var convertedDate = new Date('01-01-1941');
  this.dateDiff = this.calculateDiff(convertedDate);
  var ageDiff = parseInt(""+this.dateDiff/365);
  console.log('Age difference: ', ageDiff);

if(ageDiff < 18 || ageDiff >= 40) {
    this.commonMethod.openPopup('div.age-verification2ss');
    //this.router.navigateByUrl('/pmjjbyDetails', {state: {customerData: this.customerObj}});
  }
  else {
    this.router.navigate(['/apyDetails']);
  }

}

calculateDiff(dateSent) {
  let currentDate = new Date();
  // dateSent = new Date(dateSent);
  return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
}

maturityDate(){
  var dateData = this.DataService.profiledateDetails[0].custBirthDate;

  let date = dateData.split("-")[0];
  let month = dateData.split("-")[1];
  let year = dateData.split("-")[2];
  let maturityYear = Number(year) + 60;
  console.log(maturityYear);
  let string = String(maturityYear);
  var modifiedDate = date+'-'+month+'-'+string;
  console.log(modifiedDate);
  this.maturityDateVal = modifiedDate;
  //console.log(typeof string);
  //console.log(string);
  //var convertedDate = new Date(month+'-'+date+'-'+string);
  //console.log(convertedDate);

}



  openPopUpss() {
    this.calculateDateRange();
    //this.router.navigate(['/apyDetails']);

    // test it
// const a = new Date("2017-01-01"),
// b = new Date("2017-07-25"),
// // const a = new Date("01-01-2017"),
// // b = new Date("25-07-2017"),
// difference = this.dateDiffInDays(a, b);
// console.log(difference);
// console.log(new Date(this.DataService.profiledateDetails[0].custBirthDate));

//        this.formattedDate = moment(this.currentDate).format('DD-MM-YYYY');
//        this.userBirthDate = moment(this.DataService.profiledateDetails[0].custBirthDate);
//        console.log(this.userBirthDate);
//        console.log(this.DataService.profiledateDetails);
//       console.log("formattedDate",this.formattedDate);
//       console.log('userBirthDate', this.DataService.profiledateDetails[0].custBirthDate);
//       console.log(new Date(this.formattedDate));

//       console.log(typeof  this.DataService.profiledateDetails[0].custBirthDate)
//       console.log(new Date(this.DataService.profiledateDetails[0].custBirthDate))
//       //var userBirthDate = this.DataService.profiledateDetails[0].custBirthDate;
//       //var diff = Math.floor( Date.parse(this.formattedDate) -  Date.parse(userBirthDate));
//       console.log(Date.parse(this.formattedDate));
//       console.log(Date.parse(this.DataService.profiledateDetails[0].custBirthDate));
//       var diff = Math.floor(this.formattedDate - this.userBirthDate);
//       console.log(diff);
//       var day = 1000 * 60 * 60 * 24;
//       var days = Math.floor(diff / day);
//       console.log("diff",diff);
//       var months = Math.floor(days / 31);
//       console.log("mothsssss:",months)
//       this.nomineeAge = Math.floor(months / 12);

//        console.log("this.nomineeAge: " + this.nomineeAge)
//       if (this.nomineeAge > 18 && this.nomineeAge<50) {
//         console.log("Not Eligible for apy")
//         this.commonMethod.openPopup('div.age-verification2ss');

//       } else {
//         console.log("Eligible for apy")
//         this.router.navigate(['/apyDetails']);
//         $('#guardian').slideUp();
//       }

    }

    getRelationShip() {
      var param = this.accOpeningService.getDropDownMasterParam(DropDownMaster.GUARDIAN_TYPE);
      this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETREFCODE).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          if (data.hasOwnProperty('listofDataset')) {
            this.relationShipList = data.listofDataset[0].records;
            console.log(this.relationShipList);

            console.log(this.relationShipList.find(e => e.ref_code === 'DAU'));


          }
        }
        else {
          this.relationShipList = [
            { "DESCRIPTION": "Father", "ref_code": "1" },
            { "DESCRIPTION": "Mother", "ref_code": "2" },
            { "DESCRIPTION": "Daughter", "ref_code": "3" },
            { "DESCRIPTION": "Son", "ref_code": "4" },
            { "DESCRIPTION": "Brother", "ref_code": "5" },
            { "DESCRIPTION": "Sister", "ref_code": "6" }
          ]
          this.errorCallBack(data.subActionId, resp);
        }
      });
    }

    getGardianType() {
      var param = this.accOpeningService.getDropDownMasterParam(DropDownMaster.GUARDIAN_TYPE);
      this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETREFCODE).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          if (data.hasOwnProperty('listofDataset')) {
            this.gardianTypeList = data.listofDataset[0].records;
            console.log(this.gardianTypeList);
            console.log(this.gardianTypeList.find(e => e.ref_code === 'DAU'));
          }
        }
        else {
          this.gardianTypeList = [
            { "DESCRIPTION": "Father", "ref_code": "1" },
            { "DESCRIPTION": "Mother", "ref_code": "2" },
            { "DESCRIPTION": "grandFather", "ref_code": "3" },
            { "DESCRIPTION": "Uncle", "ref_code": "4" }
          ]
          this.errorCallBack(data.subActionId, resp);
        }
      });
    }

    shareDetails() {
      this.shareViaMail();
    }
    /**
     * share details via mail in desktop
     */
    shareViaMail() {
      let details = this.getValuesToSend();
      window.open('mailto:?subject=Receipt&body=' + details);
    }
    /**
     * Get selected values from account details
     */
    getValuesToSend() {
      let selectedFields = "";


      selectedFields += "Name :" + this.profileDetailsData[0].custName + ", ";
      selectedFields += "Date of Birth :" + this.profileDetailsData[0].custBirthDate + ", ";
      selectedFields += "Nominee Name :" + this.apyInquiryResponseData[0].nomineeName + ", ";
      selectedFields += "Debit Account :" + this.apyInquiryResponseData[0].fromAccountNo + ", ";
      selectedFields += "Pension Amount :" + this.apyInquiryResponseData[0].pensionAAmount + ", ";
      selectedFields += "Premium Frequency :" + this.apyInquiryResponseData[0].frequency + ", ";

      return selectedFields.replace(/,\s*$/, "");
    }

    // downloadPdfReceipt(type) {
    //   if (this.DataService.receiptType == this.constant.val_Successful) {
    //     var imgColor = 'success';
    //   }
    //   else {
    //     imgColor = 'failed';
    //   }


    //   //if(this.dataService.screenType == "apyOtpAuth"){
    //     console.log(this.apyInquiryResponseData[0].fromAccountNo);
    //     var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.apyInquiryResponseData[0].fromAccountNo);
    //     console.log('selected account details : ', selAccDtl);

    //     // this.receiptApyJson[0].value = this.apyDataObj.name;
    //     // this.receiptApyJson[1].value = this.apyDataObj.dob;
    //     // this.receiptApyJson[2].value = this.apyDataObj.nomineeName;
    //     // this.receiptApyJson[3].value = this.apyDataObj.debitAcc;
    //     // this.receiptApyJson[4].value = this.apyDataObj.pensionAmt;
    //     // this.receiptApyJson[5].value = this.apyDataObj.premiumFreq;

    //     this.receiptApyJson[0].value = this.profileDetailsData[0].custName;
    //     this.receiptApyJson[1].value = this.profileDetailsData[0].custBirthDate;
    //     this.receiptApyJson[2].value = this.apyInquiryResponseData[0].nomineeName;
    //     this.receiptApyJson[3].value = this.apyInquiryResponseData[0].fromAccountNo;
    //     this.receiptApyJson[4].value = this.apyInquiryResponseData[0].pensionAAmount;
    //     this.receiptApyJson[5].value = this.apyInquiryResponseData[0].frequency;
    //     var branchJSON = [
    //       { 'key': 'Branch Name', 'value': selAccDtl[0].branch_name },
    //       { 'key': 'Branch Code', 'value': selAccDtl[0].branchCode },
    //       { 'key': 'Branch Address', 'value': selAccDtl[0].BRANCHADDRESS },
    //       { 'key': 'Branch Contact', 'value': selAccDtl[0].phone_number },
    //       { 'key': 'IFSC', 'value': selAccDtl[0].ifscCode },
    //     ];

    //     this.commonMethod.generatePDF(imgColor, this.receiptType, this.DataService.receiptmsg, this.refTransJson, this.receiptApyJson, 'APY', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);

    //   //}
    // }

    downloadPdfReceipt(type?: any) {

      var pdfsize = 'a4';
      var doc = new jsPDF();

      var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
      var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
      var img = new Image()
      img.src = 'assets/images/psb-logo-new.png';
      doc.addImage(img, 'png', 20, 16, 60, 15);
      doc.setLineWidth(0.5);
      doc.line(90, 7, 90, 40); // vertical line

      doc.setFontSize(15);
      doc.text("Atal Pension Yojana(APY)", pageWidth - 110, 20, 'left');
      //doc.text("Yojana(PMJJBY)", pageWidth - 110, 27, 'left');

      doc.setFontSize(7);
      doc.setLineWidth(0.1);
      doc.line(15, 45, pageWidth-15, 45);

      // add the font to jsPDF
      doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
      doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
      doc.setFont("Sakalbharati");

      doc.setFontSize(16);
      doc.text("Scheme Details", 20, 60, 'left');

      doc.setLineWidth(0.2);
      doc.rect(15, 70, doc.internal.pageSize.width - 30, 60, 'S');

      doc.setFontSize(10);

      /* First line setting */
      doc.text("Scheme Name", 20, 80, 'left');
      doc.text("Atal Pension Yojana(APY)", 20, 85, 'left');
      //doc.text("Bima Yojana(PMJJBY)", 20, 89, 'left');

      doc.text("Name", 90, 80, 'left');
      var splitTitle = doc.splitTextToSize(this.DataService.userDetails?.customerName, 50);
      doc.text(splitTitle, 90, 85, 'left');

      doc.text("Date Of Birth", 155, 80, 'left');
      doc.text(this.DataService.profiledateDetails[0].custBirthDate, 155, 85, 'left');

      /* Second line setting */
      doc.text("Policy Number", 20, 100, 'left');
      doc.text(this.apyInquiryResponseData[0].pranNo, 20, 105, 'left');

      doc.text("Premium Amount", 90, 100, 'left');
      doc.text(OSREC.CurrencyFormatter.format(this.apyInquiryResponseData[0].premiumAmount, { currency: 'INR', symbol: '₹' }), 90, 105, 'left');

      doc.text("Debit Account", 155, 100, 'left');
      doc.text(this.apyInquiryResponseData[0].fromAccountNo, 155, 105, 'left');

      /* Third line setting */
      doc.text("Date Of Enrollment", 20, 120, 'left');
      doc.text(this.apyInquiryResponseData[0].nomineeDob ? this.apyInquiryResponseData[0].nomineeDob : '-', 20, 125, 'left');

      doc.text("Maturity Date", 90, 120, 'left');
      doc.text(this.maturityDateVal ?  this.maturityDateVal : '-', 90, 125, 'left');

      //doc.text("Renewal Due On", 155, 120, 'left');
      //doc.text(this.enrollmentDetailsData.tranDate ? this.enrollmentDetailsData.tranDate : '-', 155, 125, 'left');


      doc.setFontSize(16);
      doc.text("Nominee Details", 20, 150, 'left');

      doc.setLineWidth(0.2);
      doc.rect(15, 160, doc.internal.pageSize.width - 30, 60, 'S');

      doc.setFontSize(10);

      /* First line setting */
      doc.text("Nominee Name", 20, 170, 'left');
      doc.text(this.apyInquiryResponseData[0].nomineeName ? this.apyInquiryResponseData[0].nomineeName : '-', 20, 175, 'left');

      doc.text("Relationship With Nominee", 90, 170, 'left');
      doc.text(this.relationshipDesc ? this.relationshipDesc : '-', 90, 175, 'left');

      doc.text("Nominee Age", 155, 170, 'left');
      doc.text(this.apyInquiryResponseData[0].nomineeDob ? this.apyInquiryResponseData[0].nomineeDob : '-', 155, 175, 'left');

      /* Second line setting */
      //doc.text("Guardian Address", 20, 190, 'left');
      //doc.text('-', 20, 195, 'left');

      //doc.text("City", 90, 190, 'left');
      //doc.text('-', 90, 195, 'left');

      //doc.text("State", 155, 190, 'left');
      //doc.text('-', 155, 195, 'left');

      /* Third line setting */
      //doc.text("Pin", 20, 210, 'left');
      //doc.text('-', 20, 215, 'left');

      if (type) {
        doc.autoPrint();
        window.open(doc.output('bloburl'));
      }
      else {
        this.commonMethod.downloadPDF(doc, 'APY_Enrollment_Details');
      }

    }

    onSchemeDetailsClick() {
      if (!this.DataService.isCordovaAvailable) window.open('https://punjabandsindbank.co.in/content/atal-pension-yojana');
      else cordova.InAppBrowser.open('https://punjabandsindbank.co.in/content/atal-pension-yojana', '_blank', 'location=no');
    }

     /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
   errorCallBack(subActionId, resp) {
    //showToastMessage(resp.Result, "error");
  }

}
