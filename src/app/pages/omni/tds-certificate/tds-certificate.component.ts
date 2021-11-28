import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { TdsCertificateService } from './tds-certificate.service'
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { DatePipe, Location } from '@angular/common';
import { CommonMethods } from 'src/app/utilities/common-methods';
import * as jsPDF from 'jspdf';
import { FontBase64 } from 'src/app/utilities/app-enum';
declare var showToastMessage: any;
declare var OSREC: any;
@Component({
  selector: 'app-tds-certificate',
  templateUrl: './tds-certificate.component.html',
  styleUrls: ['./tds-certificate.component.scss']
})
export class TdsCertificateComponent implements OnInit {
  todayDateTime: any;
  custPANNumber: any;
  maskedPANNumber: any;
  downloadTDSCertDateOfIssue: any;
  tdsCertificateData: any = [];
  statementData: any = [];
  selectedAccountNo: any;
  tdsDeductionFromDate: any = "1st ";
  tdsDeductionToDate: any;
  tdsDeductionFromMonth: any;
  tdsDeductionToMonth: any;
  tdsDeductionFromYear: any;
  tdsDeductionToYear: any;
 
  commonPageComponent = {
    headerType: 'innerHeader',
    sidebarNAv: 'OmniNAv',
    footer: 'innerFooter',
  };

accountList =[]


  constructor(
    private router:Router,
    public dataService: DataService,
    public tdsCertificateService: TdsCertificateService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private location: Location,
    private commonMethods: CommonMethods,
    private datePipe: DatePipe,) { }

    assessmentYearList: any = [];

    periodList: any = [];
    quarterList: any = [];
    tdsType = 'customerId'
    tdsCertificateForm: FormGroup;
    customerId : any ;
    selectedPeriod: any = '';
    selectedQuarter: any = '';
    selectedYear: any = '';

  ngOnInit(): void {
    // if(this.dataService.isCordovaAvailable){
    //   this.dataService.changeMessage(this.commonPageComponent);
    // }else{
    //   this.dataService.setPageSettings('TDS_CERTIFICATE');
    // }
    this.dataService.setPageSettings('TDS_CERTIFICATE');
    this.todayDateTime = this.datePipe.transform(new Date(), 'ddMMyyyyhhmmss');
    this.custPANNumber = this.dataService.profiledateDetails[0].panNumber;
    console.log('Profile details: ', this.dataService.profiledateDetails);
    console.log('PAN number: ', this.custPANNumber);
    this.maskedPANNumber = this.maskPANNumber(this.custPANNumber);
    console.log('masked PAN number: ', this.maskedPANNumber);
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('TDS_CERTIFICATE' , this.router.url)
    // this.dataService.changeMessage(this.commonPageComponent);
    // var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile'
    var backURL = '';
    if(this.dataService.isCordovaAvailable){
      if(this.dataService.quickAccessFromDashboard){
        backURL = 'mobQuickAccessLanding';
      }else{
        backURL = 'dashboardMobile';
      }
    }else{
      backURL = 'dashboard';
    }
    history.pushState({}, backURL, this.location.prepareExternalUrl(backURL));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    this.buildForm();
    console.log('cif number: ',this.dataService.userDetails.cifNumber);
    var assessmentParam = this.tdsCertificateService.getAssessmentYearCall();
    this.getAssessmentYear(assessmentParam);
    var periodParam = this.tdsCertificateService.getPeriodCall();
    this.getPeriod(periodParam);
    var quarterParam = this.tdsCertificateService.getQuarterCall();
    this.getQuarter(quarterParam);
    this.tdsCertificateForm.patchValue({
      custId: this.dataService.userDetails.cifNumber,
      panNumber: this.maskedPANNumber
    });
    console.log("this.dataService.customerAccountList" + JSON.stringify(this.dataService.customerAccountList))

    this.dataService.customerAccountList.forEach(el => {
      if(el.SchemeCode == "SBA" || el.SchemeCode == "TDA"){
        this.accountList.push(el);
      }
    });
  }

  maskPANNumber(mobNumber) {
    var temp = "X";
    var num = mobNumber.toString().length - 4;
    for (var i = 1; i < num; i++) {
      temp = temp + "X";
    }
    temp = mobNumber.toString().substring(0, 2) + temp + mobNumber.toString().substring((mobNumber).toString().length - 2, (mobNumber).toString().length);
    return temp;
  }

  getAssessmentYear(param) {
    this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_CERTIFICATECONFIGS).subscribe(data=>{
      console.log(data);
      var resp = data.responseParameter
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
          this.assessmentYearList = data.listofDataset[0].records;
          console.log('assessment year list: ', this.assessmentYearList);
        }
        else {
          //showToastMessage(resp.result);
        }
      });
  }

  getPeriod(param) {
    this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_CERTIFICATECONFIGS).subscribe(data=>{
      console.log(data);
      var resp = data.responseParameter
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
          this.periodList = data.listofDataset[0].records;
          console.log('period list: ', this.periodList);
        }
        else {
          //showToastMessage(resp.result);
        }
      });
  }

  getQuarter(param) {
    this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_CERTIFICATECONFIGS).subscribe(data=>{
      console.log(data);
      var resp = data.responseParameter
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
          this.quarterList = data.listofDataset[0].records;
          console.log('Quarter list: ', this.quarterList);
        }
        else {
          //showToastMessage(resp.result);
        }
      });
  }

  filterPeriodList() {
    return this.periodList.filter(x => x.configVal != 'HALFYEARLY');
  }

  onPeriodSelect(event) {
    console.log(event.target.value);
    this.selectedPeriod = event.target.value;
    console.log('selected period: ', this.selectedPeriod);
    if(this.selectedPeriod == 'QUARTERLY') {
      this.tdsCertificateForm.controls["quarter"].setValidators([Validators.required]);
    }
    else {
      this.tdsCertificateForm.controls["quarter"].setValidators([]);
    }
    this.tdsCertificateForm.controls["quarter"].updateValueAndValidity();
    this.tdsCertificateForm.get('quarter').markAsUntouched();
  }

  onQuarterSelect(event) {
    console.log(event.target.value);
    this.selectedQuarter = event.target.value;
    console.log('selected quarter: ', this.selectedQuarter);
  }

  onYearChange(event) {
    console.log(event.target.value);
    this.selectedYear = event.target.value;
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  buildForm() {
    this.tdsCertificateForm = new FormGroup({
      selectOption : new FormControl('', [Validators.required]),
      custId: new FormControl('', [Validators.required]),
      accountNumber: new FormControl(''),
      assestmentYear: new FormControl('', [Validators.required]),
      period: new FormControl('',[Validators.required]),
      panNumber: new FormControl('',[Validators.required]),
      quarter: new FormControl('')
    });
    this.changeTypeSelection() ;
  }

  validateForm(){
    if (this.tdsCertificateForm.invalid) {
      this.tdsCertificateForm.get('selectOption').markAsTouched();
      this.tdsCertificateForm.get('custId').markAsTouched();
      this.tdsCertificateForm.get('accountNumber').markAsTouched();
      this.tdsCertificateForm.get('assestmentYear').markAsTouched();
      this.tdsCertificateForm.get('period').markAsTouched();
      this.tdsCertificateForm.get('panNumber').markAsTouched();
      if(this.selectedPeriod == 'QUARTERLY') {
        this.tdsCertificateForm.get('quarter').markAsTouched();
      }
    }
  }

  changeTypeSelection() {
    if (this.tdsType == 'customerId') {
      this.tdsCertificateForm.get('accountNumber').clearValidators();
      this.tdsCertificateForm.get('accountNumber').updateValueAndValidity();
    } else {
      this.tdsCertificateForm.get('accountNumber').setValidators([Validators.required]); // 5.Set Required Validator
      this.tdsCertificateForm.get('accountNumber').updateValueAndValidity();
    }
  }


  onTdsSubmit(formValue){
    this.changeTypeSelection()
    if(this.tdsCertificateForm.valid){
      console.log("form value", formValue);
      // if(this.tdsType=)
      var param = this.tdsCertificateService.getTdsCertificateCall(this.tdsCertificateForm.value, this.selectedPeriod, this.selectedQuarter, this.selectedYear);
      this.submit(param);
    }
    else{
      this.validateForm();
    }
  }

  onAccNoSelected(event) {
    console.log(event.target.value);
    this.selectedAccountNo = event.target.value;
    console.log('selected account number: ', this.selectedAccountNo);
  }

  submit(param) {
    this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_ISSUETDSCERTIFICATE).subscribe(data=>{
      console.log(data);
      var resp = data.responseParameter
        if (resp.opstatus == "00") {
          this.tdsCertificateData = [];
          this.statementData = [];
          this.getTDSDeductionYearMonthDate();
          this.downloadTDSCertDateOfIssue = resp.dateOfIssue;
          console.log(data.responseParameter);
          data.set.records.forEach(el => {
            var _data = [];
              if(this.selectedPeriod == 'QUARTERLY') {
                _data.push(this.selectedYear+ ' ('+ this.tdsCertificateForm.value.quarter + ')');
              }
              else {
                _data.push(this.selectedYear);
              }
              _data.push(this.convertCurrency(el.totalInterestAmount));
              _data.push(this.convertCurrency(el.totalTDSAmount));
              _data.push(this.convertCurrency(el.totalShortfallAmount));
              _data.push(this.convertCurrency(el.totalRefundAmount));
              this.tdsCertificateData.push(_data)
          });
          console.log('TDS Certificate Data: ', this.tdsCertificateData);
          var test = data.set.records[0].statement;
          test = test.slice(2,-2);
          test = test.split('], [');
          console.log('test: ', test);

          for(var i = 0; i<test.length; i++) {
            var testObj = test[i].split(',');
            var _dataArr = [];
            if(this.tdsType == 'customerId') {
              _dataArr.push(i+1);
            }
            else {
              _dataArr.push(1);
            }

            _dataArr.push('CASH');
            for(var j=0; j<testObj.length; j++) {
              if(j == 0) {
                _dataArr.push(testObj[j]);
              }
              else {
                _dataArr.push(this.convertCurrency(testObj[j]));
              }
            }
            if(this.tdsType == 'customerId') {
              this.statementData.push(_dataArr);
            }
            else {
              if(_dataArr[2] == this.selectedAccountNo) {
                this.statementData.push(_dataArr);
              }
            }
          }
          console.log('statement Data: ', this.statementData);

          for(var k=0; k< this.statementData.length; k++) {
            if(this.statementData[k][2].slice(4,6) == '10') {
              this.statementData[k][1] = 'Saving Bank Account';
            }
            else if(this.statementData[k][2].slice(4,6) == '14') {
              this.statementData[k][1] = 'Fixed Deposit';
            }
            else if(this.statementData[k][2].slice(4,6) == '15') {
              this.statementData[k][1] = 'Recurring Deposit';
            }
          }
          console.log('final statement Data: ', this.statementData);
          this.dwnldTDSCertificatePdf();
        }
      });
  }

  getTDSDeductionYearMonthDate() {

    if(this.selectedPeriod == 'YEARLY') {
      this.tdsDeductionFromYear = this.selectedYear.split('-')[0];
      this.tdsDeductionToYear = Number(this.tdsDeductionFromYear) + 1;

      this.tdsDeductionToDate = "31st ";
      this.tdsDeductionFromMonth = "April";
      this.tdsDeductionToMonth = "March";
    }
    else {
      if(this.selectedQuarter == "Quarter 1") {
        this.tdsDeductionFromYear = this.selectedYear.split('-')[0];
        this.tdsDeductionToYear = Number(this.tdsDeductionFromYear);

        this.tdsDeductionToDate = "30th ";
        this.tdsDeductionFromMonth = "April";
        this.tdsDeductionToMonth = "June";
      } else if(this.selectedQuarter == "Quarter 2") {
        this.tdsDeductionFromYear = this.selectedYear.split('-')[0];
        this.tdsDeductionToYear = Number(this.tdsDeductionFromYear);

        this.tdsDeductionToDate = "30th ";
        this.tdsDeductionFromMonth = "July";
        this.tdsDeductionToMonth = "September";
      } else if(this.selectedQuarter == "Quarter 3") {
        this.tdsDeductionFromYear = this.selectedYear.split('-')[0];
        this.tdsDeductionToYear = Number(this.tdsDeductionFromYear);

        this.tdsDeductionToDate = "31st ";
        this.tdsDeductionFromMonth = "October";
        this.tdsDeductionToMonth = "December";
      } else if(this.selectedQuarter == "Quarter 4") {

        this.tdsDeductionFromYear = Number(this.selectedYear.split('-')[0]) + 1;
        this.tdsDeductionToYear = Number(this.tdsDeductionFromYear) + 1;

        this.tdsDeductionToDate = "31st ";
        this.tdsDeductionFromMonth = "January";
        this.tdsDeductionToMonth = "March";
      }
    }
  }

  convertCurrency(value) {
    return OSREC.CurrencyFormatter.format(value, { currency: 'INR', symbol: '₹' });
  }

  onCancel(){
    this.tdsCertificateForm.reset();
    if(this.constant.getIsCordova() == 'web'){
      this.router.navigateByUrl('/dashboard');
    }
    else{
      this.location.back();
    }
  }

  dwnldTDSCertificatePdf() {
    var doc = new jsPDF();

    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var img = new Image()
    img.src = this.constant.psbNewLogo;

    doc.addImage(img, 'png', 20, 16, 60, 15);
    doc.setLineWidth(0.5);
    doc.line(90, 7, 90, 40); // vertical line

    // add the font to jsPDF
    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
    doc.setFont("Sakalbharati");

    doc.setFontSize(12);
    doc.text('Registered Office: Punjab & Sind Bank,', pageWidth - 110, 20, 'left')
    doc.text('21, Rajendra Place, New Delhi- 110008', pageWidth - 110, 25, 'left')

    doc.setLineWidth(0.1);
    doc.line(15, 40, pageWidth-15, 40);

    doc.setFontSize(20);
    doc.text("TDS Certificate", 20, 60, 'left');
    doc.setFontSize(10);
    doc.text(this.downloadTDSCertDateOfIssue, pageWidth - 60, 60, 'left');

    doc.setLineWidth(0.2);
    doc.rect(15, 70, doc.internal.pageSize.width - 30, 45, 'S');

    doc.setFontSize(11);
    doc.text("Customer Name :"+ this.dataService.userDetails?.customerName, 20, 80, 'left');
    var splitTitle = doc.splitTextToSize("Customer Address : "+this.dataService.profileDetails[0].add1 +", "+this.dataService.profileDetails[0].add2 +", "+ this.dataService.custProfileStateCityObj.city +" "+ this.dataService.custProfileStateCityObj.state +" "+ this.dataService.profileDetails[0].pin, 150);
    doc.text(splitTitle, 20, 85, 'left');
    doc.text("Customer ID : "+ this.dataService.userDetails.cifNumber, 20, 95, 'left');
    doc.text("Mobile Number : "+ this.storage.getLocalStorage(this.constant.storage_mobileNo), 20, 100, 'left');
    doc.text("PAN Number : "+ this.custPANNumber, 20, 105, 'left');

    doc.text("Dear Customer", 20, 130, 'left');

    if (this.tdsType == 'customerId') {
      doc.text("The details of Interest Paid and TDS Deducted (if any) for various deposit accounts under", 20, 140, 'left');
      doc.text("Customer ID "+this.dataService.userDetails.cifNumber+" during period "+this.tdsDeductionFromDate+ this.tdsDeductionFromMonth +", "+ this.tdsDeductionFromYear+ " to "+ this.tdsDeductionToDate + this.tdsDeductionToMonth + ", "+this.tdsDeductionToYear+" is as below: ", 20, 145, 'left');

      doc.setFontSize(7);
      var _columns = ["Period", "Total Interest Paid", "Total TDS Deducted", "TDS Shortfall Amount", "Total Refund Amount"];
      var _rows = this.tdsCertificateData;
      console.log(_rows);

      doc.autoTable(_columns, _rows, {
        theme: 'grid', // 'striped', 'grid' or 'plain',
        didDrawPage: function (data) {
          // Reseting top margin. The change will be reflected only after print the first page.
          data.settings.margin.top = 10;
        },
        margin: { top: 150 },
        styles: {
          overflow: 'linebreak',
          cellWidth: 'wrap',
          halign: 'center',
          horizontalPageBreak: true,
          font: "Sakalbharati"
        },
        columnStyles: {
          1: { cellWidth: 40, halign: 'right' },
          2: { cellWidth: 40, halign: 'right' },
          3: { cellWidth: 40, halign: 'right' },
          4: { cellWidth: 40, halign: 'right' }
        }
      });

      doc.setFontSize(11);
      doc.text("The account wise breakup of Interest Paid and TDS Deducted (if any) as below: ", 20, 170, 'left');

      doc.setFontSize(7);
      var _columns1 = ["Serial Number", "Deposit Type", "Account Number", "Interest Paid", "TDS Deducted"];
      var _rows1 = this.statementData;
      // var _rows1 = this.statementData;
      console.log(_rows1);

      doc.autoTable(_columns1, _rows1, {
        theme: 'grid', // 'striped', 'grid' or 'plain',
        didDrawPage: function (data) {
          // Reseting top margin. The change will be reflected only after print the first page.
          data.settings.margin.top = 10;
        },
        margin: { top: 180 },
        styles: {
          overflow: 'linebreak',
          cellWidth: 'wrap',
          halign: 'center',
          horizontalPageBreak:true,
          font: "Sakalbharati"
        },
        columnStyles: {
          3: { cellWidth: 40, halign: 'right' },
          4: { cellWidth: 40, halign: 'right' }
        }
      });
    }
    else {
      doc.text("The details of Interest Paid and TDS Deducted (if any) under Account Number "+this.selectedAccountNo, 20, 140, 'left');
      doc.text("during period "+this.tdsDeductionFromDate+ this.tdsDeductionFromMonth +", "+ this.tdsDeductionFromYear+ " to "+ this.tdsDeductionToDate + this.tdsDeductionToMonth + ", "+this.tdsDeductionToYear+" is as below: ", 20, 145, 'left');

      doc.setFontSize(7);

      doc.setFontSize(7);
      var _columns1 = ["Serial Number", "Deposit Type", "Account Number", "Interest Paid", "TDS Deducted"];
      var _rows1 = this.statementData;
      // var _rows1 = this.statementData;
      console.log(_rows1);

      doc.autoTable(_columns1, _rows1, {
        theme: 'grid', // 'striped', 'grid' or 'plain',
        didDrawPage: function (data) {
          // Reseting top margin. The change will be reflected only after print the first page.
          data.settings.margin.top = 10;
        },
        margin: { top: 150 },
        styles: {
          overflow: 'linebreak',
          cellWidth: 'wrap',
          halign: 'center',
          horizontalPageBreak:true,
          font: "Sakalbharati"
        },
        columnStyles: {
          3: { cellWidth: 40, halign: 'right' },
          4: { cellWidth: 40, halign: 'right' }
        }
      });
    }

    const pageCount = doc.internal.getNumberOfPages()
    doc.setFontSize(6)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setLineWidth(0.1);
      doc.text('This is computer generated statement and does not require any signature. ', 15, 281, 'left')
      doc.setLineWidth(0.1);
      doc.line(15, 282, pageWidth-15, 282);
      doc.setFontSize(8)
      doc.text('Registered Office: Punjab & Sind Bank, 21, Rajendra Place, New Delhi- 110008', 15, 287, 'left')
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width - 30, 287, 'left')
    }

    this.commonMethods.downloadPDF(doc, 'TDS-Certificate_'+this.todayDateTime);
  }
}
