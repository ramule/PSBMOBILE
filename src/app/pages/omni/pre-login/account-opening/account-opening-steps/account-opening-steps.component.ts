import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../../../services/data.service';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { AccountOpeningStepsService } from '../account-opening-steps/account-opening-steps.service';
import { DropDownMaster , AccountOpeningSteps} from '../../../../../utilities/app-enum';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
declare var showToastMessage: any;
import { TermsConditonsComponent } from 'src/app/pages/common-ui/terms-conditons/terms-conditons.component';

@Component({
  selector: 'app-account-opening-steps',
  templateUrl: './account-opening-steps.component.html',
  styleUrls: ['./account-opening-steps.component.scss']
})
export class AccountOpeningStepsComponent implements OnInit {

  activeTab = "step1"
  curentTabIndex = 1;
  amtlist = [500, 1000, 2000]
  modelType
  depositForm: FormGroup;
  transactionId:any;
  termsCondition : any = '' ;

  @ViewChild(TermsConditonsComponent) childTermsReg: TermsConditonsComponent;

  constructor(private router: Router,
    private commonMethods: CommonMethods,
    private form: FormBuilder,
    private dataService: DataService,
    public translate: TranslatePipe,
    public accOpeningService: AccountOpeningStepsService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    ) { }
  
  accOpeningteps = [{
    "stepIndex": 1,
    "stepname":"Personal Details",
    "stepActive": true,
    "stepStatus": "inprogress",
    "tabName": "step1"
  },
  {
    "stepIndex": 2,
    "stepname": "Additional Details",
    "stepActive": false,
    "stepStatus": "incomplete",
    "tabName": "step2"
  },
  {
    "stepIndex": 3,
    "stepname": "Branch Details",
    "stepActive": false,
    "stepStatus": "incomplete",
    "tabName": "step3"
  },
  {
    "stepIndex": 4,
    "stepname": "Nominee Details",
    "stepActive": false,
    "stepStatus": "incomplete",
    "tabName": "step4"
  },
  {
    "stepIndex": 5,
    "stepname": "Create UPI ID ",
    "stepActive": false,
    "stepStatus": "incomplete",
    "tabName": "step5"
  },
  {
    "stepIndex": 6,
    "stepname": "Account Selection",
    "stepActive": false,
    "stepStatus": "incomplete",
    "tabName": "step6"
  },
  ]

  ngOnInit(): void {
    this.jumpToStep();
    this.buildForm();
  }
 
  jumpToStep(){
    
    this.activeTab = "step" + this.dataService.accountOpenIsAtStep
    for(var i = 0; i < this.dataService.accountOpenIsAtStep ;i++ ){
        if(this.accOpeningteps[i].stepIndex != parseInt(this.dataService.accountOpenIsAtStep)){
          this.accOpeningteps[i].stepActive = false
          this.accOpeningteps[i].stepStatus = 'completed'
        }else{
          this.accOpeningteps[i].stepActive = true
          this.accOpeningteps[i].stepStatus = 'inprogress'
        }
    }
  }
  buildForm() {
    this.depositForm = new FormGroup({
      amt: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      amtSuggestion: new FormControl(''),
    });
  }

  validateForm() {
    if (this.depositForm.invalid) {
      this.depositForm.get('amt').markAsTouched();
      return;
    }
  }



  onAmtselect(amt) {
    this.depositForm.controls.amt.setValue(amt);
  }

  amountChange() {
    this.depositForm.controls.amtSuggestion.setValue(null);
  }


  prevstep(step) {
    let stepindex = step - 2
    console.log(stepindex)
    this.accOpeningteps[stepindex].stepActive = true
    this.accOpeningteps[stepindex + 1].stepActive = false
    this.activeTab = "step" + (step - 1)
    console.log(step)
    this.curentTabIndex = step - 1
  }

  nextstep(step) {
    console.log(step);
    let stepindex = step - 1
    console.log(stepindex)
    this.accOpeningteps[stepindex].stepStatus = "completed"
    this.accOpeningteps[stepindex].stepActive = false
    this.accOpeningteps[stepindex + 1].stepActive = true
    if (this.accOpeningteps[stepindex + 1].stepStatus != "completed") {
      this.accOpeningteps[stepindex + 1].stepStatus = "inprogress"
    }
    this.activeTab = "step" + (step + 1)
    this.curentTabIndex = step + 1
  }




  openPopup(data) {

    console.log(JSON.stringify(data))
    this.modelType = data.type;
    this.commonMethods.openPopup('div.popup-bottom.' + data.name);
  }

  closePopup() {
    this.commonMethods.closePopup('div.popup-bottom');
  }

  closePopup_err(popup){
    this.commonMethods.closePopup('div.popup-bottom'+popup);
  }

  submitForm() {
    this.validateForm();
    if (this.depositForm.valid) {
      this.createAccount();
    }
  }

  onstepChange(stepname, stepindex) {
    console.log(stepname, stepindex);
    // if(stepindex < this.DataService.regIsAtStep){
    //   return;
    // }
    this.activeTab = stepname
    for (let i = 0; i < this.accOpeningteps.length; i++) {
      this.accOpeningteps[i].stepActive = false;
    }
    this.accOpeningteps[stepindex - 1].stepActive = true;

  }

  skipPayment(){
    this.createAccount();
  }


  createAccount() {
    var param = this.accOpeningService.getSaveaAccOpenParam(AccountOpeningSteps.ACCOUNT_SELECTION, 0);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serivceName_SAVEACCOUNTOPENINGDATA).subscribe(data => {
      console.log("=====CREATEACCOUNT=====", data);
      var resp = data.responseParameter;
      this.closePopup();
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

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result, "error");
  }

  goToLogin(){
    if(this.constant.getPlatform() == 'web'){
      this.router.navigateByUrl("/nliLanding");
    }
    else{
      this.router.navigateByUrl("/LandingPage");
    }
  }
  termsConditionPopup(e){
    switch(e){
      case 'factca' :
        this.commonMethods.openPopup('div.terms-conditions-facta')
        break ;
      
      case 'bankTermsCondition' :
        this.termsCondition =''
        this.termsCondition = e ;
        // this.commonMethods.openPopup('div.bank-terms-condition')
        this.childTermsReg.openPopupTerms() ;
        break ;
    }
   
  }
  closeTerms(){
    this.commonMethods.closeAllPopup();
  }
}
