import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { SelfTransferService } from './self-transfer.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { Location } from '@angular/common';
import { CommonMethods } from 'src/app/utilities/common-methods';
declare var createGlobalNavMore: any;
declare var showToastMessage: any;

@Component({
  selector: 'app-self-transfer',
  templateUrl: './self-transfer.component.html',
  styleUrls: ['./self-transfer.component.scss']
})
export class SelfTransferComponent implements OnInit {

  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'Self Transfer',
    'footertype': 'none'
  }
  transferActList: any = [];
  depositActList: any = [];
  vpaAddressList: any[];
  defaultVpaAccountArr: any = [];
  transferAct: any;
  depositAct: any;
  proceedEnable = true;

  constructor(private router: Router,
    public DataService: DataService,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private localStorage: LocalStorageService,
    private location: Location,
    private SelfTransferService: SelfTransferService,
    private translate: TranslatePipe,
    private commonMethod: CommonMethods) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    console.log("coming from => ", this.DataService.previousPageUrl);
    // this.initialize();
    this.upiAccountList();
    history.pushState({}, 'payUpi', this.location.prepareExternalUrl("payUpi"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
  }

  initialize() {
    //   let vpaAddressList = this.DataService.vpaAddressList;
    //   if(this.DataService.upiPayVpaList.length == 0){
    //     this.DataService.upiPayVpaList  = vpaAddressList.map((vpaAddress:any)=>{
    //       vpaAddress.isSelected || vpaAddress.default == "Y" ? vpaAddress.isSelected = true : vpaAddress.isSelected = false;
    //       vpaAddress.accounts.map((account:any)=>{
    //         account.isSelected || account.isDefaultAccount == "Y" ? account.isSelected = true : account.isSelected = false;
    //         return account;
    //       })
    //       return vpaAddress;
    //     });
    //   }

    // this.defaultVpaAccountArr = this.DataService.upiPayVpaList.find((vpaAddress)=>{ return vpaAddress.default == "Y"});
    //   console.log("defaultVpaAccountArr",this.defaultVpaAccountArr)
    //   this.transferActList = this.depositActList = this.defaultVpaAccountArr.accounts.map((account:any)=>{
    //     account.isSelected || account.isDefaultAccount == "Y" ? account.isSelected = true : account.isSelected = false;
    //     return account;
    //   })
    //   console.log("transferActList", this.transferActList);
    //   this.depositActList = this.defaultVpaAccountArr.accounts.map((account:any)=>{
    //     account.isSelected == false || account.isDefaultAccount == "N"
    //     return account;
    //   })
  }

  upiAccountList() {
    var req = this.SelfTransferService.getVpaAccountList();
    this.UpiApiCall(req);
  }

  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_FETCHDISTINCTACCOUNTLIST:
            this.depositActList = [];
            this.transferActList = [];
            this.DataService.selfTransferActList = response.responseParameter.accountlist;
            if (this.DataService.selfTransferActList.length > 1) {
              this.DataService.selfTransferActList.forEach((account, index) => {
                if (index == 0) {
                  account.isSelected = true;
                } else {
                  account.isSelected = false;
                  this.depositActList.push(account);
                }
                this.transferActList.push(account);
              });
              this.getAccountSelected('TRNS', 0);
              break;
            } else {
              this.showPopup('selfTransferAlert')
              break;
              // this.goToPage('payUpi');
            }
          default:
            break;
        }
      }
      else {
        if (response.status == "01") {
          // showToastMessage(response.msg, "error");
          this.goToPage('payUpi');
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  getAccountSelected(type, index) {
    if (type == 'TRNS') {
      this.transferAct = {};
      this.depositActList = [];
      this.proceedEnable = true;
      this.transferActList.forEach((trnAccount, trnsInd) => {
        if (index == trnsInd) {
          trnAccount.isSelected = true;
          trnAccount.isDeposit = false;
          this.transferAct = trnAccount;
        }
        else {
          trnAccount.isSelected = false;
          trnAccount.isDeposit = false;
          this.depositActList.push(trnAccount);
        }
      });
    } else {
      this.depositAct = {};
      this.proceedEnable = false;
      this.depositActList.forEach((depAccount, depInd) => {
        if (index == depInd) {
          // depAccount.isSelected = true;
          depAccount.isDeposit = true;
          this.depositAct = depAccount;
        } else {
          // depAccount.isSelected = false;
          depAccount.isDeposit = false;
          // this.depositActList.push(depAccount)
        }
      });
    }
    // let depositAct :DepositAct = new DepositAct().deserialize(this.depositAct);
    // let transferAct :TransferAct = new TransferAct().deserialize(this.transferAct);
    this.DataService.selfTransferActList.depositAct = this.depositAct
    console.log("depositAct => ", this.DataService.selfTransferActList.depositAct);
    this.DataService.selfTransferActList.transferAct = this.transferAct
    console.log("tansferAct => ", this.DataService.selfTransferActList.transferAct);
  }

  getDepstActSelected(type, index) {
    if (type == 'DPST') {
      // this.depositActList = []
      this.depositActList.forEach((account, ind) => {
        if (index == ind) {
          account.isSelected = true;
          account.isDeposit = true;
          this.depositAct.push(account)
        } else {
          // account.isSelected = false;
          // account.isDeposit = true;
          // this.depositActList.push(account)
        }
      });

      // let depositActList:DepositAct = new DepositAct().deserialize(this.depositActList);
      // let transferActList:TransferAct = new TransferAct().deserialize(this.transferActList);
    }
    // else {
    //     this.depositActList.forEach((account, ind) => {
    //         if (index == ind) {
    //             account.isSelected = true;
    //         }
    //     });
    // }
  }

  /**
 * show popup by popupName
 * @param popupName 
 * @param data 
 */
  showPopup(popupName, data?) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
    // this.popupData = data ? data : {};
    // console.log('this.popupData', this.popupData);
  }

  /**
   * Close popup by popupName
   * @param popupName 
   */
  closePopup(popupName) {
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
  }


  goToPage(routeName) {
    // this.DataService.selfTransferActList.selfTransferAct = this.depositActList.array.forEach(element => {
    //   return element.transferAct.isSelected == true
    // });
    // this.DataService.selfTransferActList.selfDepositAct = this.depositActList.array.forEach(element => {
    //   return element.depositAct.isSelected == true
    // });
    // console.log("selfTransferAct",this.DataService.selfTransferActList.selfTransferAct);
    // console.log("selfDepositAct",this.DataService.selfTransferActList.selfDepositAct);
    this.DataService.resetSelfTransReceiptObjData();
    this.router.navigateByUrl('/' + routeName);
  }
}
