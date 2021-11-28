import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { Location } from '@angular/common';
import { CommonMethods } from 'src/app/utilities/common-methods';
import * as jsPDF from 'jspdf';
import { FontBase64 } from 'src/app/utilities/app-enum';
declare var OSREC: any;
@Component({
  selector: 'app-pmsby-record',
  templateUrl: './pmsby-record.component.html',
  styleUrls: ['./pmsby-record.component.scss']
})
export class PmsbyRecordComponent implements OnInit {
  enrollmentObj: any;
  enrollmentDetailsData: any
  constructor(
    private router: Router,
    private location: Location,
    public dataService: DataService,
    private commonMethod: CommonMethods
  ) { }

  ngOnInit(): void {
    this.enrollmentObj = this.location.getState();
    console.log('enrollment Object: ', this.enrollmentObj);
    this.enrollmentDetailsData = this.enrollmentObj.enrollmentDetails;
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('PMSBY' , this.router.url)
    this.dataService.setPageSettings('PMSBY');

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
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  shareDetails(){
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

    selectedFields += "Scheme : Pradhan Mantri Suraksha Bima Yojana(PMSBY), ";
    selectedFields += "Name :" + this.dataService.userDetails?.customerName ? this.dataService.userDetails.customerName : '-' + ", ";
    selectedFields += "Date Of Birth :" + this.dataService.profiledateDetails[0].custBirthDate ? this.dataService.profiledateDetails[0].custBirthDate : '-' + ", ";
    selectedFields += "Policy Number :" + this.enrollmentDetailsData.tranId ? this.enrollmentDetailsData.tranId : '-' + ", ";
    selectedFields += "Premiutmm Amount :" + OSREC.CurrencyFormatter.format(this.enrollmentDetailsData.premiumAmount, { currency: 'INR', symbol: '₹' })+ ", ";
    selectedFields += "Debit Account :" + this.enrollmentDetailsData.accountNo ? this.enrollmentDetailsData.accountNo : '-' + ", ";
    selectedFields += "Date Of Enrollment :" + this.enrollmentDetailsData.joinDate ? this.enrollmentDetailsData.joinDate : '-' + ", ";
    selectedFields += "Maturity Date :" + this.enrollmentDetailsData.maturityDate ? this.enrollmentDetailsData.maturityDate : '-' + ", ";
    selectedFields += "Renewal Due On :" + this.enrollmentDetailsData.tranDate ? this.enrollmentDetailsData.tranDate : '-' + ", ";
    selectedFields += "Nominee Name :" + this.enrollmentDetailsData.nomineeName ? this.enrollmentDetailsData.nomineeName : '-' + ", ";
    selectedFields += "Nominee Age :" + this.enrollmentDetailsData.nomineeAge ? this.enrollmentDetailsData.nomineeAge : '-' + ", ";
    selectedFields += "Relationship with Nominee :" + this.enrollmentDetailsData.nomineeRelation ? this.enrollmentDetailsData.nomineeRelation : '-' + ", ";
    selectedFields += "Guardian Address :" + '-' + ", ";
    selectedFields += "City :" + '-' + ", ";
    selectedFields += "State :" + '-' + ", ";
    selectedFields += "Pin :" + '-' + ", ";

    return selectedFields.replace(/,\s*$/, "");
  }

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
    doc.text("Pradhan Mantri Jeevan Jyoti Bima", pageWidth - 110, 20, 'left');
    doc.text("Yojana(PMJJBY)", pageWidth - 110, 27, 'left');

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
    doc.text("Pradhan Mantri Suraksha Bima", 20, 85, 'left');
    doc.text("Yojana(PMSBY)", 20, 89, 'left');

    doc.text("Name", 90, 80, 'left');
    var splitTitle = doc.splitTextToSize(this.dataService.userDetails?.customerName, 50);
    doc.text(splitTitle, 90, 85, 'left');

    doc.text("Date Of Birth", 155, 80, 'left');
    doc.text(this.dataService.profiledateDetails[0].custBirthDate, 155, 85, 'left');

    /* Second line setting */
    doc.text("Policy Number", 20, 100, 'left');
    doc.text(this.enrollmentDetailsData.tranId, 20, 105, 'left');

    doc.text("Premium Amount", 90, 100, 'left');
    doc.text(OSREC.CurrencyFormatter.format(this.enrollmentDetailsData.premiumAmount, { currency: 'INR', symbol: '₹' }), 90, 105, 'left');

    doc.text("Debit Account", 155, 100, 'left');
    doc.text(this.enrollmentDetailsData.accountNo, 155, 105, 'left');

    /* Third line setting */
    doc.text("Date Of Enrollment", 20, 120, 'left');
    doc.text(this.enrollmentDetailsData.joinDate ? this.enrollmentDetailsData.joinDate : '-', 20, 125, 'left');

    doc.text("Maturity Date", 90, 120, 'left');
    doc.text(this.enrollmentDetailsData.maturityDate ?  this.enrollmentDetailsData.maturityDate : '-', 90, 125, 'left');

    doc.text("Renewal Due On", 155, 120, 'left');
    doc.text(this.enrollmentDetailsData.tranDate ? this.enrollmentDetailsData.tranDate : '-', 155, 125, 'left');


    doc.setFontSize(16);
    doc.text("Nominee Details", 20, 150, 'left');

    doc.setLineWidth(0.2);
    doc.rect(15, 160, doc.internal.pageSize.width - 30, 60, 'S');

    doc.setFontSize(10);

    /* First line setting */
    doc.text("Nominee Name", 20, 170, 'left');
    doc.text(this.enrollmentDetailsData.nomineeName ? this.enrollmentDetailsData.nomineeName : '-', 20, 175, 'left');

    doc.text("Relationship With Nominee", 90, 170, 'left');
    doc.text(this.enrollmentDetailsData.nomineeRelation ? this.enrollmentDetailsData.nomineeRelation : '-', 90, 175, 'left');

    doc.text("Nominee Age", 155, 170, 'left');
    doc.text(this.enrollmentDetailsData.nomineeAge ? this.enrollmentDetailsData.nomineeAge : '-', 155, 175, 'left');

    /* Second line setting */
    doc.text("Guardian Address", 20, 190, 'left');
    doc.text('-', 20, 195, 'left');

    doc.text("City", 90, 190, 'left');
    doc.text('-', 90, 195, 'left');

    doc.text("State", 155, 190, 'left');
    doc.text('-', 155, 195, 'left');

    /* Third line setting */
    doc.text("Pin", 20, 210, 'left');
    doc.text('-', 20, 215, 'left');

    if (type) {
      doc.autoPrint();
      window.open(doc.output('bloburl'));
    }
    else {
      this.commonMethod.downloadPDF(doc, 'PMSBY_Enrollment_Details');
    }

  }

}
