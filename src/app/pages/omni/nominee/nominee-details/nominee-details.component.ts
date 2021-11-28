import { state } from '@angular/animations';
import { data } from 'jquery';
import { NomineeDetailsService } from './nominee-details.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { DropDownMaster, AccountOpeningSteps } from '../../../../utilities/app-enum';
import {DatePipe, Location} from '@angular/common'
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import * as moment from 'moment';

declare var showToastMessage: any;

@Component({
  selector: 'app-nominee-details',
  templateUrl: './nominee-details.component.html',
  styleUrls: ['./nominee-details.component.scss']
})
export class NomineeDetailsComponent implements OnInit {

  constructor( 
    private router: Router, 
    public DataService: DataService, 
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private nomineeDetailService : NomineeDetailsService,
    private location : Location,
    private datePipe : DatePipe
) { }

nomineeDetailsForm : FormGroup ;
stateList: any = [];
stateNomineeList: any = [];
cityList = [];
gardianTypeList = [] ;
relationShipList: any;
nomineeData : any = [] ;
nomineeAge: number = 18;
currentDate: any = moment().toDate();
accountNo : any ;
minorFlag : any ;
defaultDate : any ;

max = new Date();


ngOnInit(): void {
  console.log('in');
  this.buildForm() ;
  this.DataService.setShowThemeObservable(true)
  this.DataService.setShowsideNavObservable(true)
  this.DataService.setShowNotificationObservable(true);
  this.DataService.getBreadcrumb('NOMINEE_DETAILS' , this.router.url)
  this.accountNo  = this.location.getState()
  console.log('account',this.accountNo.account)
  console.log('nominee', this.accountNo.nominee)
  this.initialization() ;
  this.DataService.setPageSettings('Nominee Details');
}

initialization(){
  console.log('in');
  this.getRelationShip();
  //this.DataService.nomineeBackUrl = this.router.url.substring(1);
 //this.getState();
//  this.getNomineeCity() ;
}


onDateChange(event) {
  var diff = Math.floor(this.currentDate - event);
  var day = 1000 * 60 * 60 * 24;
  var days = Math.floor(diff / day);
  var months = Math.floor(days / 31);
  this.nomineeAge = Math.floor(months / 12);

  if(this.nomineeAge < 18){
    this.minorFlag = 'Y'
    this.getGardianType();
  }else{
    this.minorFlag= 'N'
  
  }

  this.DataService.minorFlagNominee = this.minorFlag ;
}


goToPage(routeName){
  this.router.navigateByUrl('/'+routeName);
} 

buildForm(){
  this.nomineeDetailsForm = new FormGroup({
    nomineeName: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z_ ]*$")]),
    nomineeRelationship: new FormControl('', [Validators.required]),
    communicationAddress : new FormControl(''),
    dob: new FormControl('', [Validators.required]),
    guardianName: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z_ ]*$")]),
    guardianAddress : new FormControl('', [Validators.required]),
    guardianRelationShip : new FormControl('', [Validators.required]),
    address1: new FormControl('', [Validators.required]),
    address2: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    pincode : new FormControl ('')

  });
  this.setNomineeDtl() ;
}

ValidateForm(){
  this.guradianValidation() ;
  if(this.nomineeDetailsForm.invalid){
    this.nomineeDetailsForm.get('nomineeName').markAsTouched();
    this.nomineeDetailsForm.get('nomineeRelationship').markAsTouched();
    this.nomineeDetailsForm.get('communicationAddress').markAsTouched();
    this.nomineeDetailsForm.get('dob').markAsTouched();
    this.nomineeDetailsForm.get('guardianName').markAsTouched();
    this.nomineeDetailsForm.get('guardianRelationShip').markAsTouched();
    this.nomineeDetailsForm.get('guardianAddress').markAsTouched();
    this.nomineeDetailsForm.get('address1').markAsTouched();
    // this.nomineeDetailsForm.get('address2').markAsTouched();
    // this.nomineeDetailsForm.get('state').markAsTouched();
    // this.nomineeDetailsForm.get('city').markAsTouched();
    // this.nomineeDetailsForm.get('pincode').markAsTouched();

    return;
   }
}

guradianValidation(){
  if(this.nomineeAge < 18){
    this.nomineeDetailsForm.get('guardianName').setValidators([Validators.required,, Validators.pattern("[a-zA-Z_ ]*$")]); 
    this.nomineeDetailsForm.get('guardianAddress').setValidators([Validators.required]); 
    this.nomineeDetailsForm.get('guardianRelationShip').setValidators([Validators.required]); 


    this.nomineeDetailsForm.get('guardianName').updateValueAndValidity() ;
    this.nomineeDetailsForm.get('guardianAddress').updateValueAndValidity() ;
    this.nomineeDetailsForm.get('guardianRelationShip').updateValueAndValidity() ;

  } else {
    this.nomineeDetailsForm.get('guardianName').clearValidators(); 
    this.nomineeDetailsForm.get('guardianAddress').clearValidators(); 
    this.nomineeDetailsForm.get('guardianRelationShip').clearValidators(); 


    this.nomineeDetailsForm.get('guardianName').updateValueAndValidity() ;
    this.nomineeDetailsForm.get('guardianAddress').updateValueAndValidity() ;
    this.nomineeDetailsForm.get('guardianRelationShip').updateValueAndValidity() ;

  }
}
  nomineeDetailsSubmit(){
    this.guradianValidation() ;
    if(this.nomineeDetailsForm.valid){
      // this.goToPage('nomineeOverview')
        // this.nomineeUpdateService ()
        var nomineeDob = this.datePipe.transform(this.nomineeDetailsForm.value.dob, 'dd-MM-yyyy') ;
        this.DataService.request = this.nomineeDetailService.getUpdateNomineeService(this.DataService.userDetails.cifNumber,this.accountNo.account, this.nomineeDetailsForm.value,this.minorFlag, nomineeDob);
        this.DataService.endPoint = this.constant.serviceName_ADDNOMINEEDATA;
        var nomineeDtl = this.relationShipList.find(i => i.ref_code == this.nomineeDetailsForm.value.nomineeRelationship);
        var stateDtl = this.stateList.find(obj => (obj.ID == this.nomineeDetailsForm.value.state));
        var cityDtl = this.cityList.find(obj => (obj.ID == this.nomineeDetailsForm.value.city));


        //this.nomineeDetailsForm.value.nomineeRelationship = nomineeDtl.ref_code
        this.DataService.nomineeDetailsData = this.nomineeDetailsForm.value;
        this.DataService.nomineeDetailsData.nomineeDtl = nomineeDtl.DESCRIPTION
        this.DataService.nomineeDetailsData.stateDtl = stateDtl.state
        this.DataService.nomineeDetailsData.cityDtl = cityDtl.city
        
        this.DataService.minorFlagNominee = this.minorFlag
        // this.router.navigate(['/nomineeOverview']);
        this.router.navigateByUrl('/' + 'nomineeOverview', {state : { account : this.accountNo.account }});
      

        // this.DataService.nomineeReceiptObj.nomineeName = this.nomineeDetailsForm.value.nomineeName 
        // this.DataService.nomineeReceiptObj.nomineeRelationship = this.nomineeDetailsForm.value.nomineeRelationship 
        // this.DataService.nomineeReceiptObj.address1 = this.nomineeDetailsForm.value.address1 
        // this.DataService.nomineeReceiptObj.address2 = this.nomineeDetailsForm.value.address2 + '' + this.nomineeDetailsForm.value.city + '' + this.nomineeDetailsForm.value.state + '' + this.nomineeDetailsForm.value.pincode
        // this.DataService.nomineeReceiptObj.dateOfBirth = this.nomineeDetailsForm.value.dateOfBirth 
        // this.DataService.nomineeReceiptObj.minorFlag = this.nomineeDetailsForm.value.minorFlag 
        // this.DataService.nomineeReceiptObj.guardianName = this.nomineeDetailsForm.value.guardianName 
        // this.DataService.nomineeReceiptObj.guardianAddress = this.nomineeDetailsForm.value.guardianAddress 

        // this.DataService.authorizeHeader = "Nominee Details";
        // this.DataService.screenType = 'nomieeDetails';
        // var objCheckFlag = this.DataService.activitySettingData.findIndex(x => x.ACTIVITYNAME == this.DataService.endPoint.split('/')[1]);
        // if(this.DataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y') {
        //       this.router.navigate(['/nomineeAuth']);
        // }
    } else {
      this.ValidateForm () ;
    }
  }

  getState() {
    this.stateList = [];
    this.stateNomineeList = []
    let stateListParams = this.nomineeDetailService.getStateListParams();
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
    let cityListParams = this.nomineeDetailService.getCityListParams(stateId);
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

  setNomineeDtl(){
    let tempNomineeData = this.location.getState()
    console.log("temp data : ", tempNomineeData)
    this.nomineeDetailsForm.patchValue({
      nomineeName: tempNomineeData['nominee'][0].nomineeName ,
      nomineeRelationship: tempNomineeData['nominee'][0].nomineeRelation ,
      dob: (tempNomineeData['nominee'][0].nomineeDob).split('-').join('/') ,
      guardianName: tempNomineeData['nominee'][0].guardianName   ,
      guardianAddress:tempNomineeData['nominee'][0].guardianAddress   ,
      address1:  tempNomineeData['nominee'][0].nomineeAddress1  ,
      address2:  tempNomineeData['nominee'][0].nomineeAddress2 ,
      //state : this.stateList.find(obj => (obj.ID == tempNomineeData['nominee'][0].stateCode)).ID,
      // city : this.getCity(this.cityList.find(obj => (obj.ID == tempNomineeData['nominee'][0].cityCode))),

    })

    try{
      this.defaultDate =  new Date (this.datePipe.transform(this.dateFormat(tempNomineeData['nominee'][0].nomineeDob), 'MM/dd/yyyy'))
    }
    catch(e){

    }
    
    // this.defaultDate = new Date((tempNomineeData['nominee'][0].nomineeDob).split('-').join('/')) ;
    this.onDateChange(this.defaultDate) ;
    this.DataService.minorFlagNominee = this.minorFlag ;


    console.log('set value for nominee ::', this.nomineeDetailsForm.value)
    this.setModifyState()
  }

  dateFormat(e){
    let date = e.split("-")[0];
    let month = e.split("-")[1];
    let year = e.split("-")[2];
    var convertedDate = new Date(month+'-'+date+'-'+year);
    console.log('converted Date: ', convertedDate);
    return convertedDate;
  }

  getRelationShip() {
    var param = this.nomineeDetailService.getDropDownMasterParam(DropDownMaster.NOMINEE_TYPE);
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
    var param = this.nomineeDetailService.getDropDownMasterParam(DropDownMaster.GUARDIAN_TYPE);
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

  //Update the nominee details
  nomineeUpdateService(){

    var nomineeDob = this.datePipe.transform(this.nomineeDetailsForm.value.dob, 'dd-MM-yyyy') ;
    
    if(this.minorFlag == 'N'){
      this.nomineeDetailsForm.value.guardianName = '';
      this.nomineeDetailsForm.value.guardianAddress = '';
    }

    var param = this.nomineeDetailService.getUpdateNomineeService(this.DataService.userDetails.cifNumber,this.accountNo, this.nomineeDetailsForm.value,this.minorFlag, nomineeDob);

    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ADDNOMINEEDATA).subscribe(data => {
      var resp = data.responseParameter;
      console.log("Response :: ", resp)
      if (resp.opstatus == "00") {
        console.log( "Updated Nominee Data", data.set['records']);
      //  showToastMessage(resp.Result, 'success');
      this.DataService.otpSessionPreviousPage =  this.router.url;
       this.goToPage('nomineeAuth')
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }


  setModifyState() {
    this.cityList = [];
    this.stateNomineeList = []
    let tempNomineeData = this.location.getState()
    let stateListParams = this.nomineeDetailService.getStateListParams();
    this.http.callBankingAPIService(stateListParams, this.constant.deviceID, this.constant.serviceName_GETSTATES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('set')) {
          this.stateList = data.set.records;
          this.stateNomineeList = data.set.records;

          this.nomineeDetailsForm.patchValue({
            state : this.stateList.find(obj => (obj.ID == tempNomineeData['nominee'][0].stateCode)).ID,
           // city : this.getCity(this.cityList.find(obj => (obj.ID == tempNomineeData['nominee'][0].cityCode))),
      
          })
          this.getModifyCity(this.stateList.find(obj => (obj.ID == tempNomineeData['nominee'][0].stateCode)).ID)
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);

      }
    });
  }

  getModifyCity(stateId) {
    let tempNomineeData = this.location.getState()
    this.cityList = [];
    let cityListParams = this.nomineeDetailService.getCityListParams(stateId);
    this.http.callBankingAPIService(cityListParams, this.constant.deviceID, this.constant.serviceName_GETCITIES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('set')) {
          this.cityList = data.set.records;
          this.nomineeDetailsForm.patchValue({
           // state : this.stateList.find(obj => (obj.ID == tempNomineeData['nominee'][0].stateCode)).ID,
           city : this.cityList.find(obj => (obj.ID == tempNomineeData['nominee'][0].cityCode)).ID,
      
          })
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

}
