import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { PluginService } from '../../../../services/plugin-service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { AppConstants } from '../../../../app.constant';


@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.scss']
})

export class RegistrationSuccessComponent implements OnInit {
  headerdata = {
    'headerType': 'UpiMainHeader',  //Options: TitleHeader , preloginHeader
    'titleName':'',            // Note : add titlename if headerType = TitleHeader
    'footertype':'none' //Options: upiFooter , none
  }
  constructor(private router: Router, public dataService: DataService, private translate: TranslatePipe, private pluginService: PluginService, private localStorageService: LocalStorageService, private constant: AppConstants) { }

  ngOnInit(): void {
    this.dataService.changeMessage(this.headerdata);
    this.dataService.upiRegisteredUser = true;
    //this.storeSimData();
  }

  storeSimData() {
    this.dataService.simData
    let isDualSim = this.dataService.simData.activeSubscriptionInfoCountMax > 0 ? true : false;
    let simOne;
    let simTwo;

    if(this.dataService.platform.toLowerCase() == this.constant.val_android) {
      simOne = "blank";
      simTwo = "blank";

      this.pluginService.checkSimStatusAndroid(simOne, simTwo, isDualSim).subscribe((response) => {
        console.log("Sim Detect Success => ", response);

        if (response.status == "00") {
          this.localStorageService.setLocalStorage("SimOneId", response.simOneInfo);
          this.localStorageService.setLocalStorage("SimTwoId", response.simTwoInfo);
        } else {
          console.log("Sim Ids not found...");
        }
      }, (err) => {
        console.log("Sim Detect Error => ", err);
      });
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {

    } else {
      console.log("Unknown Platform => ", this.dataService.platform);
    }
  }

  gotoDashboard() {
    this.router.navigate(['/upiDashboard']);
    // this.router.navigate(['/createUpi']);
  }
}
