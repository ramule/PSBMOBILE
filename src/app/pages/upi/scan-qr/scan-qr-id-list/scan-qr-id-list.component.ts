import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { Location } from '@angular/common';
declare var createGlobalNavMore: any;
declare var showToastMessage: any;

@Component({
  selector: 'app-scan-qr-id-list',
  templateUrl: './scan-qr-id-list.component.html',
  styleUrls: ['./scan-qr-id-list.component.scss']
})
export class ScanQrIdListComponent implements OnInit {
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
    private translate: TranslatePipe,
    private location: Location) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'scanQRPayment', this.location.prepareExternalUrl("scanQRPayment"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.vpaAddressList = this.DataService.upiPayVpaList;
  }

  getAccountSelected(vpaIndex, actIndex) {
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
    })
    this.router.navigateByUrl('/scanQRPayment');
  }
}
