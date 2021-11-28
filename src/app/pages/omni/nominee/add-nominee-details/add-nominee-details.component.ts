import { AddNomineeDetailsService } from './add-nominee-details.service';
import { data } from 'jquery';
// import { NomineeDetailsService } from './nominee-details.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { DropDownMaster, AccountOpeningSteps } from '../../../../utilities/app-enum';
import { DatePipe, Location } from '@angular/common'
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import * as moment from 'moment';


declare var showToastMessage: any;

@Component({
  selector: 'app-add-nominee-details',
  templateUrl: './add-nominee-details.component.html',
  styleUrls: ['./add-nominee-details.component.scss']
})
export class AddNomineeDetailsComponent implements OnInit {


  constructor(
    private router: Router,
    public DataService: DataService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    // private nomineeDetailService : NomineeDetailsService,
    private location: Location,
    private datePipe: DatePipe,
    private addNomineeDetailsService: AddNomineeDetailsService
  ) { }

  addNomineeDetails: FormGroup;
  stateList: any = [];
  stateNomineeList: any = [];
  cityList = [];
  gardianTypeList = [];
  relationShipList: any = [];
  nomineeData: any = [];
  nomineeAge: number = 18;
  currentDate: any = moment().toDate();
  accountNo: any;
  minorFlag: any;
  defaultDate: any;
  nomineeCityList: any[];

  max = new Date();

  ngOnInit(): void {

    history.pushState({}, "myAccountsInfo", this.location.prepareExternalUrl("myAccountsInfo"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    	 
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('ADD_NOMINEE' , this.router.url)
    this.accountNo = this.DataService.selectedNomineeAccNo;

    this.buildForm();
    this.getRelationShip();
    this.getState();
    this.DataService.setPageSettings('Nominee Details');

  }


  onDateChange(event) {
    var diff = Math.floor(this.currentDate - event);
    var day = 1000 * 60 * 60 * 24;
    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    this.nomineeAge = Math.floor(months / 12);

    if (this.nomineeAge < 18) {
      this.minorFlag = 'Y'
    } else {
      this.minorFlag = 'N'
      this.getGardianType();
    }
    this.DataService.minorFlagNominee = this.minorFlag ;
  }


  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }


  buildForm() {
    this.addNomineeDetails = new FormGroup({
      nomineeName: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z_ ]*$")]),
      nomineeRelationship: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      guardianName: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z_ ]*$")]),
      guardianRelationShip : new FormControl('', [Validators.required]),
      guardianAddress: new FormControl('', [Validators.required]),
      address1: new FormControl('', [Validators.required]),
      address2: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [Validators.required])

    });
  }

  validateForm() {
    this.guradianValidation() ;
    if (this.addNomineeDetails.invalid) {
      this.addNomineeDetails.get('nomineeName').markAsTouched();
      this.addNomineeDetails.get('nomineeRelationship').markAsTouched();
      this.addNomineeDetails.get('dob').markAsTouched();
      this.addNomineeDetails.get('guardianName').markAsTouched();
      this.addNomineeDetails.get('guardianRelationShip').markAsTouched();
      this.addNomineeDetails.get('guardianAddress').markAsTouched();
      this.addNomineeDetails.get('address1').markAsTouched();
      this.addNomineeDetails.get('address2').markAsTouched();
      this.addNomineeDetails.get('state').markAsTouched();
      this.addNomineeDetails.get('city').markAsTouched();
      this.addNomineeDetails.get('pinCode').markAsTouched();

      return;
    }
  }

  guradianValidation(){
    if(this.nomineeAge < 18){
      this.addNomineeDetails.get('guardianName').setValidators([Validators.required,, Validators.pattern("[a-zA-Z_ ]*$")]);
      this.addNomineeDetails.get('guardianAddress').setValidators([Validators.required]);
      this.addNomineeDetails.get('guardianRelationShip').setValidators([Validators.required]);


      this.addNomineeDetails.get('guardianName').updateValueAndValidity() ;
      this.addNomineeDetails.get('guardianAddress').updateValueAndValidity() ;
      this.addNomineeDetails.get('guardianRelationShip').updateValueAndValidity() ;

    } else {
      this.addNomineeDetails.get('guardianName').clearValidators();
      this.addNomineeDetails.get('guardianAddress').clearValidators();
      this.addNomineeDetails.get('guardianRelationShip').clearValidators();


      this.addNomineeDetails.get('guardianName').updateValueAndValidity() ;
      this.addNomineeDetails.get('guardianAddress').updateValueAndValidity() ;
      this.addNomineeDetails.get('guardianRelationShip').updateValueAndValidity() ;

    }
  }

  getState() {
    let stateListParams = this.addNomineeDetailsService.getStateListParams();
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

  errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result, "error");
  }

  getCity(stateId) {
    this.cityList = [];
    let cityListParams = this.addNomineeDetailsService.getCityListParams(stateId);
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

  //add the nominee details
  addNomineeService() {

    var nomineeDob = this.datePipe.transform(this.addNomineeDetails.value.dob, 'dd-MM-yyyy');
    var param = this.addNomineeDetailsService.getUpdateNomineeService(this.DataService.userDetails.cifNumber, this.accountNo, this.addNomineeDetails.value, this.minorFlag, nomineeDob);

    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ADDNOMINEEDATA).subscribe(data => {
      var resp = data.responseParameter;
      console.log("Response :: ", resp)
      if (resp.opstatus == "00") {
        this.DataService.nomineeReceiptObj.dateOfBirth = nomineeDob;
        console.log("Updated Nominee Data", data.set['records']);
        this.DataService.otpSessionPreviousPage =  this.router.url;
        this.goToPage('nomineeAuth')
        //  showToastMessage(resp.Result, 'success');
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }


  addNomineeSubmit() {
    this.guradianValidation() ;
    if (this.addNomineeDetails.valid) {
      // this.addNomineeService()
      // this.goToPage('nomineeAuth')
      var nomineeDob = this.datePipe.transform(this.addNomineeDetails.value.dob, 'dd-MM-yyyy');


      if(this.minorFlag == 'N'){
        this.addNomineeDetails.value.guardianName = '';
        this.addNomineeDetails.value.guardianAddress = '';
      }

      this.DataService.request = this.addNomineeDetailsService.getUpdateNomineeService(this.DataService.userDetails.cifNumber, this.accountNo, this.addNomineeDetails.value, this.minorFlag, nomineeDob);
      this.DataService.endPoint = this.constant.serviceName_ADDNOMINEEDATA;

      var nomineeDtl = this.relationShipList.find(i => i.ref_code == this.addNomineeDetails.value.nomineeRelationship);
      var stateDtl = this.stateList.find(obj => (obj.ID == this.addNomineeDetails.value.state));
      var cityDtl = this.cityList.find(obj => (obj.ID == this.addNomineeDetails.value.city));


      //this.addNomineeDetails.value.nomineeRelationship = nomineeDtl.ref_code
      this.DataService.nomineeDetailsData = this.addNomineeDetails.value;
      this.DataService.nomineeDetailsData.nomineeDtl = nomineeDtl.DESCRIPTION
      this.DataService.nomineeDetailsData.stateDtl = stateDtl.state
      this.DataService.nomineeDetailsData.cityDtl = cityDtl.city


      this.router.navigate(['/nomineeOverview']);
    } else {
      this.validateForm();
    }
  }


  getRelationShip() {
    var param = this.addNomineeDetailsService.getDropDownMasterParam(DropDownMaster.NOMINEE_TYPE);
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


  getNomineeCity(stateId) {
    this.nomineeCityList = [];
    let cityListParams = this.addNomineeDetailsService.getCityListParams(stateId);
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

  getGardianType() {
    var param = this.addNomineeDetailsService.getDropDownMasterParam(DropDownMaster.GUARDIAN_TYPE);
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

  gotToPage(){
    this.router.navigateByUrl("/myAccountsInfo");
  }

}
