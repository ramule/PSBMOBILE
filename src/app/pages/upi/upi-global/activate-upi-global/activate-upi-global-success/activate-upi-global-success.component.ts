import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-activate-upi-global-success',
  templateUrl: './activate-upi-global-success.component.html',
  styleUrls: ['./activate-upi-global-success.component.scss']
})

export class ActivateUpiGlobalSuccessComponent implements OnInit {
  globalUpiSuccessData: any;
  currentTimestamp: any;

  headerdata = {
    'headerType': 'none',
    'titleName':'',
    'footertype':'none'
  } 

  constructor( public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.changeMessage(this.headerdata);
    this.globalUpiSuccessData = this.dataService.globalUpiFormData;
    console.log("Success data received: ", this.globalUpiSuccessData);
  }

  goBack() {
    this.dataService.routeWithNgZone('manageAccounts');
  }
}
