import { Location } from '@angular/common';
import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';
import { AppConstants } from '../../../../app.constant';
import { DataService } from '../../../../services/data.service';
declare var showToastMessage: any;
declare var cordova: any;
declare var window: any;
declare var $;
declare var sms;

@Component({
  selector: 'app-bank-list',
  templateUrl: './pay-bank-list.component.html',
  styleUrls: ['./pay-bank-list.component.scss']
})
export class PayBankListComponent implements OnInit {
  headerdata = {
    'headerType': 'TitleClose',
    'titleName': 'Contact',
    'footertype': 'none'
  }
  searchBank = '';

  constructor(private router: Router,
    public DataService: DataService,
    private location: Location,
    private constant: AppConstants,
  ) { }

  ngOnInit(): void {
    this.DataService.setPageSettings('SELECT_BANK');
    history.pushState({}, 'payUpi', this.location.prepareExternalUrl('payUpi'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
  }

  selectBank(bankObj) {
    this.DataService.bankDetails.bankName = bankObj.bankName;
    this.DataService.bankDetails.ifsc = bankObj.ifsc;
    this.DataService.bankDetails.iin = bankObj.iin;
    this.location.back();
  }
}
