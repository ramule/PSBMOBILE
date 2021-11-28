import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { BbpsService } from 'src/app/services/bbps.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { BillPaymnetService } from './bill-paymnet.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-bill-payment',
  templateUrl: './bill-payment.component.html',
  styleUrls: ['./bill-payment.component.scss']
})
export class BillPaymentComponent implements OnInit {
 

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods,
    public billPaymnetService: BillPaymnetService,
    private http:HttpRestApiService,
    private constant:AppConstants,
    
    private storage :LocalStorageService,
    private bbpsService: BbpsService,
    private httpp: HttpClient,) { }
   
    billPaymentBoardName = [
      { 'imagName' : 'assets/images/icons/mahavitran.png', 'boardName' : 'Adani Electicity - Mumbai'},
      { 'imagName' : 'assets/images/icons/aasam-power.png', 'boardName' : 'Assam Power - RAPDR'},
      { 'imagName' : 'assets/images/icons/best-mumbai.png', 'boardName' : 'BEST - Mumbai'},
    ]
    validatePay: 'N'
    partialPay: 'N'
    stateList = [];
    boardNameToggle : boolean = false
    boardNameValue : any = ''
    billerList=[]
    selectedBillerName:any;
    boardNameValueChildParent : any  = ''
    billpayType = this.DataService.billtype;
    billPaymentForm : FormGroup
    MobileRechargeForm : FormGroup
    paymentTypeForm : FormGroup
    selectedBoard ={"biller_legal_name": 'Select Board' ,'billerid':'', 'biller_logo':''}
    showFetchBill: boolean = false;
    finalBillerList:any =[];
    billdetails:any;
    consumerLabel:any= '';
    errorMsg:any=""
    logoUrl:any;
    billSampleURL;
    authenticators:any =[{}]
    billerdetailsList:any;
    billerdetailsDataPass:any;
    validatedillerRes;
    currency;
    cou_conv_fee:any = "0.00";
    bou_conv_fee:any ="0.00";
    totalHandlingCharge:any
    ngOnInit(): void {
      this.buildForm();
      this.DataService.setPageSettings('BILL_PAYMENT');
      this.DataService.setShowThemeObservable(true)
      this.DataService.setShowsideNavObservable(true)
      this.DataService.setShowNotificationObservable(true)
      this.DataService.getBreadcrumb('BILL_PAYMENT', this.router.url)
      this.getState()
     
    }
  // ################### COMMON FUNCTIONS STARTS ############################### COMMON FUNCTIONS STARTS ################################################ COMMON FUNCTIONS STARTS #####################3
    
  goToPage(routeName) {
      this.router.navigateByUrl('/' + routeName);
    }
  
    buildForm() {

   
      this.billPaymentForm = new FormGroup({

        state: new FormControl('Select State', [Validators.required]),
        consumerNumber: new FormControl('', [Validators.required]),
        boardname: new FormControl('', [Validators.required]),
      })
      
      this.paymentTypeForm = new FormGroup({
        paymentMode: new FormControl('', [Validators.required]),
      })

      
    }
  
    validateForm(){
      if(this.billPaymentForm.invalid){
        this.billPaymentForm.get('state').markAsTouched();
        this.billPaymentForm.get('boardname').markAsTouched();
        this.billPaymentForm.get('consumerNumber').markAsTouched();
        return
      }
    }
     validatepaymentForm(){
      if(this.paymentTypeForm.invalid){
        this.paymentTypeForm.get('paymentMode').markAsTouched();
      }
     }
  
    billPaymentSubmit() {
      this.authenticators[0].parameter_name = this.consumerLabel;
      this.authenticators[0].value = this.billPaymentForm.value.consumerNumber;
      let billerdetailsList = {
        billerName:this.selectedBillerName,
        billerId: this.billPaymentForm.value.boardname,
        customerid: this.DataService.customerID,
        authenticators: this.authenticators,
        
      }

      console.log(JSON.stringify(billerdetailsList))
      if(this.billPaymentForm.valid){
       this.DataService.electricBillObj.billername = this.selectedBillerName
        this.DataService.electricBillObj.custID = this.billPaymentForm.value.consumerNumber
        this.DataService.electricBillObj.billerID = this.billPaymentForm.value.boardname
       
        this.getBillDetails(this.billPaymentForm.value.consumerNumber,this.billPaymentForm.value.boardname )
        this.validatePaymentDetails(billerdetailsList)
        // this.goToPage('existingGetBill') ;
      } else{ 
        this.validateForm() ;
      }
    }

    onSelectOption(){
      this.boardNameToggle = !this.boardNameToggle
        $('#board-name').slideToggle();
        $('#board-name').parent().toggleClass('active')
   

    }

    //////////////////On biller Board Select ///////////////////////////////////////////

    boardTypeSelection(item){
      console.log("item ==> " + JSON.stringify(item))
      this.onSelectOption()
        this.selectedBoard = item ;
        //this.registerBillerForm.setValue({boardname: item.billerId})
        this.billPaymentForm.get('boardname').setValue(item.billerid);
        this.billPaymentForm.get('consumerNumber').setValue('');
        this.selectedBillerName = item.billerName
        $('#board-name').slideUp();
        $('#board-name').parent().removeClass('active')
        this.consumerLabel = item.authenticators[0].parameter_name
        this.billPaymentForm.get('consumerNumber').setValidators([Validators.required, Validators.pattern(item.authenticators[0].regex)]);
        this.errorMsg =  item.authenticators[0].error_message;
        this.logoUrl = item.biller_logo;
        this.billSampleURL = item.biller_bill_copy;
        this.billPaymentForm.get('consumerNumber').updateValueAndValidity();  
        this.billPaymentForm.get('boardname').updateValueAndValidity();  
        this.partialPay = item.partial_pay;
        this.validatePay =item.online_validation;
      if(item.customer_conv_fee?.length > 0 ){
        item.customer_conv_fee.forEach(el => {
          if (el.payment_channel == "Internet") {
            
            this.cou_conv_fee = el.cou_conv_fee
            this.bou_conv_fee = el.bou_conv_fee

            console.log("this.cou_conv_fee" + this.cou_conv_fee)
            console.log("this.bou_conv_fee" + this.bou_conv_fee)
            
          }
        })
        console.log("outside" + this.cou_conv_fee)
        
      }else{
        this.cou_conv_fee = "0.00"
        this.bou_conv_fee = "0.00"
      }
      this.totalHandlingCharge = (parseFloat(this.cou_conv_fee) + parseFloat( this.bou_conv_fee)).toFixed(2)
      
      
    // this.currency  = item.
    }


  

  // clickedOut($event){
  //   $('#board-name').slideUp();
  //   $('#board-name').parent().removeClass('active')
  // }




 ////////////////////////////get stateData //////////////////////////////////
  getState() {
    let stateListParams = this.bbpsService.getLocationList(this.DataService.billcategory);
    this.http.callBankingAPIService(stateListParams, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
      console.log(JSON.parse(data.responseParameter.bbpsResponse));
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
     
          this.stateList =JSON.parse(data.responseParameter.bbpsResponse).responseParameter.billerLocationList
          console.log('State List: ', this.stateList);
          if(this.stateList.length == 1 && this.stateList[0] == "National"){
            this.onStateSelect(this.stateList[0])
          }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }






  ////////////////////////////get billerData //////////////////////////////////

  onStateSelect(value){
    this.selectedBoard ={"biller_legal_name": 'Select Board' ,'billerid':'', 'biller_logo':''}
    console.log("selected state ===> " + value);
    this.consumerLabel ='';
    // console.log( "response SANAL === >" +  this.httpBbpsApiCall(value))
    var param = this.bbpsService.getbillerlist(value , this.DataService.billcategory)
    this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.finalBillerList=[]
        console.log(data.responseParameter);
       
          this.boardNameValue =JSON.parse(data.responseParameter.bbpsResponse).responseParameter.billerList
          console.log('billerList: ', this.boardNameValue);

       
      }
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






  /////////////////////////// Validate Payment  //////////////////////

  validatePaymentDetails(data){
  
    var param = this.bbpsService.ValidatePaymentParam(data);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
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
          'paymentType': 'instapay',
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
        this.showFetchBill = true ;
        console.log("this.billerdetailsDataPass ==>" + this.billerdetailsDataPass)
        
        }
        else {
          this.errorCallBack(data.subActionId, resp);
      }
    })
  }



  errorCallBack(subActionId, resp) {
    //showToastMessage(resp.Result, "error");
  }


  existingGetBillSubmit() {
      this.goToPage('existingBillPayment') ;
      this.DataService.billerdata = this.billerdetailsDataPass
  }

  getBillDetails(consumerNum , billerId) {
    let stateListParams = this.billPaymnetService.getBillDetails(consumerNum , billerId, 'RetrieveBillService');
    this.http.callBankingAPIService(stateListParams, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
      // console.log(JSON.parse(data.responseParameter.bbpsResponse));
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
     
          this.billdetails =JSON.parse(data.responseParameter.bbpsResponse).responseParameter.result
          this.billdetails = JSON.parse(this.billdetails)
         
          console.log('billdetails billdetails : ', JSON.stringify(this.billdetails));


      }
      else {
      ///  this.errorCallBack(data.subActionId, resp);
      }
    });
  }
 
}
