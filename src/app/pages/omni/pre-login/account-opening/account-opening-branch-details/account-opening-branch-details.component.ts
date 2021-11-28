import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../../../services/data.service';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { AccountOpeningStepsService } from '../account-opening-steps/account-opening-steps.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { DropDownMaster , AccountOpeningSteps} from '../../../../../utilities/app-enum';
import { AppConstants } from 'src/app/app.constant';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var showToastMessage: any;



@Component({
  selector: 'app-account-opening-branch-details',
  templateUrl: './account-opening-branch-details.component.html',
  styleUrls: ['./account-opening-branch-details.component.scss']
})
export class AccountOpeningBranchDetailsComponent implements OnInit {
  selectedOption = 'pincode'
  searchForm: FormGroup;
  pinCodeBankList:any = [];
  selBranchDtl:any;
  pinlength:any;
  stateList:any;
  cityList:any;
  selBranch:any;
  CityBankList:any = [];
  selectedBranchFrmCity:any;
  selectedBranchFrmCityDtl:any;
  showerror:boolean = false
  finalStateId:any=""

  @Output() nextEvent = new EventEmitter<number>();
  @Output() prevEvent = new EventEmitter<number>();

  constructor(private router: Router,
    private commonMethods: CommonMethods,
    private form: FormBuilder,
    private dataService: DataService,
    private translate: TranslatePipe,
    public accOpeningService: AccountOpeningStepsService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    ) { }

  ngOnInit(): void {
    this.selectedOption = this.dataService.accountOpenFldData.branchSearchType ? this.dataService.accountOpenFldData.branchSearchType : 'pincode';
    this.getState();
    this.buildForm();
  }

  buildForm() {
    this.searchForm = new FormGroup({
      pinNumber: new FormControl(''),
      pinbranch: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      statebranch: new FormControl(''),

    });
    this.customValidation();
    this.setBranchDtl();
  }

  setBranchDtl(){
    this.searchForm.patchValue({
      pinNumber: this.dataService.accountOpenFldData.branchPinCode,
      pinbranch: this.dataService.accountOpenFldData.branchCode,
      state: this.dataService.accountOpenFldData.branchState,
      city: this.dataService.accountOpenFldData.branchCity,
      statebranch: this.dataService.accountOpenFldData.branchCode
    });

    if(this.selectedOption == 'pincode' && this.searchForm.value.pinNumber ){
      this.pinlength = this.searchForm.value.pinNumber.length;
      this.verifyPincode('onload');
    }
    else{
      if(this.dataService.accountOpenFldData.branchState){
        this.getCity(this.dataService.accountOpenFldData.branchState,'onload');
      }
    }
  }

  searchChange(option) {
    this.selectedOption = option;
    this.customValidation()
  }

  customValidation() {
    if (this.selectedOption == 'pincode') {
      this.searchForm.controls['pinNumber'].setValidators([Validators.required]);
      this.searchForm.controls['pinbranch'].setValidators([Validators.required]);
    } else {
      this.searchForm.controls['pinNumber'].clearValidators();
      this.searchForm.controls['pinbranch'].clearValidators();

    }
    if (this.selectedOption == 'state') {
      this.searchForm.controls['state'].setValidators([Validators.required]);
      this.searchForm.controls['city'].setValidators([Validators.required]);
      this.searchForm.controls['statebranch'].setValidators([Validators.required]);
    } else {
      this.searchForm.controls['state'].clearValidators();
      this.searchForm.controls['city'].clearValidators();
      this.searchForm.controls['statebranch'].clearValidators();

    }
    this.searchForm.controls['pinNumber'].updateValueAndValidity();
    this.searchForm.controls['pinbranch'].updateValueAndValidity();
    this.searchForm.controls['state'].updateValueAndValidity();
    this.searchForm.controls['city'].updateValueAndValidity();
    this.searchForm.controls['statebranch'].updateValueAndValidity();
  }

  submit() {
    this.validateForm()
    if (this.searchForm.valid) {
      this.dataService.accountOpenFldData.branchSearchType = this.selectedOption;
      this.dataService.accountOpenFldData.branchPinCode = this.selectedOption == 'pincode' ? this.searchForm.value.pinNumber : ''
      this.dataService.accountOpenFldData.branchState = this.searchForm.value.state;
      this.dataService.accountOpenFldData.branchCity = this.searchForm.value.city;
      this.dataService.accountOpenFldData.branchCode = this.selectedOption == 'pincode' ? this.searchForm.value.pinbranch.substr(this.searchForm.value.pinbranch.length - 4) : this.searchForm.value.statebranch
      this.createAccount();
    }
  }

  prevtab() {
    this.prevEvent.next(3);
  }

  validateForm() {
    if (this.selectedOption == 'state') {
      if (this.searchForm.invalid) {
        this.searchForm.get('state').markAsTouched();
        this.searchForm.get('city').markAsTouched();
        this.searchForm.get('statebranch').markAsTouched();
        return;
      }
    } else {
      if (this.searchForm.invalid) {
        this.searchForm.get('pinNumber').markAsTouched();
        this.searchForm.get('pinbranch').markAsTouched();
        return;
      }
    }

  }

  onPinChange(){
    this.pinlength = this.searchForm.value.pinNumber.length;
    this.searchForm.patchValue({pinbranch:''});
    this.selBranchDtl= '';
    this.pinCodeBankList = [];
  }

  selCityBranch(value){
    this.selectedBranchFrmCity = this.CityBankList.find(x => x.branchCode === value);
    this.selectedBranchFrmCityDtl = this.selectedBranchFrmCity.cust_address;
  }

  verifyPincode(type?:any){
    var pincode = this.searchForm.value.pinNumber;
    this.getBankDtls(pincode,type);
  }

  createAccount(){

    var param = this.accOpeningService.getSaveaAccOpenParam(AccountOpeningSteps.BRANCH_DETAILS,0);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serivceName_SAVEACCOUNTOPENINGDATA).subscribe(data => {
      console.log("=====CREATEACCOUNT=====",data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.nextEvent.next(3);
       
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  getBankDtls(pincode,type?:any){
    
    var param = this.accOpeningService.getBankDetailsFromPincode(pincode);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serivceName_GETLOCATIONSONPINCODE).subscribe(data => {
      console.log("=====get bank dtl=====",data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.set.records);
        this.pinCodeBankList = data.set.records;

        if(this.pinCodeBankList.length == 0)
        {
          showToastMessage('No Branch found for the entered PIN Code, please search by selecting State and City')
          this.showerror=true
        }
        else
        this.showerror=false
      

        if(type == 'onload'){
          this.selPincodeBranch(this.dataService.accountOpenFldData.branchCode);
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  selPincodeBranch(branchCode){
    this.selBranch = this.pinCodeBankList.find(x => x.branchCode === branchCode);
    this.selBranchDtl = this.selBranch.cust_address;
  }

  getState(){
    let stateListParams = this.accOpeningService.getStateListParams();
    this.http.callBankingAPIService(stateListParams, this.constant.deviceID, this.constant.serviceName_GETSTATES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('set')) {
          this.stateList = data.set.records;
         
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);

      }
    });
  }

  getCity(stateId,type?:any){
    this.finalStateId = stateId
    this.cityList = [];
    this.CityBankList = [];
    this.selectedBranchFrmCityDtl = "";
    this.searchForm.patchValue({city:'',statebranch:''});
    let cityListParams = this.accOpeningService.getCityListParams(stateId);
      this.http.callBankingAPIService(cityListParams, this.constant.deviceID, this.constant.serviceName_GETCITIES).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
          if (data.hasOwnProperty('set')) {
            this.cityList = data.set.records;
            if(type == 'onload'){
              this.searchForm.patchValue({ city: this.dataService.accountOpenFldData.branchCity });
              this.getBranchLocFromCity(this.dataService.accountOpenFldData.branchCity,type);
            }
          }
        }
        else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  getBranchLocFromCity(cityId,type?:any){
    this.commonMethods.showLoader()
    this.CityBankList = [];
    this.selectedBranchFrmCityDtl = "";
    this.searchForm.patchValue({statebranch:''});
    let branchListParams = this.accOpeningService.getBranchListParams(cityId,this.finalStateId);
    //this.http.callBankingAPIService(branchListParams, this.constant.deviceID, this.constant.serviceName_GETLOCATIONS).subscribe(data => {
      this.http.callBankingAPIService(branchListParams, this.constant.deviceID, this.constant.serviceName_GETLOCATIONBYSTATECITYBRANCH).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.commonMethods.hideLoader()
        console.log(data.responseParameter);
        if (data.hasOwnProperty('set')) {
          this.CityBankList = data.set.records;
          if(type == 'onload'){
            this.searchForm.patchValue({ statebranch: this.dataService.accountOpenFldData.branchCode });
            this.selCityBranch(this.dataService.accountOpenFldData.branchCode);
          }
        }
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
    //showToastMessage(resp.Result, "error");
  }

  

}
