import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { AppConstants } from 'src/app/app.constant';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pmjjby-success',
  templateUrl: './pmjjby-success.component.html',
  styleUrls: ['./pmjjby-success.component.scss']
})
export class PmjjbySuccessComponent implements OnInit {
  receiptType: any;
  receipdRefID: any;
  receiptResp: any;
  todayDateTime: any;
  receiptMsg: any;
  totalAccountList: any = [];
  receiptPMJJBYJson: any = [
    {
    'key': 'Scheme Name',
    'value': ''
    },
    {
    'key': 'Name',
    'value': ''
    },
    {
    'key': 'Date Of Birth',
    'value': ''
    },
    {
    'key': 'Premium Amount',
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
    'key': 'Date Of Enrollment',
    'value': ''
    }
  ];
  refTransJson: any = [
    {
    'key': 'Transaction ID',
    'value': ''
    }
  ];
  constructor(
    private router: Router,
    public DataService: DataService,
    public constant: AppConstants,
    private commonMethod: CommonMethods,
    private datepipe: DatePipe,
    private location : Location,
  ) { }

  ngOnInit(): void {
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('RECEIPT' , this.router.url)
    this.DataService.setPageSettings('Receipt');
    this.todayDateTime = this.datepipe.transform(new Date(), 'ddMMyyyyhhmmss');
    this.totalAccountList = this.DataService.customerOperativeAccList;
    this.receiptType = this.DataService.receiptType;
    this.receipdRefID = this.DataService.receipdRefID;
    this.receiptResp = this.DataService.pmjjbyDetailsOverviewObj;
    this.receiptMsg = this.DataService.receiptmsg;
    this.refTransJson[0].value = this.DataService.receipdRefID;

    history.pushState({}, 'pmjjby', this.location.prepareExternalUrl('pmjjby'));
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

    selectedFields += "Scheme :" + this.receiptResp.scheme + ", ";
    selectedFields += "Name :" + this.receiptResp.name + ", ";
    selectedFields += "Date Of Birth :" + this.receiptResp.dob + ", ";
    selectedFields += "Nominee Name :" + this.receiptResp.nomineeName + ", ";
    selectedFields += "Debit Account :" + this.receiptResp.debitAccount + ", ";
    selectedFields += "Premium Amount :" + this.receiptResp.premiumAmount + ", ";
    selectedFields += "Date Of Enrollment :" + this.receiptResp.dateOfEnrollment + ", ";
    // selectedFields += "Maturity Date :" + this.receiptResp.date + ", ";

    return selectedFields.replace(/,\s*$/, "");
  }

  downloadPdfReceipt(type) {
    console.log(this.DataService.receiptType);
    if(this.DataService.receiptType == this.constant.val_Successful) {
      var imgColor = 'success';
    }
    else {
      imgColor = 'failed';
    }

      var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.receiptResp.debitAccount);
      console.log('selected account details : ', selAccDtl);

      this.receiptPMJJBYJson[0].value = this.receiptResp.scheme ? this.receiptResp.scheme : '-';
      this.receiptPMJJBYJson[1].value = this.receiptResp.name ? this.receiptResp.name : '-';
      this.receiptPMJJBYJson[2].value = this.receiptResp.dob ? this.receiptResp.dob : '-';
      this.receiptPMJJBYJson[3].value = this.receiptResp.premiumAmount ? this.receiptResp.premiumAmount : '-';
      this.receiptPMJJBYJson[4].value = this.receiptResp.nomineeName ? this.receiptResp.nomineeName : '-';
      this.receiptPMJJBYJson[5].value = this.receiptResp.debitAccount ? this.receiptResp.debitAccount : '-';
      this.receiptPMJJBYJson[6].value = this.receiptResp.dateOfEnrollment ? this.receiptResp.dateOfEnrollment : '-';

      var branchJSON =[
        {'key':'Branch Name','value': selAccDtl[0].branch_name},
        {'key':'Branch Code','value': selAccDtl[0].branchCode},
        {'key':'Branch Address','value': selAccDtl[0].BRANCHADDRESS},
        {'key':'Branch Contact','value': selAccDtl[0].phone_number},
        {'key':'IFSC','value': selAccDtl[0].ifscCode},
      ];

      this.commonMethod.generatePDF(imgColor, this.receiptType, this.DataService.receiptmsg, this.refTransJson, this.receiptPMJJBYJson, 'PMJJBY_Receipt', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);
  }

  onHomeClick() {
    this.router.navigateByUrl('/pmjjby');
  }

}
