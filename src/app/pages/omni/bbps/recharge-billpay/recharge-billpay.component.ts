import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../../../../app.constant';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import {BbpsService} from 'src/app/services/bbps.service'
import { DatePipe } from '@angular/common';

import * as moment from 'moment';
import { CommonMethods } from '../../../../utilities/common-methods';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import {RechargeBillpayService} from './recharge-billpay.service'
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
@Component({
  selector: 'app-recharge-billpay',
  templateUrl: './recharge-billpay.component.html',
  styleUrls: ['./recharge-billpay.component.scss']
})
export class RechargeBillpayComponent implements OnInit {

  constructor( private router:Router,
    public DataService: DataService , 
    public constant: AppConstants,
    private bbpsService : BbpsService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    public commonMethod: CommonMethods,
    private datepipe: DatePipe,
    private rechargeBillpayService : RechargeBillpayService) { }

  instantPayList =[
    {'instantPayName' : 'Mobile Postpaid', 'instantPayImage' : 'mobile-recharge.svg', 'routeUrl': 'retailBillPayment', 'category':'Mobile Postpaid' },
    {'instantPayName' : 'Mobile Prepaid', 'instantPayImage' : 'mobile-recharge.svg', 'routeUrl': 'mobilePrepaid', 'category':'Mobile Postpaid' },
    {'instantPayName' : 'DTH', 'instantPayImage' : 'dth.svg' , 'routeUrl': 'retailBillPayment' , 'category':'DTH'},
    {'instantPayName' : 'Electricity', 'instantPayImage' : 'electricity.svg' , 'routeUrl': 'retailBillPayment', 'category':'Electricity'},
    {'instantPayName' : 'Gas', 'instantPayImage' : 'gas-g.svg' , 'routeUrl': 'retailBillPayment' , 'category':'Gas'},
    {'instantPayName' : 'Water', 'instantPayImage' : 'water-g.svg' , 'routeUrl': 'retailBillPayment', 'category':'Water'},
    {'instantPayName' : 'Landline Postpaid', 'instantPayImage' : 'landline-g.svg' , 'routeUrl': 'retailBillPayment' , 'category':'Landline Postpaid'},
    {'instantPayName' : 'FastTag', 'instantPayImage' : 'fast-tag1.svg' , 'routeUrl': 'retailBillPayment' , 'category':'FASTag'},
    {'instantPayName' : 'Insurance', 'instantPayImage' : 'insurance-g.svg' , 'routeUrl': 'retailBillPayment' , 'category':'Insurance'},
  ]
  todaysDate:any;
  leftDate:any
  finalExistingBillerDetails:any =[]
  allfiveRegisteredBillers:any = false;
  finalUnpaidBillerDetails:any= []
  fiveRegisteredBillers:any = [];
  allBillerWithLogo:any= [];
  upaidBillerWithLogo:any=[];
  rechargeBillPayOptions :OwlOptions
  existingBillerDetails:any
  pendingBillerLogoList:any
  billerIdlist:any = '';
  mergedBillList:any =[]
  validatedillerRes:any
  billerdetailsDataPass:any;
  logoUrl:any
  partialPay:any;
  validatePay:any;
  cou_conv_fee:any = "0.00";
  bou_conv_fee:any ="0.00";
  totalHandlingCharge:any
  apiErrorMsg:any
  transactionHistorylist:any
  recentTrans:any;
  pendingBillerLogoListforRecentTrans:any;
  finalRecentTrans:any;
  providerSearch:any =[];
  ngOnInit(): void {
    this.rechargeBillPayOptions = this.DataService.getrecommendedCardCarouselOptions();
    this.DataService.setPageSettings('Recharge BillPay');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('RECHARGE_BILLPAY' , this.router.url)
    this.getAllRegisteredBillers()

    this.getResentTransaction()
    this.todaysDate = this.datepipe.transform(new Date(), 'dd/MM/yyyy');
  }

  goToPage(value){
    this.router.navigateByUrl("/" + value);
   
  } 
  onIntaClick(name , category , route){
    this.DataService.billtype = name
    this.DataService.billcategory = category
    this.router.navigateByUrl(route);
  }

  // getTransactionHistory(){
  //   let param = this.rechargeBillpayService.getTransactionHistoryParam();
  //   this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
  //     // console.log(JSON.parse(data.responseParameter.bbpsResponse));
  //     var resp = data.responseParameter;
  //     if (resp.opstatus == "00") {
  //       this.transactionHistorylist =  JSON.parse(data.responseParameter.bbpsResponse).responseParameter
  //         console.log("getTransactionHistory " +JSON.stringify(this.transactionHistorylist))
  //     }
  //     else {
    
  //     }
  //   })
  // }

  getAllRegisteredBillers() {
    // alert(this.DataService.customerID)
    let billerListparam = this.rechargeBillpayService.getBillDetails();
    this.http.callBankingAPIService(billerListparam, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
    
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        var fiveBillerId = ''
          this.existingBillerDetails =JSON.parse(data.responseParameter.bbpsResponse).responseParameter.result
          this.existingBillerDetails = JSON.parse(this.existingBillerDetails)
          console.log('this.existingBillerDetails ===> ' +  this.existingBillerDetails )
         
          // this.getUnpaidbills(this.existingBillerDetails)
          console.log(" this.billerIdlist" +  this.billerIdlist)
          console.log(" this.finalExistingBillerDetails" +  JSON.stringify(this.finalExistingBillerDetails))
         for(var i = 0;  i < this.existingBillerDetails.length ; i++){
               fiveBillerId = fiveBillerId +  this.existingBillerDetails[i].billeraccount.billerid + ','
          }
         this.getbillersLogoDetials(this.existingBillerDetails ,fiveBillerId)
      }
      else {
    
      }
    });
  }
  getResentTransaction() {
    // alert(this.DataService.customerID)
    var recentTransBillerId = ''
    let param = this.rechargeBillpayService.getTransactionHistoryParam();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
    
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
      
          this.recentTrans =JSON.parse(data.responseParameter.bbpsResponse).responseParameter.result
           this.recentTrans = JSON.parse(this.recentTrans)
          console.log('this.recentTrans ===> ' +  JSON.stringify(this.recentTrans ))
          for(var i = 0;  i < this.recentTrans.length ; i++){
            recentTransBillerId = recentTransBillerId +  this.recentTrans[i].billerid + ','
           }
         this.getbillersLogoDetialsforRecentTrans( this.recentTrans , recentTransBillerId)
       }
      else {
    
      }
    });
  }

  getbillersLogoDetialsforRecentTrans(recentTransList ,recentTransBillerId){
    let billerListparam = this.rechargeBillpayService.getLogoDetials(recentTransBillerId);
    this.http.callBankingAPIService(billerListparam, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
      console.log(JSON.parse(data.responseParameter.bbpsResponse));
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        
          this.pendingBillerLogoListforRecentTrans = JSON.parse(data.responseParameter.bbpsResponse).responseParameter.billerList
          console.log("this.pendingBillerLogoList " + JSON.stringify(this.pendingBillerLogoListforRecentTrans.billerData) )
          console.log("this.billerlist " + JSON.stringify(recentTransList) )
          for(var i= 0; i < recentTransList.length; i++){
            for(var j= 0; j < this.pendingBillerLogoListforRecentTrans.length ; j++){
                if(recentTransList[i].billerid == this.pendingBillerLogoListforRecentTrans[j].billerId){
                 
                  recentTransList[i].moreDetails = JSON.parse(this.pendingBillerLogoListforRecentTrans[j].billerData)
                  
                  }
               
              }
          }
          console.log("recentTransListSanal " + JSON.stringify(recentTransList))
          this.DataService.finalRecentTransList = recentTransList
          this.finalRecentTrans = recentTransList.slice(0 , 5)
      }
      else {
      ///  this.errorCallBack(data.subActionId, resp);
      }
    });
  }



  getbillersLogoDetials(billerlist , idList) {
    console.log("idListsss " + idList)
 
    let billerListparam = this.rechargeBillpayService.getLogoDetials(idList);
    this.http.callBankingAPIService(billerListparam, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
      console.log(JSON.parse(data.responseParameter.bbpsResponse));
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        
          this.pendingBillerLogoList = JSON.parse(data.responseParameter.bbpsResponse).responseParameter.billerList
          console.log("this.pendingBillerLogoList " + JSON.stringify(this.pendingBillerLogoList.billerData) )
          console.log("this.billerlist " + JSON.stringify(billerlist) )
          for(var i= 0; i < billerlist.length; i++){
            for(var j= 0; j < this.pendingBillerLogoList.length ; j++){
                if(billerlist[i].billeraccount.billerid == this.pendingBillerLogoList[j].billerId){
                 
                   billerlist[i].moreDetails = JSON.parse(this.pendingBillerLogoList[j].billerData)
                  if(billerlist[i].billlist?.length){
                      var duedate =  billerlist[i].billlist[0].billduedate.split("-");
                      var formatedDuedate = duedate[1] +'/'+ duedate[0]+ '/' + duedate[2]
                      console.log("formatedDuedate ==>" + formatedDuedate)
                  
                      var finaldue = new Date(formatedDuedate)
                      var currentDate = new Date()
                      this.leftDate = finaldue.getDate() - currentDate.getDate()  
                      this.leftDate = parseInt( this.leftDate , 10)
                      billerlist[i].daysLeft =  this.leftDate 
                      console.log("this.leftDate" + this.leftDate);  
                    }
                  }
               
              }
          }
          console.log("FinalbillerlistSANAL " + JSON.stringify(billerlist))
         
      }
      else {
      ///  this.errorCallBack(data.subActionId, resp);
      }
        this.DataService.allregisteredBillerList = billerlist
        if(billerlist.length){
          this.allfiveRegisteredBillers = billerlist.slice(0 , 5)
         
        }  
      for(var i = 0 ; i < billerlist.length ;i++){
            if(billerlist[i].billlist?.length > 0){
              for(var j = 0 ; j < billerlist[i].billlist.length; j++ ){
                if(billerlist[i].billlist[j].billstatus == "UNPAID"){
                  this.finalUnpaidBillerDetails.push(billerlist[i])
                }
               
              }
              
          }
        }
        this.DataService.allUnpaidBillerList = this.finalUnpaidBillerDetails
        if(this.finalUnpaidBillerDetails.length){
          this.upaidBillerWithLogo = this.finalUnpaidBillerDetails.slice(0 , 5)
        }
        
        console.log("all FinalbillerlistSANAL2" + JSON.stringify(billerlist))
        console.log("all allfiveRegisteredBillers" + JSON.stringify(this.allfiveRegisteredBillers))
    
    });
    
  }

  payPendingBill(item){
    let billerdetailsList = {
      billerName:item.moreDetails.biller_name,
      billerId: item.moreDetails.billerid,
      authenticators: item.billlist[0].authenticators,
      
    }
    this.logoUrl =item.moreDetails.biller_logo,
    this.partialPay = item.moreDetails.partial_pay;
    this.validatePay =item.moreDetails.online_validation;
    if(item.moreDetails.customer_conv_fee?.length > 0 ){
    item.moreDetails.customer_conv_fee.forEach(el => {
        if (el.payment_channel == "Internet") {
          
          this.cou_conv_fee = el.cou_conv_fee
          this.bou_conv_fee = el.bou_conv_fee

          }
       })
    }else{
      this.cou_conv_fee = "0.00"
      this.bou_conv_fee = "0.00"
    }
    this.totalHandlingCharge = (parseFloat(this.cou_conv_fee) + parseFloat( this.bou_conv_fee)).toFixed(2)
    alert(item.moreDetails.online_validation)
     if(item.moreDetails.online_validation == "Y"){
        this.validatePaymentDetails(billerdetailsList)
    }
    console.log("itemitemitemitem" + JSON.stringify(item))  
  }

  validatePaymentDetails(data){

  
    var param = this.bbpsService.ValidatePaymentParam(data);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage("deviceId"), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      console.log("ValidatePaymentService ===> " + JSON.stringify(resp))
      if (resp.opstatus == "00") {
        this.validatedillerRes = JSON.parse(resp.bbpsResponse).responseParameter.result
        this.validatedillerRes =  JSON.parse(this.validatedillerRes )
        console.log("this.validatedillerRes ===> " +  JSON.stringify(this.validatedillerRes))
        console.log(typeof this.validatedillerRes  )
        this.billerdetailsDataPass = {
          'billerName' :this.validatedillerRes.biller_name,
          'billamt':  (parseFloat(this.validatedillerRes.billlist[0].billamount) + parseFloat(this.totalHandlingCharge) ).toFixed(2),
          'billCategory': this.validatedillerRes.biller_category,
          'logourl' :this.logoUrl,
          'billerId' :this.validatedillerRes.billlist[0].billerid,
          'validationid' :this.validatedillerRes.validationid,
          'dueDate': this.validatedillerRes.billlist[0].billduedate,
          'paymentType': 'Biller',
          'cou_conv_fee' : this.cou_conv_fee,
          'bou_conv_fee' : this.bou_conv_fee,
          'displayData':[
            {
              "label":  'Customer Name',
              'field' : this.validatedillerRes.billlist[0].customer_name
            },
            {
              "label":  this.validatedillerRes.authenticators[0].parameter_name,
              'field' :  this.validatedillerRes.authenticators[0].value,
            },
            {
              "label":  'Bill Amount',
              'field' : "₹" +  this.validatedillerRes.billlist[0].billamount,
            },
            {
              "label":  'Handling Fees',
              'field' : "₹" + this.totalHandlingCharge,
            },
            {
              "label":  'Bill Date',
              'field' : this.validatedillerRes.billlist[0].billdate
            },
            {
              "label":  'Bill Status',
              'field' : this.validatedillerRes.billlist[0].billstatus,
            },
          ]
        }
        
        console.log("this.billerdetailsDataPass ==>" + this.billerdetailsDataPass)
        this.DataService.billerdata = this.billerdetailsDataPass
         this.goToPage('existingBillPayment') ;
        }
        else if (resp.opstatus == "01") {
          let errorMsg = JSON.parse(resp.bbpsResponse)
              this.apiErrorMsg = errorMsg.msg
              this.commonMethod.openPopup('.errorMSg')
        }
        else {
          this.errorCallBack(data.subActionId, resp);
      }
    });

    
   
  }
  billHistoryDetails(item){
    this.DataService.billHistoryDetails = item
    this.router.navigateByUrl('/billDetails');

    console.log("billHistoryDetails>>>> " + JSON.stringify(item))
  }

  onProviderSearch(value){

    if(value.length >= 3){
      let param = this.rechargeBillpayService.getServiceProviderName(value);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
      var provderSearchs
        var resp = data.responseParameter;
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
          this.providerSearch = []
          provderSearchs =JSON.parse(data.responseParameter.bbpsResponse).responseParameter.billerList
             // provderSearchs = JSON.parse(provderSearchs)
             console.log (typeof provderSearchs)
             console.log ("provderSearchs.length" + provderSearchs.length)
             console.log("provderSearchs +"  + JSON.stringify( JSON.parse(provderSearchs[0])))
              for( var i =0 ; i < provderSearchs.length ;i++) {
                this.providerSearch.push(JSON.parse(provderSearchs[i]));
              }
            console.log('this.providerSearch ===> ' +  JSON.stringify(this.providerSearch ))
           
          
         }
        else {
         
        }
      });
    }
    else{
      this.providerSearch = []
    }

  }

  errorCallBack(e , e3){

  }
  unpaidBillDetails(item){
 console.log("item>>>> " + JSON.stringify(item))
   
  

    this.DataService.unpaidbilldetail = item
    this.router.navigateByUrl('/unpaidBill');
  }
  
  onpenbillClick(item){
    console.log('itemitem' + JSON.stringify(item))
    let billerdetailsList = {
      billerName:item.moreDetails.biller_name,
      billerId:item.billerid,
      billamount: item.net_billamount,
      billerlogo: item.moreDetails.biller_logo,
      customerid: item.customerid,
      authenticators: item.authenticators,
      loopingData:[
        {
          'label': 'Bill Number',
          'field': item.billnumber
        },
        {
          'label': 'Customer Name',
          'field': item.billid
        },
        {
          'label': item.authenticators[0].parameter_name,
          'field':   item.authenticators[0].value
        }
      ]
    }

    this.DataService.billerdata = billerdetailsList
    this.router.navigateByUrl('/existingBillPayment');
  }
}
