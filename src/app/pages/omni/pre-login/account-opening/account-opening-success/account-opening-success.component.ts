import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../../services/data.service';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { AccountOpeningStepsService } from '../account-opening-steps/account-opening-steps.service';
import { AccountOpeningSuccessService } from './account-opening-success.service';
import { DropDownMaster , AccountOpeningSteps} from '../../../../../utilities/app-enum';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-account-opening-success',
  templateUrl: './account-opening-success.component.html',
  styleUrls: ['./account-opening-success.component.scss']
})
export class AccountOpeningSuccessComponent implements OnInit {

  accountDtl :any;

  constructor(private router: Router,
    private commonMethods: CommonMethods,
    private dataService: DataService,
    public translate: TranslatePipe,
    public accOpeningService: AccountOpeningStepsService,
    public accOpeningSuccessService: AccountOpeningSuccessService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private loader: pageLoaderService,
    private storage: LocalStorageService,
    ) { }

  ngOnInit(): void {
    this.loader.hideLoader();
    this.accountDtl = this.dataService.accountDtls;
    this.commonMethods.closePopup('div.popup-bottom');
  }

  gotoLogin(){
    if(this.constant.getPlatform() == 'web'){
      this.router.navigateByUrl("/nliLanding");
    }
    else{
      this.router.navigateByUrl("/LandingPage");
    }
  }

  

}
