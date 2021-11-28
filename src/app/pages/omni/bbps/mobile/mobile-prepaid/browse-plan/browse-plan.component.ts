import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import  {BrowsePlanService} from './browse-plan.service'
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from '../../../../../../services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
@Component({
  selector: 'app-browse-plan',
  templateUrl: './browse-plan.component.html',
  styleUrls: ['./browse-plan.component.scss']
})
export class BrowsePlanComponent implements OnInit {
  operatorsDetails:any
  plandetails:any
  threeGFourGPlans:any = []
  recommended:any = []
  roaming:any =[]
  selectedPlan:any
  sms:any =[]
  specialTariff:any =[]
  topup:any =[]


  constructor(
    private router:Router, 
    public DataService: DataService,
    private commonMethod : CommonMethods,
    private http : HttpRestApiService,
    private browsePlanService: BrowsePlanService,
    private storage : LocalStorageService,
    private constant :  AppConstants,
  ) { }

  ngOnInit(): void {
    this.DataService.setPageSettings('MOBILE_PREPAID');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('MOBILE_PREPAID' , this.router.url)
    this.operatorsDetails = this.DataService.mobilePrepaidDetails
    this.getplans()
  }
  ontabClick(plan){
    
    switch(plan){
      case 'topup':
        this.selectedPlan = this.topup
        break ;
      case 'recommended' :
        this.selectedPlan = this.recommended
        break ;
      case 'threeGFourGPlans' :
        this.selectedPlan = this.threeGFourGPlans
        break ;
      case 'sms' :
        this.selectedPlan = this.sms
        break ;
      case 'roaming' :
        this.selectedPlan = this.roaming
        break ;
      case 'specialTariff' :
        this.selectedPlan = this.specialTariff
        break ;
    }
  }

  chosenPlan(item){


    let billerdetailsDataPass = {
      'billerName' :item.biller_name,
      'billamt':  item.amount,
      'billCategory': item.biller_category,
      'logourl' :null,
      'planId' : item.planid,
      'billerId' :item.billerid,
      'validationid' :null,
      'dueDate': null,
      'paymentType': 'adhoc',
      'cou_conv_fee' : null,
      'bou_conv_fee' :null,
      'displayData':[
        {
          "label":  'Plan Type',
          'field' :item.plan_category_name
        },
        {
          "label":  'Validity',
          'field' :  item.validity,
        },
        {
          "label":  'Description ',
          'field' : item.plan_description,
        },
        
      
      ]
    }
    this.DataService.billerdata = billerdetailsDataPass;
    this.goToPage('existingBillPayment') ;
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }
  getplans(){
    var param = this.browsePlanService.getplans(this.operatorsDetails)
    this.http.callBankingAPIService(param, this.storage.getLocalStorage("deviceId"), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {  
        var operatorData = JSON.parse(data.responseParameter.bbpsResponse)
        console.log(' this.operatorDetails' +  JSON.stringify(operatorData))
        this.plandetails = JSON.parse(operatorData.responseParameter.result)
        console.log("DATA" + JSON.stringify( this.plandetails));


        this.plandetails.forEach(el => {
          if (el.plan_category_name == "3G/4G Data") {
            this.threeGFourGPlans.push(el)
          }
          if (el.plan_category_name == "Recommended") {
            this.recommended.push(el)
          }

          if (el.plan_category_name == "Topup") {
            this.topup.push(el)
          }
          if (el.plan_category_name == "Roaming") {
            this.roaming.push(el)
          }
          if (el.plan_category_name == "SMS") {
            this.sms.push(el)
          }
          if (el.plan_category_name == "Special Tariff") {
            this.specialTariff.push(el)
          }
           
        })
        this.selectedPlan = this.topup
      }
      else {
        this.errorCallBack(data.subActionId);
        
      }


    })
  }
  errorCallBack(e){

  }
}
