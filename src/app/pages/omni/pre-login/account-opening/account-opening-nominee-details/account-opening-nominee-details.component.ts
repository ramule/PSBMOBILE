import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../../../services/data.service';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { PluginService } from 'src/app/services/plugin-service';
import { AccountOpeningStepsService } from '../account-opening-steps/account-opening-steps.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { DropDownMaster, AccountOpeningSteps } from '../../../../../utilities/app-enum';
declare var showToastMessage: any;
import * as moment from 'moment';


@Component({
  selector: 'app-account-opening-nominee-details',
  templateUrl: './account-opening-nominee-details.component.html',
  styleUrls: ['./account-opening-nominee-details.component.scss']
})
export class AccountOpeningNomineeDetailsComponent implements OnInit {
  @Output() nextEvent = new EventEmitter<number>();
  @Output() prevEvent = new EventEmitter<number>();

  nomineeForm: FormGroup;
  currentDate: any = moment().toDate();
  gardianTypeList: any;
  relationShipList: any;
  stateList: any = [];
  cityList: any = [];
  nomineeCityList: any = [];
  stateNomineeList: any = [];
  isNomineeAvailable: boolean = true;
  nomineeAge: number = 18;
  max = new Date();

  constructor(private router: Router,
    private commonMethods: CommonMethods,
    private form: FormBuilder,
    private pluginService: PluginService,
    private dataService: DataService,
    public translate: TranslatePipe,
    public accOpeningService: AccountOpeningStepsService,
    private http: HttpRestApiService,
    private constant: AppConstants,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getRelationShip();
    this.getGardianType();
    this.getState();
  }


  buildForm() {
    this.nomineeForm = new FormGroup({
      nomineeName: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z_ ]*$')]),
      nomineeRelation: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      NomcommAddLine1: new FormControl('', [Validators.required]),
      NomcommAddLine2: new FormControl('', [Validators.required]),
      nomineeState: new FormControl('', [Validators.required]),
      nomineeCity: new FormControl('', [Validators.required]),
      nomineePincode: new FormControl('', [Validators.required]),
      guardianName: new FormControl('',[Validators.pattern('^[a-zA-Z_ ]*$')]),
      guardianType: new FormControl(''),
      commAddLine1: new FormControl(''),
      commAddLine2: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      pincode: new FormControl(''),
    });

    this.setNomineeDtl();
  }


  setNomineeDtl(){
    this.nomineeForm.patchValue({
      nomineeName : this.dataService.accountOpenFldData.nomineeName,
      nomineeRelation : this.dataService.accountOpenFldData.nomineeRelationship,
      dob: new Date(this.dataService.accountOpenFldData.nomineeDOB),
      address: this.dataService.accountOpenFldData.isNomineeAddSameAsPermanent,
      NomcommAddLine1: this.dataService.accountOpenFldData.nomineeAddrL1,
      NomcommAddLine2: this.dataService.accountOpenFldData.nomineeAddrL2,
      nomineeState: this.dataService.accountOpenFldData.nomineeAddrState,
      nomineeCity: this.dataService.accountOpenFldData.nomineeAddrCity,
      nomineePincode: this.dataService.accountOpenFldData.nomineeAddrPin,
      guardianName: this.dataService.accountOpenFldData.guardian,
      guardianType: this.dataService.accountOpenFldData.guardianType,
      commAddLine1: this.dataService.accountOpenFldData.guardianAddrL1,
      commAddLine2: this.dataService.accountOpenFldData.guardianAddrL2,
      state: this.dataService.accountOpenFldData.guardianAddrState,
      city: this.dataService.accountOpenFldData.guardianAddrCity,
      pincode: this.dataService.accountOpenFldData.guardianAddrPin,
    })



    if(this.dataService.accountOpenFldData.donNotWantNominee){
      var _event = {
        target:{
          checked : this.dataService.accountOpenFldData.donNotWantNominee
        }
      }
      this.dontAvailNominee(_event);
    }
    if(this.nomineeForm.value.address == true){
      var event = {
        target:{
          checked : true
        }
      }
      this.changeAddress(event);
    }
    if(this.dataService.accountOpenFldData.nomineeAddrState){
      this.getNomineeCity(this.dataService.accountOpenFldData.nomineeAddrState);
    }
    if(this.dataService.accountOpenFldData.nomineeDOB){
      this.onDateChange(new Date(this.dataService.accountOpenFldData.nomineeDOB));
    }
    if(this.dataService.accountOpenFldData.guardianAddrState){
      this.getCity(this.dataService.accountOpenFldData.guardianAddrState);
    }
  }


  prevtab() {
    this.prevEvent.next(4);
  }



  changeAddress(event) {
    if (!event.target.checked) {
      this.nomineeForm.patchValue({
        NomcommAddLine1 : "",
        NomcommAddLine2 : "",
        nomineeState : "",
        nomineeCity : "",
        nomineePincode : ""
       });
      $('#nomAddress').slideDown()
    } else {
      this.nomineeForm.patchValue({
        NomcommAddLine1 : this.dataService.accountOpenFldData.permanentAddrL1,
        NomcommAddLine2 : this.dataService.accountOpenFldData.permanentAddrL2,
        nomineeState : this.dataService.accountOpenFldData.permanentAddrState,
        nomineeCity : this.dataService.accountOpenFldData.permanentAddrCity,
        nomineePincode : this.dataService.accountOpenFldData.permanentAddrPin
       });
      $('#nomAddress').slideUp()
    }
  }

  dontAvailNominee(event) {
    if (event.target.checked) {
      this.nomineeForm.reset();
      this.nomineeForm.disable();
      this.isNomineeAvailable = false;
    } else {
      this.isNomineeAvailable = true;
      this.nomineeForm.enable();
    }
  }

  submit() {
    this.validateForm()
    if (this.isNomineeAvailable) {
      if (this.nomineeForm.valid) {
        this.nomineeApiCall();
      }
    }
    else {
      this.createAccount();
    }
  }

  nomineeApiCall() {

    this.dataService.accountOpenFldData.nomineeName = this.nomineeForm.value.nomineeName;
    this.dataService.accountOpenFldData.nomineeAddrL1 = this.nomineeForm.value.NomcommAddLine1;
    this.dataService.accountOpenFldData.nomineeAddrL2 = this.nomineeForm.value.NomcommAddLine2;
    this.dataService.accountOpenFldData.nomineeAddrCity = this.nomineeForm.value.nomineeCity;
    this.dataService.accountOpenFldData.nomineeAddrState = this.nomineeForm.value.nomineeState;
    this.dataService.accountOpenFldData.nomineeAddrPin = this.nomineeForm.value.nomineePincode;
    this.dataService.accountOpenFldData.nomineeDOB = this.nomineeForm.value.dob.toLocaleDateString().split('T')[0].split("/").join("-");
    this.dataService.accountOpenFldData.nomineeRelationship = this.nomineeForm.value.nomineeRelation;
    this.dataService.accountOpenFldData.guardianAddrL1 = this.nomineeForm.value.commAddLine1;
    this.dataService.accountOpenFldData.guardianAddrL2 = this.nomineeForm.value.commAddLine2;
    this.dataService.accountOpenFldData.guardianAddrCity = this.nomineeForm.value.city;
    this.dataService.accountOpenFldData.guardianAddrState = this.nomineeForm.value.state;
    this.dataService.accountOpenFldData.guardianAddrPin = this.nomineeForm.value.pincode;
    this.dataService.accountOpenFldData.guardian = this.nomineeForm.value.guardianName;
    this.dataService.accountOpenFldData.guardianType = this.nomineeForm.value.guardianType;
    this.dataService.accountOpenFldData.isNomineeAddSameAsPermanent = this.nomineeForm.value.address;
    this.dataService.accountOpenFldData.nomineeNotMinor = this.nomineeAge < 18 ? true : false;
    this.dataService.accountOpenFldData.donNotWantNominee = !this.isNomineeAvailable;
    console.log("=====>"+this.dataService.accountOpenFldData.nomineeDOB);
    this.createAccount();
  }

  validateForm() {
    if (this.nomineeForm.invalid) {
      this.nomineeForm.get('nomineeName').markAsTouched();
      this.nomineeForm.get('nomineeRelation').markAsTouched();
      this.nomineeForm.get('dob').markAsTouched();
      this.nomineeForm.get('NomcommAddLine1').markAsTouched();
      this.nomineeForm.get('NomcommAddLine2').markAsTouched();
      this.nomineeForm.get('nomineeState').markAsTouched();
      this.nomineeForm.get('nomineeCity').markAsTouched();
      this.nomineeForm.get('nomineePincode').markAsTouched();
      this.nomineeForm.get('guardianName').markAsTouched();
      this.nomineeForm.get('guardianType').markAsTouched();
      this.nomineeForm.get('commAddLine1').markAsTouched();
      this.nomineeForm.get('commAddLine2').markAsTouched();
      this.nomineeForm.get('state').markAsTouched();
      this.nomineeForm.get('city').markAsTouched();
      this.nomineeForm.get('pincode').markAsTouched();
      return;
    }
  }


  onDateChange(event) {

    var diff = Math.floor(this.currentDate - event);
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    this.nomineeAge = Math.floor(months / 12);

    console.log("this.nomineeAge: " + this.nomineeAge)
    if (this.nomineeAge < 18) {
      $('#guardian').slideDown();
    } else {
      $('#guardian').slideUp();
    }
    this.nomineeMinorFeildUpdate();
  }

  nomineeMinorFeildUpdate(){
    if (this.nomineeAge < 18) {
      this.nomineeForm.controls['guardianName'].setValidators([Validators.required,Validators.pattern('^[a-zA-Z_ ]*$')]);
      this.nomineeForm.controls['guardianType'].setValidators([Validators.required]);
      this.nomineeForm.controls['commAddLine1'].setValidators([Validators.required]);
      this.nomineeForm.controls['commAddLine2'].setValidators([Validators.required]);
      this.nomineeForm.controls['state'].setValidators([Validators.required]);
      this.nomineeForm.controls['city'].setValidators([Validators.required]);
      this.nomineeForm.controls['pincode'].setValidators([Validators.required]);
    }
    else{
      this.nomineeForm.controls['guardianName'].clearValidators();
      this.nomineeForm.controls['guardianType'].clearValidators();
      this.nomineeForm.controls['commAddLine1'].clearValidators();
      this.nomineeForm.controls['commAddLine2'].clearValidators();
      this.nomineeForm.controls['state'].clearValidators();
      this.nomineeForm.controls['city'].clearValidators();
      this.nomineeForm.controls['pincode'].clearValidators();
    }
    this.nomineeForm.controls['guardianName'].updateValueAndValidity();
    this.nomineeForm.controls['guardianType'].updateValueAndValidity();
    this.nomineeForm.controls['commAddLine1'].updateValueAndValidity();
    this.nomineeForm.controls['commAddLine2'].updateValueAndValidity();
    this.nomineeForm.controls['state'].updateValueAndValidity();
    this.nomineeForm.controls['city'].updateValueAndValidity();
    this.nomineeForm.controls['pincode'].updateValueAndValidity();
  }

  getRelationShip() {
    var param = this.accOpeningService.getDropDownMasterParam(DropDownMaster.NOMINEE_TYPE);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETREFCODE).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        if (data.hasOwnProperty('listofDataset')) {
          this.relationShipList = data.listofDataset[0].records;
        }
      }
      else {
        this.relationShipList = [
          { "DESCRIPTION": "Father", "ref_code": "1" },
          { "DESCRIPTION": "Mother", "ref_code": "2" },
          { "DESCRIPTION": "Daughter", "ref_code": "3" },
          { "DESCRIPTION": "Son", "ref_code": "4" },
          { "DESCRIPTION": "Brother", "ref_code": "5" },
          { "DESCRIPTION": "Sister", "ref_code": "6" }
        ]
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  getGardianType() {
    var param = this.accOpeningService.getDropDownMasterParam(DropDownMaster.GUARDIAN_TYPE);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETREFCODE).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        if (data.hasOwnProperty('listofDataset')) {
          this.gardianTypeList = data.listofDataset[0].records;
        }
      }
      else {
        this.gardianTypeList = [
          { "DESCRIPTION": "Father", "ref_code": "1" },
          { "DESCRIPTION": "Mother", "ref_code": "2" },
          { "DESCRIPTION": "grandFather", "ref_code": "3" },
          { "DESCRIPTION": "Uncle", "ref_code": "4" }
        ]
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
          this.stateNomineeList = data.set.records;
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

  getNomineeCity(stateId) {
    this.nomineeCityList = [];
    let cityListParams = this.accOpeningService.getCityListParams(stateId);
    this.http.callBankingAPIService(cityListParams, this.constant.deviceID, this.constant.serviceName_GETCITIES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('set')) {
          this.nomineeCityList = data.set.records;
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  createAccount() {
    var param = this.accOpeningService.getSaveaAccOpenParam(AccountOpeningSteps.NOMINEE_DETAILS, 0);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serivceName_SAVEACCOUNTOPENINGDATA).subscribe(data => {
      console.log("=====CREATEACCOUNT=====", data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.nextEvent.next(4);
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
