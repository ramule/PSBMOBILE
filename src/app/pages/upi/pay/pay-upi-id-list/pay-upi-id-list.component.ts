import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare var createGlobalNavMore: any;

@Component({
  selector: 'app-pay-upi-id-list',
  templateUrl: './pay-upi-id-list.component.html',
  styleUrls: ['./pay-upi-id-list.component.scss']
})
export class PayUpiIdListComponent implements OnInit {
  vpaAddressList = [];
  selectedVpa: any;
  activeVpaAddress: any;
  headerdata = {
    'headerType': 'TitleCloseHeader',
    'titleName': 'SELECT_ACCOUNT',
    'footertype': 'none',
  }
  constructor(private router: Router,
    public DataService: DataService,
    private location: Location,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'payUpiPayment', this.location.prepareExternalUrl("payUpiPayment"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.vpaAddressList = this.DataService.upiPayVpaList;
  }

  getAccountSelected(vpaIndex, actIndex) {
    this.ngZone.run(() => {
      this.DataService.upiPayVpaList.map((vpaAddress, vpaListIndex) => {
        if (vpaIndex == vpaListIndex) {
          vpaAddress.isSelected = true;
          vpaAddress.accounts.map((accDetails, accIndex) => {
            actIndex == accIndex ? accDetails.isSelected = true : accDetails.isSelected = false;
            return accDetails;
          })
        } else {
          vpaAddress.isSelected = false;
          vpaAddress.accounts.map((accDetails) => {
            accDetails.isSelected = false;
            return accDetails;
          })
          return vpaAddress;
        }
      });
      this.DataService.routeWithNgZone('payUpiPayment');
    });
  }
}
