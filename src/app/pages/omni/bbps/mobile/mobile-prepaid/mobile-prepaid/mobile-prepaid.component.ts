import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import {MobilePrepaidServiceService} from './mobile-prepaid-service.service'
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from '../../../../../../services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
@Component({
  selector: 'app-mobile-prepaid',
  templateUrl: './mobile-prepaid.component.html',
  styleUrls: ['./mobile-prepaid.component.scss']
})
export class MobilePrepaidComponent implements OnInit {

  constructor(
    private router:Router, 
    public DataService: DataService,
    private commonMethod : CommonMethods,
    private mobilePrepaidServiceService : MobilePrepaidServiceService,
    private http : HttpRestApiService,
    private storage : LocalStorageService,
    private constant : AppConstants,
  ) { }

  billPaymentBoardName = [
    { 'imagName' : 'assets/images/icons/airtel.png', 'boardName' : 'Airtel'},
    { 'imagName' : 'assets/images/icons/airtel.png', 'boardName' : 'Vodafone'},
  ]

  boardValue = ''
  boardNameValue : any = ''
  operatorDetails:any ={
    'biller_name': '',
    'circle_name': ''
  };
  boardNameToggle : boolean = false

  mobilePrepaidForm : FormGroup 

  ngOnInit(): void {
    this.buildForm() ;
    this.DataService.setPageSettings('MOBILE_PREPAID');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('MOBILE_PREPAID' , this.router.url)
  }

  buildForm(){
    this.mobilePrepaidForm = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
     
    });
  }

  validateForm(){
    if(this.mobilePrepaidForm.invalid){
      this.mobilePrepaidForm.get('mobileNumber').markAsTouched();
      this.mobilePrepaidForm.get('state').markAsTouched();

      return ;
     }
  }
  onNumberInput(number){
    console.log(number)
    if(number.length == 10){
        var param = this.mobilePrepaidServiceService.getPrepaidOperator(number)
        this.http.callBankingAPIService(param, this.storage.getLocalStorage("deviceId"), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
          console.log(data);
          var resp = data.responseParameter
          if (resp.opstatus == "00") {
            var operatorData = JSON.parse(data.responseParameter.bbpsResponse)
            console.log(' this.operatorDetails' +  JSON.stringify(operatorData))
            this.operatorDetails = JSON.parse(operatorData.responseParameter.result)
            console.log("DATA" + JSON.stringify( this.operatorDetails));
            this.operatorDetails.mobileNumber = number
           this.DataService.mobilePrepaidDetails = this.operatorDetails
          }
          else {
            this.errorCallBack(data.subActionId);
            
          }
        })
    }
  }

  errorCallBack(error){

  }
  boardTypeSelection(item){
    this.onSelectOption('')
    this.boardNameValue = item ;
  }

  onSelectOption(e){
    if (e.stopPropagation) e.stopPropagation();
    this.boardNameToggle = !this.boardNameToggle
    if(this.boardNameToggle){
      $('#board-name').slideToggle();
      $('#board-name').parent().toggleClass('active')
    } else{
      $('#board-name').slideUp();
      $('#board-name').parent().removeClass('active')
    }

  }

  clickedOut($event){
    $('#board-name').slideUp();
    $('#board-name').parent().removeClass('active')
  }


  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  browsePlanSubmit(){

    if(this.mobilePrepaidForm.valid){
      if(this.operatorDetails.biller_name != '' && this.operatorDetails.circle_name != '')
      this.goToPage('browsePlan')
    } else{
      this.validateForm()
    }
  }

  openMobBoardName(){
    this.commonMethod.openPopup('div.mob-postpaid');
}

closePopup(){
  this.commonMethod.closeAllPopup() ;
}


}
