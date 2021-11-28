import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { Last4Char } from 'src/app/pipes/first-last-char.pipe';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { PluginService } from 'src/app/services/plugin-service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../services/data.service';
import { payUpiRequestService } from '../../pay/pay-upi/pay-upi-request.service';
import { MigratedUserService } from '../migrated-user-verification/migrated-user-verification.service';

declare var selectionList: any;
declare var moboVerification: any;
@Component({
  selector: 'app-migrated-user-verification',
  templateUrl: './migrated-user-verification.component.html',
  styleUrls: ['./migrated-user-verification.component.scss']
})
export class MigratedUserVerificationComponent implements OnInit {
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'VERIFICATION',
    'footertype': 'none'
  }
  bankList = [];
  vpaList = [];
  accountList = [];
  limit:any;
  constructor(private router: Router, public DataService: DataService, private location: Location, private payUpiRequestService: payUpiRequestService, private http: HttpRestApiService, private localStorage: LocalStorageService, private constant: AppConstants, private migratedUserService: MigratedUserService, private commonMethod: CommonMethods,private last4CharPipe : Last4Char, private pluginService : PluginService) { }
  migratedUserForm: FormGroup;
  maskedAccountNumber = "";
  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.vpaList = this.DataService.migratedVPAList;
    this.limit = 11;
    this.buildForm();
    this.getDefaultVPA()
  }

  getDefaultVPA() {
    let defaultvpa = this.vpaList.find((vpaDetails) => { return vpaDetails.default == 'Y' });
    this.migratedUserForm.get('upiId').setValue(defaultvpa.paymentAddress);
    this.getBankListAndAccontListByVPA(defaultvpa.paymentAddress)
  }

  buildForm() {
    this.migratedUserForm = new FormGroup({
      upiId: new FormControl('', [Validators.required, Validators.pattern(/^(\d{10}|\w+[\w.-]+@[\w.-]+$)$/)]),
      bank: new FormControl('', [Validators.required]),
      maskedAccountNumber: new FormControl('', [Validators.required, Validators.pattern(/(^[a-z0-9A-Z]*$)/)]),
      accountnumber: new FormControl('', [Validators.required, Validators.pattern(/(^[a-z0-9A-Z]*$)/)]),
    });
  };


  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      // 00 success validation , 01: Technical error  , 02: Validation failed,  03 : Account derigister due to maxInvalidCount.
      this.commonMethod.closePopup('div.popup-bottom.show-common-error')
      console.log(data);
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_VALIDATEMIGRATEDUSERDETAIL:
            if(this.DataService.platform.toLowerCase() == this.constant.val_android) this.pluginService.enableSmartIntent(true);
            this.DataService.routeWithNgZone('upiDashboard');
            break;
          default:
            break;
        }
      } else if (response.status == "01") {
        // this.closePopup('show-common-info')
        this.openPopup('verification1')
      } else if (response.status == "02") {
        // this.closePopup('show-common-info')
        this.openPopup('verification2')
      } else if (response.status == "03") {
        // this.closePopup('show-common-info')
        this.openPopup('verification3')
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  validateUser() {
    if (this.migratedUserForm.valid) {
      let { upiId, bank, accountnumber } = this.migratedUserForm.value;
      let last4Char  = this.last4CharPipe.transform(this.maskedAccountNumber);
      let accountNo = accountnumber +last4Char;
      var req = this.migratedUserService.getValidateMigratedUserReq(accountNo, bank, upiId);
      this.UpiApiCall(req);
    }
  }

  closePopup(type) {
    this.commonMethod.closePopup('div.popup-bottom.' + type);
    if (type == 'verification3') {
      this.localStorage.removeFromLocalStorage(this.constant.storage_isUpiRegistrationSuccess);
      this.DataService.routeWithNgZone('smsVerification');
    }
  }

  openPopup(type) {
    this.commonMethod.openPopup('div.popup-bottom.' + type);
  }

  getBankListAndAccontListByVPA(paymentAddress,reset?) {
    if (paymentAddress) {
      this.bankList = this.vpaList.find((vpaDetails) => { return vpaDetails.paymentAddress == paymentAddress }).accounts;
      this.accountList = this.bankList;
      setTimeout(()=>{
        this.bankList.map((bank)=>{
          if(bank.isDefaultAccount == 'Y'){
            // this.migratedUserForm.get('bank').setValue(bank.ifsc);
            // this.migratedUserForm.get('maskedAccountNumber').setValue(bank.maskedAccountNumber);
            this.maskedAccountNumber = bank.maskedAccountNumber;
            this.limit = this.maskedAccountNumber.substring(1,this.maskedAccountNumber.length-4).length+1;
            this.migratedUserForm.patchValue({bank:bank.ifsc,maskedAccountNumber:bank.maskedAccountNumber})
          }
        })
        if (this.bankList.length == 1) {
          // this.migratedUserForm.removeControl('maskedAccountNumber');
          this.migratedUserForm.get('maskedAccountNumber').setValidators([Validators.nullValidator])
        } else {
          this.migratedUserForm.get('maskedAccountNumber').setValidators([Validators.required])

          // this.migratedUserForm.addControl('maskedAccountNumber', new FormControl('', Validators.required));
        }
      })
    } else {
      this.migratedUserForm.get('bank').reset('');
      this.migratedUserForm.get('accountnumber').reset('');
    }
  }
  
  updateValue(value){
    this.maskedAccountNumber =value;
  }

}
