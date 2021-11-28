import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
declare var updateUpiGlobalSettings : any ;

@Component({
  selector: 'app-update-upi-global-settings',
  templateUrl: './update-upi-global-settings.component.html',
  styleUrls: ['./update-upi-global-settings.component.scss']
})
export class UpdateUpiGlobalSettingsComponent implements OnInit {

  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName':'Update UPI Global Settings',
    'footertype':'none'
  } 

  constructor( private router:Router, public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.changeMessage(this.headerdata);
    updateUpiGlobalSettings();
    console.log("received Data = ", this.dataService.globalUpiAccountData);
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

}
