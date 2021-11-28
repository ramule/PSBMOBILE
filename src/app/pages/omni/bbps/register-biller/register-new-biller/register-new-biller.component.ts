import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../../../../../app.constant';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import {BbpsService} from 'src/app/services/bbps.service'
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import {RegisterNewBillerService} from './register-new-biller.service'
import { CommonMethods } from '../../../../../utilities/common-methods';
@Component({
  selector: 'app-register-new-biller',
  templateUrl: './register-new-biller.component.html',
  styleUrls: ['./register-new-biller.component.scss']
})
export class RegisterNewBillerComponent implements OnInit {

  constructor( private router:Router,
     public DataService: DataService , 
     private constant: AppConstants,
     private bbpsService: BbpsService,
     private storage: LocalStorageService,
     private http: HttpRestApiService,
     public commonMethods: CommonMethods,
     private registerNewBillerService: RegisterNewBillerService) { }
      billerCategory:any
      registerBillerForm : FormGroup
      billerlist
      consumerLabel:any = ''
      submitClicked:boolean =false;
      finalBillerList:any =[]
      selectedBoard ={"biller_legal_name": 'Select Board' ,'billerid':'', 'biller_logo':''}
      platformtype =""
      boardNameValue:any
      selectedBillerName: ''
      stateList:any
      errorMsg:any
      billSampleURL:any
  ngOnInit(): void {
    this.buildForm() ;
    this.DataService.setPageSettings('Register New Biller');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('REGISTER_NEW_BILLER' , this.router.url)

    if (this.constant.getPlatform() == "web") {
      this.platformtype = 'InternetBanking'
    }else{
      this.platformtype = 'MobileBanking'
    }
   this.getBillerCategory()
  }

  goToPage(routeName){
   
    this.router.navigateByUrl('/'+  routeName);
   
  } 

  buildForm(){
    this.registerBillerForm = new FormGroup({
      billerCategory: new FormControl('', [Validators.required]),
      billerLocation: new FormControl('', [Validators.required]),
      boardname: new FormControl(''),
      consumerNumber: new FormControl('', [Validators.required]),
      shortName: new FormControl('', [Validators.required]),
    });
  }

  validateForm(){
    if(this.registerBillerForm.invalid){
      this.registerBillerForm.get('billerCategory').markAsTouched();
      this.registerBillerForm.get('billerLocation').markAsTouched();
      this.registerBillerForm.get('boardname').markAsTouched();
      this.registerBillerForm.get('consumerNumber').markAsTouched();
      this.registerBillerForm.get('shortName').markAsTouched();
      return;
     }
  }

  registerBillerSubmit(){
    this.submitClicked = true
    if(this.registerBillerForm.valid){
    
      console.log(this.registerBillerForm.value)
      this.createNewBiler(this.registerBillerForm.value)
    }
    else{
      this.validateForm() ;
    }
  }
  onCategorySelect(category){
    this.selectedBoard ={"biller_legal_name": 'Select Board' ,'billerid':'', 'biller_logo':''}
    this.finalBillerList =[]
    this.stateList = []
    this.registerBillerForm.get('billerLocation').reset();
    $('#board-name').slideUp();
    $('#board-name').parent().removeClass('active')
    let stateListParams = this.bbpsService.getLocationList(category);
    this.http.callBankingAPIService(stateListParams, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
      console.log(JSON.parse(data.responseParameter.bbpsResponse));
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
     
          this.stateList =JSON.parse(data.responseParameter.bbpsResponse).responseParameter.billerLocationList
          console.log('State List: ', this.stateList);
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }
  onStateSelect(value){
    this.selectedBoard ={"biller_legal_name": 'Select Board' ,'billerid':'', 'biller_logo':''}
    this.finalBillerList =[]
    $('#board-name').slideUp();
    $('#board-name').parent().removeClass('active')
    console.log("selected state ===> " + value);
    // console.log( "response SANAL === >" +  this.httpBbpsApiCall(value))
    var param = this.bbpsService.getbillerlist(value , this.registerBillerForm.value.billerCategory)
    this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
       
         this.boardNameValue = JSON.parse(data.responseParameter.bbpsResponse).responseParameter.billerList
          console.log('billerList: ' + JSON.stringify( this.boardNameValue));
          console.log('billerListlength: ' + this.boardNameValue[0].billerData);
          for(var i =0 ; i < this.boardNameValue.length ; i++){
             this.finalBillerList.push(JSON.parse(this.boardNameValue[i].billerData))

          }
         
          console.log('this.finalBillerList: ' + JSON.stringify(this.finalBillerList));
          
       
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  onSelectOption(){
      
    // if (e.stopPropagation) e.stopPropagation();
      $('#board-name').slideToggle();
      $('#board-name').parent().toggleClass('active')
 

  }
  boardTypeSelection(item){
    this.onSelectOption()
    this.selectedBoard = item ;
    //this.registerBillerForm.setValue({boardname: item.billerId})
    this.registerBillerForm.get('boardname').setValue(item.billerid);
    this.selectedBillerName = item.billerName
    $('#board-name').slideUp();
    $('#board-name').parent().removeClass('active')
    this.consumerLabel = item.authenticators[0].parameter_name
    // this.registerBillerForm.get('consumerNumber').setValidators([Validators.required, Validators.pattern(item.authenticators[0].regex)]);
    this.errorMsg =  item.authenticators[0].error_message
    this.billSampleURL = item.biller_bill_copy
    this.registerBillerForm.get('consumerNumber').updateValueAndValidity();  
    this.registerBillerForm.get('boardname').updateValueAndValidity();  
  }
  errorCallBack(c,a){


  }
  getBillerCategory() {
    let categoryListParam = this.bbpsService.getBillerCategories();
    this.http.callBankingAPIService(categoryListParam, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
      console.log("sanal ==> " + JSON.parse(data.responseParameter.bbpsResponse));
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.selectedBoard ={"biller_legal_name": 'Select Board' ,'billerid':'', 'biller_logo':''}
          this.billerCategory =JSON.parse(data.responseParameter.bbpsResponse).responseParameter.categoryList
         // this.existingBillerDetails = JSON.parse(this.existingBillerDetails)
         console.log('  this.existingBillerDetails ===> ' +   this.billerCategory)
         


      }
      else {
      ///  this.errorCallBack(data.subActionId, resp);
      }
    });
  }
  createNewBiler(formValue) {
    var requiredData = { 'consumerKey' : this.consumerLabel }
    let newBillerParam = this.registerNewBillerService.registerNewBiller(requiredData ,  this.platformtype , formValue);
    this.http.callBankingAPIService(newBillerParam, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
      console.log("sanal ==> " + JSON.parse(data.responseParameter.bbpsResponse));
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        
          this.billerCategory =JSON.parse(data.responseParameter.bbpsResponse).responseParameter.categoryList
         // this.existingBillerDetails = JSON.parse(this.existingBillerDetails)
         console.log('  this.existingBillerDetails ===> ' +   this.billerCategory)
         this.commonMethods.openPopup('.successpopup')
         this.registerBillerForm.reset();

      }
      else {
      ///  this.errorCallBack(data.subActionId, resp);
      }
    });
  }
 
}
