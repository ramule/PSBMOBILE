import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../../../services/data.service';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { AccountOpeningStepsService } from '../account-opening-steps/account-opening-steps.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { DropDownMaster , AccountOpeningSteps} from '../../../../../utilities/app-enum';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var showToastMessage: any;

@Component({
  selector: 'app-account-opening-account-selection',
  templateUrl: './account-opening-account-selection.component.html',
  styleUrls: ['./account-opening-account-selection.component.scss']
})
export class AccountOpeningAccountSelectionComponent implements OnInit {
  searchForm: FormGroup;
  accountOpenSubForm: FormGroup;
  popupdata
  @Output() nextEvent = new EventEmitter<number>();
  @Output() prevEvent = new EventEmitter<number>();
  @Output() popuptype = new EventEmitter<any>();

  @Output() factaEvent = new EventEmitter<string>();
  @Output() bankTCEvent = new EventEmitter<string>();


  constructor(private router: Router,
    private commonMethods: CommonMethods,
    private form: FormBuilder,
    private dataService: DataService,
    private translate: TranslatePipe,
    public accOpeningService: AccountOpeningStepsService,
    private http: HttpRestApiService,
    public constant: AppConstants,
    ) {
      this.commonMethods.termAcceptedEvent
    .subscribe((data:boolean) => {
      this.accountOpeningTermsFlag = data
      this.accountOpenSubForm.patchValue({
        bankTerm:true
      })
    });
     }
  accounttype = ""
  accountOpeningTermsFlag:boolean = false
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.accountOpenSubForm = new FormGroup({
      factcaDclr: new FormControl(false, Validators.requiredTrue),
      bankTerm: new FormControl(false, Validators.requiredTrue),
      smsPermission: new FormControl(''),
    });
  }

  selectAccType(type) {
    this.accounttype = type
  }

  validateForm(){
    if (this.accountOpenSubForm.invalid) {
      this.accountOpenSubForm.get('factcaDclr').markAsTouched();
      this.accountOpenSubForm.get('bankTerm').markAsTouched();
      this.accountOpenSubForm.get('smsPermission').markAsTouched();
      return;
    }
  }


  submit() {
    this.validateForm();
    if (this.accountOpenSubForm.valid) {
      this.dataService.accountOpenFldData.smsEmailPermission = this.accountOpenSubForm.value.smsPermission==true ? 'Y' : 'N'
      this.dataService.accountOpenFldData.bankTearmCondition = this.accountOpenSubForm.value.bankTerm==true ? 'Y' : 'N'
      this.dataService.accountOpenFldData.isFatcaDeclaration = this.accountOpenSubForm.value.factcaDclr==true ? 'Y' : 'N'
      this.createAccount();
    }
    else
    showToastMessage('Please Select Account Type')
    // this.openPopup('initialpayment');
  }


  createAccount() {
    var param = this.accOpeningService.getSaveaAccOpenParam(AccountOpeningSteps.ACCOUNT_SELECTION, 0);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serivceName_SAVEACCOUNTOPENINGDATA).subscribe(data => {
      console.log("=====CREATEACCOUNT=====", data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);

        if(resp.accountNo != undefined && resp.accountNo != "" && resp.customerID!=undefined && resp.customerID!=""){
          this.dataService.accountDtls.UPI_ADDRESS = resp.UPI_ADDRESS != undefined && resp.UPI_ADDRESS != "" ? resp.UPI_ADDRESS : '-' ;
          this.dataService.accountDtls.accountNo = resp.accountNo != undefined && resp.accountNo != "" ? resp.accountNo : '-' ;
          this.dataService.accountDtls.branch_name = resp.branch_name != undefined && resp.branch_name != "" ? resp.branch_name : '-' ;
          this.dataService.accountDtls.customerID = resp.customerID != undefined && resp.customerID != "" ? resp.customerID : '-' ;
          this.createVirtualCard();
          this.router.navigateByUrl("/accountOpeningSuccess");
        }
        else{
          //TODO: remove this code if cbs work properly;
        //  this.createAccountTemp();
        this.commonMethods.openPopup('account-open-error');
        // showToastMessage('Invalid information shared please visit branch.', "error");
        }
        
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }



  createVirtualCard(){
    var param = this.accOpeningService.getApplyCardAccOpenParam();
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_ISSUEDEBITCARDFORACCOPEN).subscribe(data => {
      console.log("=====CARDCREATED=====", data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        "Account number|card type|EcommFlag|DisplayName|CardNum|Personilzedcard(P/V)|"
        var _debitCardIssuedData = this.dataService.accountDtls.accountNo + "|RUPDO|N|" + this.dataService.accountOpenFldData.FirstName.toUpperCase() + " " + this.dataService.accountOpenFldData.LastName.toUpperCase() + "|" + JSON.parse(resp.responseParameter.CardDetails)[0].CardNumber +"|VP|"
        this.createCardsInCbs(_debitCardIssuedData)
        this.dataService.accountOpenFldData = ""
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }


  createCardsInCbs(_debitCardIssuedData){
    var param = this.accOpeningService.getApplyCardAccOpenCbsParam(_debitCardIssuedData);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_DEBITCARDISSUEFORACCOPEN).subscribe(data => {
      console.log("=====CARDCREATED=====", data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }


  createAccountTemp(){
    var param = this.accOpeningService.getSaveaAccOpenParam(AccountOpeningSteps.ACCOUNT_SELECTION, 0);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serivceName_SAVEACCOUNTOPENINGDATA).subscribe(data => {
      console.log("=====CREATEACCOUNT=====", data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.dataService.accountDtls.UPI_ADDRESS = resp.UPI_ADDRESS != undefined && resp.UPI_ADDRESS != "" ? resp.UPI_ADDRESS : '-' ;
        this.dataService.accountDtls.accountNo = resp.accountNo != undefined && resp.accountNo != "" ? resp.accountNo : '-' ;
        this.dataService.accountDtls.branch_name = resp.branch_name != undefined && resp.branch_name != "" ? resp.branch_name : '-' ;
        this.dataService.accountDtls.customerID = resp.customerID != undefined && resp.customerID != "" ? resp.customerID : '-' ;
        this.router.navigateByUrl("/accountOpeningSuccess");
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  prevtab() {
    this.prevEvent.next(6);
  }

  openPopup(popupName) {
    this.popupdata = {
      type: this.accounttype,
      name: popupName
    }
    this.popuptype.next(this.popupdata)
  }

  closePopup(popupName) {
    this.commonMethods.closePopup('div.popup-bottom.' + popupName);
  }

  // createAccount(){
  //   var param = this.accOpeningService.getSaveaAccOpenParam(AccountOpeningSteps.ACCOUNT_SELECTION,0);
  //   this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serivceName_SAVEACCOUNTOPENINGDATA).subscribe(data => {
  //     console.log("=====CREATEACCOUNT=====",data);
  //     var resp = data.responseParameter
  //     if (resp.opstatus == "00") {
  //       console.log(data.responseParameter);
  //       this.nextEvent.next(5);
  //     }
  //     else {
  //       this.errorCallBack(data.subActionId, resp);
  //     }
  //   });
  // }



  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
   errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result, "error");
  }

  opencustpoup(e){
    switch(e){
      case 'factca': 
        this.factaEvent.next(e)
      break ;

      case 'bankTermsCondition': 
        this.bankTCEvent.next(e)
      break ;
    }
  }

  
}
