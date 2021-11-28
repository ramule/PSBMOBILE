import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../../../services/data.service';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { AccountOpeningStepsService } from '../account-opening-steps/account-opening-steps.service';
import { DropDownMaster , AccountOpeningSteps} from '../../../../../utilities/app-enum';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var showToastMessage: any;

@Component({
  selector: 'app-account-opening-personal-details',
  templateUrl: './account-opening-personal-details.component.html',
  styleUrls: ['./account-opening-personal-details.component.scss']
})
export class AccountOpeningPersonalDetailsComponent implements OnInit {

  @Output() nextEvent = new EventEmitter<number>();
  personalInfoForm: FormGroup;
  headerdata = {
    'headerType': 'UpiMainHeader',  //Options: TitleHeader , preloginHeader
    'titleName': '',            // Note : add titlename if headerType = TitleHeader
    'footertype': 'none' //Options: upiFooter , none
  };
  maritalStatusList:any;
  communityList:any;
  categoryList:any;
  stateList:any;
  cityList:any;


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
    this.dataService.changeMessage(this.headerdata);
    this.buildForm();
    this.getMaritalStatus();
    this.getCategory();
    this.getCommunity();
    this.getState();
  }

  buildForm() {
    this.personalInfoForm = new FormGroup({
      gender: new FormControl(''),
      fullName: new FormControl(''),
      dob: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      addline1: new FormControl(''),
      addline2: new FormControl(''),
      pincode: new FormControl(''),
      nationality: new FormControl(''),
      maritalStatus: new FormControl('', [Validators.required]),
      community: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
    this.setPersonalData();
  }

  setPersonalData(){
    console.log(this.dataService.accountOpenFldData);
    this.personalInfoForm.patchValue({
      fullName : (this.dataService.accountOpenFldData.FirstName+ " "+ this.dataService.accountOpenFldData.middlename +" "+ this.dataService.accountOpenFldData.LastName).toUpperCase(),
      gender : this.dataService.accountOpenFldData.gender == 'M' ? 'MALE' : 'FEMALE',
      dob : this.dataService.accountOpenFldData.dob,
      state : this.dataService.accountOpenFldData.permanentAddrState,
      city : this.dataService.accountOpenFldData.permanentAddrCity,
      addline1 : this.dataService.accountOpenFldData.permanentAddrL1,
      addline2 : this.dataService.accountOpenFldData.permanentAddrL2,
      pincode : this.dataService.accountOpenFldData.permanentAddrPin,
      nationality : this.dataService.accountOpenFldData.nationality,
      maritalStatus : this.dataService.accountOpenFldData.maritalStatus,
      community: this.dataService.accountOpenFldData.community,
      category: this.dataService.accountOpenFldData.category,
    });
    //this.getCity(this.dataService.accountOpenFldData.permanentAddrState);
    console.log(this.personalInfoForm)
  }

  routeTo(location) {
    console.log('location', location);
    this.router.navigateByUrl(location);
  }

  submitForm() {
    //this.nextEvent.next(1);
    if(this.personalInfoForm.valid){
      this.dataService.accountOpenFldData.maritalStatus = this.personalInfoForm.value.maritalStatus;
      this.dataService.accountOpenFldData.community = this.personalInfoForm.value.community ;
      this.dataService.accountOpenFldData.category = this.personalInfoForm.value.category;
      this.createAccount();
    }
  }
  cancel() {

  }

  getMaritalStatus() {
    console.log("=====MARITAL_STATUS=====");
    var param = this.accOpeningService.getDropDownMasterParam(DropDownMaster.MARITAL_STATUS);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETREFCODE).subscribe(data => {
      console.log("=====MARITAL_STATUS=====",data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('listofDataset')) {
          this.maritalStatusList = data.listofDataset[0].records;
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  getCommunity() {
    console.log("=====COMMUNITY=====");
    var param = this.accOpeningService.getDropDownMasterParam(DropDownMaster.COMMUNITY);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETREFCODE).subscribe(data => {
      console.log("=====COMMUNITY=====",data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('listofDataset')) {
          this.communityList = data.listofDataset[0].records;
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  getCategory() {
    console.log("=====CATEGORY=====");
    var param = this.accOpeningService.getDropDownMasterParam(DropDownMaster.CATEGORY);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETREFCODE).subscribe(data => {
      console.log("=====CATEGORY=====",data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('listofDataset')) {
          this.categoryList = data.listofDataset[0].records;
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  createAccount(){
    var param = this.accOpeningService.getSaveaAccOpenParam(AccountOpeningSteps.PERSONAL_DETAILS,0);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serivceName_SAVEACCOUNTOPENINGDATA).subscribe(data => {
      console.log("=====CREATEACCOUNT=====",data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.nextEvent.next(1);
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  getState() {
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

  getCity(stateId) {
    this.cityList = [];
    let cityListParams = this.accOpeningService.getCityListParams(stateId);
    this.http.callBankingAPIService(cityListParams, this.constant.deviceID, this.constant.serviceName_GETCITIES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('set')) {
          this.cityList = data.set.records;
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
