import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonMethods } from 'src/app/utilities/common-methods';
@Component({
  selector: 'app-hotlist-card-success',
  templateUrl: './hotlist-card-success.component.html',
  styleUrls: ['./hotlist-card-success.component.scss']
})
export class HotlistCardSuccessComponent implements OnInit {
  hotlistCardObj:any="";
  myDate: Date = new Date();
  constructor(
    private router:Router,
     public DataService: DataService,
     public commonMethod: CommonMethods
  ) { }

  ngOnInit(): void {
    this.DataService.setPageSettings('Receipt');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('RECEIPT' , this.router.url)
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  goTofeedback(){
    this.router.navigate(['/feedback']);
    this.DataService.feedbackType = "hotlistDebitCard";
  }

  downloadReceipt(print?:any)
  {
  html2canvas(document.getElementById('receiptPDF'))
      .then((canvas) => {

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
        });
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.rect(20, 20, pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height - 40, 'S');
        var img = new Image()
        img.src = 'assets/images/psb-logo-new.png';
        pdf.addImage(img, 'png', 100, 30, 100, 15);
        pdf.setFontSize(10);
        pdf.setFontStyle('italic');
        pdf.setTextColor(173, 170, 170);

        pdf.text("This is a system generated receipt, actual transaction is subject to realization",147,pdf.internal.pageSize.height - 22,'center');
        pdf.addImage(imgData, 'PNG', 34, 65, 230, 120);

       // pdf.save('download.pdf');

       if (print) {
        pdf.autoPrint();
        window.open(pdf.output('bloburl'));
      }
      else {
        this.commonMethod.downloadPDF(pdf, 'hotlistblockcard');
      }


      });


  }

  shareDetails(){
    this.shareViaMail();
  }

  shareViaMail() {
    let details = this.getValuesToSend();
    window.open('mailto:?subject=Receipt&body=' + details);
  }

  getValuesToSend() {
    let selectedFields = "";

    selectedFields +="Debit Card Number :" + this.hotlistCardObj.debitCardNumber + ", ";
    selectedFields += "Account Number :" + this.hotlistCardObj.accountNumber + ", ";
    selectedFields += "Reason :" + this.hotlistCardObj.reason + ", ";

    return selectedFields.replace(/,\s*$/, "");
  }



}
