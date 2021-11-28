import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { pageLoaderService } from '../../../../services/pageloader.service';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { AppConstants } from '../../../../app.constant';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DashboardService } from '../dashboard.service';
import { DatePipe, LocationStrategy, Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import * as Chart from 'chart.js'
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { Idle } from '@ng-idle/core';
import { DetailStatementService } from '../../my-accounts/detailed-statement/detailed-statement.service';
import { ProfileDetailsService } from '../../profile/profile-details/profile-details.service';
import { ChartComponent } from "ng-apexcharts";
import { AccountType } from '../../../../utilities/app-enum';
import {InstantPayService} from '../../fund-transfer/instant-pay/instant-pay.service'
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { FormValidationService } from 'src/app/services/form-validation.service';
import { AddPayeeService } from '../../fund-transfer/add-payee/add-payee.service';
import { UpiDashboardService } from 'src/app/pages/upi/dashboard/upi-dashboard.service';
import { NotificationService } from '../../../omni/notification/notification.service';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

declare function vartualKeybord(vartualPass, keyBoardDiv): any;
declare var showToastMessage: any;
declare var cordova:any;
declare var $: any;



@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  custAccountList = [];
  accountList: any = [];
  transactionList: any = [];
  nonDisplayMenu: any = [];
  dashBoardMenu: any = [];
  viewMoreTransac: boolean = true;
  viewMoreCredit: boolean = true;
  Showcondition: boolean = false;
  creditCardList = [];
  frequentTransactionList = [];
  frequentTransactionColor = ['green1', 'grey1', 'red1', 'greenlight', 'yellow'];
  accountCarouselOptions: OwlOptions;
  customizeMenuCarouselOptions: OwlOptions;
  recommendedCardCarouselOptions :OwlOptions
  investCarouselOptions :OwlOptions
  recentTransactionOption :OwlOptions
  activeSlides: SlidesOutputData;
  canvasDonot: any;
  ctxDonot: any;
  totalAsset: any;
  totalLiablities: any;
  totalWorth: any = 0;
  refreshedTime:any;
  instaPayForm: FormGroup;
  instaAccountForm : FormGroup ;
  selectedAccount: any = '';
  isValidIFSC = false;
  validmsg:any = ''
  transfertype="within"
  ifscCheckFlag = false
  ifscerrormsg = false
  instapayAccSelected = false
  commonPageComponent = {
    'headerType': 'innerHeader',
    'sidebarNAv': 'OmniNAv',
    'footer': 'innerFooter',
    'currentpageRoute': '/dashboard'
  }
  instapayerror =''
  accountDetails: any;
  index: any;
  userName: any;
  bankAddress:any;
  ifscDtl:any;

  //feilds for card
  totalSavingAcc: any = '00';
  totalSavingAmt: any = 300.08;
  totalDepositeAcc: any = '00';
  totalDepositeAmt: any = 0;
  totalBorrowingAcc: any = '00';
  totalBorrowingAmt: any = 100.98;
  investProducts:any;
  investProductsupdated:any =[];
  recommendedCard:any;
  myBrowsingShow: boolean = false;
  myDepositShow: boolean = false;
  mySavingShow: boolean = false;
  instaPayAccount : boolean = false ;
  mycustomMenu = [];
  oldRecord:any;

  totalSavingMaskedAmt:any;
  totalDepositeMaskedAmt:any;
  totalBorrowingMaskedAmt:any;
  totalSavingAmtpositve:any;
  totalDepositeAmtpositive:any;
  totalBorrowingAmtpositive:any;
  getProfiledetail:any;

  recommendedOffer:any
  accountInsta = ''
  instaAccount = [];
  instaPayToUserData : any = '' ;
  exceedMinAmt: boolean = false;
  isOperativeSingleCurrency: boolean = false;
  isDepositeSingleCurrency: boolean = false;
  isBorrowingSingleCurrency: boolean = false;

  // [
  //   {'accountNo' : '112221001010'},  {'accountNo' : '11234234535'},  {'accountNo' : '00000566545'},  {'accountNo' : '1122568975659'}
  // ]


  constructor(
    private router: Router,
    public dataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    public commonMethod: CommonMethods,
    private dashboardService: DashboardService,
    private constant: AppConstants,
    private storage: LocalStorageService,
    private idle: Idle,
    public customCurrencyPipe: CustomCurrencyPipe,
    public datepipe:DatePipe,
    public detailStatementService:DetailStatementService,
    private domSanitizer: DomSanitizer,
    private profileDtlsService : ProfileDetailsService,
    private location: Location,
    private formValidation: FormValidationService,
    private addPayeeService:AddPayeeService,
    public instantPayService: InstantPayService,
    private upiDashboardService : UpiDashboardService,
    private notificationServicemob: NotificationService,

  ) {

    this.chartOptions = {
      series: [this.totalSavingAmt, this.totalDepositeAmt, this.totalBorrowingAmt],
      chart: {
        type: "donut",
        width:320,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            var self = this
            console.log(chartContext, config);
            var routing = config.dataPointIndex
            if(routing==0)
            self.router.navigateByUrl('/myAccount');
            else if(routing==1)
            self.router.navigateByUrl('/myDeposits');
            else if(routing==2)
            self.router.navigateByUrl('/myBorrowings');

          }
        },

      },


      labels: [" Savings, Current and OD Amount,", "Deposit Amount", "Borrowings"],

      responsive: [
        {
          breakpoint:2000,
          options: {
            chart: {
              width: 250,

            },
            tooltip: {

              custom: function({ series, seriesIndex, dataPointIndex, w }) {
                var self =this
                var color = w.globals.colors[seriesIndex]
                return "<div style='font-size:10px;background-color:"+color+";color:white;padding:5px'>" + w.config.labels[seriesIndex]+": "+"₹ "+(series[seriesIndex]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+ "</div>";
              }
            },
            dataLabels: {
              // enabled: true,
              // offsetX: 30,
              offsetX: 40,
              offsetY: 10,
              textAnchor: 'end',
              precision: 2,
              fontSize:"10px",
              style: {
                colors: ['#333'],

            },
            },
            legend: {
              position: "bottom",
              fontSize:"10px",

            }
          }
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,

            },
            legend: {
              position: "right"
            }
          }
        }

      ]
    };

    // this.updateSeries();
    // alert( this.chartOptions.series)

  }

    updateSeries() {
      this.totalSavingAmtpositve=Math.abs(this.totalSavingAmt)
      this.totalDepositeAmtpositive=Math.abs(this.totalDepositeAmt)
      this.totalBorrowingAmtpositive=Math.abs(this.totalBorrowingAmt)
      console.log("totalSavingAmtpositve", this.totalSavingAmtpositve)
      console.log("totalDepositeAmtpositive", this.totalDepositeAmtpositive)
      console.log("totalBorrowingAmtpositive", this.totalBorrowingAmtpositive)


     this.chartOptions.series = [parseFloat(this.totalSavingAmtpositve), parseFloat(this.totalDepositeAmtpositive),parseFloat(this.totalBorrowingAmtpositive)];

    //  this.chartOptions.series = [parseFloat(this.totalSavingAmt), parseFloat(this.totalDepositeAmt),parseFloat(this.totalBorrowingAmt)];

    //  this.chartOptions.series = [parseFloat((this.totalSavingAmt).toFixed(2)), parseFloat((this.totalDepositeAmt).toFixed(2)),parseFloat((this.totalBorrowingAmt).toFixed(2))];


  }

  buildForm() {
    this.instaAccountForm = new FormGroup({
      chooseAccount: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
      remark: new FormControl(''),
    })

    this.instaPayForm = new FormGroup({
      accNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.min(1), Validators.pattern("^[a-zA-Z0-9_]*$")]),
      confirmAccountNumber: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_]*$")]),
      IFSCCode: new FormControl('', []),
      custname: new FormControl('', [])
    }, { validators: [this.accountNo.bind(this)]});
  }

  ngOnInit(): void {
    this.dataService.getBreadcrumb("DASHBOARD" , this.router.url)

    // this.instaAccount = this.dataService.customerOperativeAccList;
    this.dataService.customerOperativeAccList.forEach(el => {
      if (el.Status != 'Dormant') {
        this.instaAccount.push(el);
      }
    });
    console.log('instaAcc',this.instaAccount);
    this.initialization();

    // if(this.instaPayAccount) {
    //   this.buildForm();
    // }
  }

  /**
   * To initialize on load this function is invoked
   */
  initialization() {
    //console.log("customerFetchDetail:",this.dataService.profiledateDetails);

    this.buildForm() ;
    this.commonMethod.showLoader();
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)

    this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.dataService.timeFormat);
    console.log('Refreshed Time: ', this.refreshedTime);
    this.idle.watch();
    this.recommendedCardCarouselOptions = this.dataService.getrecommendedCardCarouselOptions();
    this.recentTransactionOption = this.dataService.getrecentTransactionOption();
    var cardParam = this.dashboardService.getOfferCradsparam('Cards');
    console.log('cardParam: ', cardParam);
    this.getOfferCardList(cardParam)
       // Offers
    var offerParam = this.dashboardService.getOfferCradsparam('Offer');
    console.log('offerParam: ', offerParam);
    // this.getOfferList(offerParam)
    let recommedCardParam = this.dashboardService.getRecommendedCard();
    this.accountList = this.dataService.customerAccountList;
    this.dataService.changeMessage(this.commonPageComponent);

    this.accountCarouselOptions = this.dataService.getAccountCarouselOptions();
    this.customizeMenuCarouselOptions = this.dataService.getCustomizeMenuCarouselOptions();
    this.investCarouselOptions = this.dataService.getinvestCarouselOptions();

    //set dashbord card details
    this.getAccountList();

    //set username
    //TODO:Need to modify with respect to edit profile
    this.userName = this.dataService.userDetails?.customerName;
    console.log('user details: ', this.dataService.userDetails);

    //Api call for Invest with Us
    let getParam = this.dashboardService.getInvestWithUsparam();
    this.getInvestWithUs(getParam);

    var customizeParam = this.dashboardService.getCustomizeMenuParam();
    this.getUserCustomizeMenu(customizeParam);

    //webLastLogin
    if (this.storage.hasKeySessionStorage("isLoggedIn")) {
      console.log(this.dataService.totalMyOperativeBalance);
      // Amount of all account
    this.totalSavingAmt = this.dataService.totalMyOperativeBalance.toFixed(2);
    this.totalSavingMaskedAmt = this.commonMethod._maskBalance(this.totalSavingAmt.toString());
    this.totalDepositeAmt = this.dataService.totalMyDepositBalance.toFixed(2);
    this.totalDepositeMaskedAmt = this.commonMethod._maskBalance(this.totalDepositeAmt.toString());
    this.totalBorrowingAmt = this.dataService.totalMyBorrowingsBalance.toFixed(2);
    this.totalBorrowingMaskedAmt = this.commonMethod._maskBalance(this.totalBorrowingAmt.toString());
    let _totalWorth :any = this.dataService.totalMyOperativeBalance + this.dataService.totalMyDepositBalance + this.dataService.totalMyBorrowingsBalance;
    
    this.totalWorth = _totalWorth;
    console.log("totalSavingAmt",this.totalSavingAmt)
    console.log("totalDepositeAmt",this.totalDepositeAmt)
    console.log("totalBorrowingAmt",this.totalBorrowingAmt)
    this.updateSeries();

        //var totalBal = this.dataService.totalMyOperativeBalance + this.dataService.totalMyDepositBalance;

        // if(totalBal >= (-this.dataService.totalMyBorrowingsBalance)){
        //   this.totalWorth = this.customCurrencyPipe.transform(_totalWorth.toString().trim(), 'decimal');
        // }else{
        //   this.totalWorth = " -" + this.customCurrencyPipe.transform(_totalWorth.toString().trim(), 'decimal');
        // }

      this.dataService.showDetails = true;
      let isMPIN = this.dataService.loginType == 'mpin';
      //frequent transaction
      var frequentTransacParam = this.dashboardService.getFrequentTransacParam(isMPIN);

      this.getFrequentTransaction(frequentTransacParam);
      //card list
      // let reqParam = this.dashboardService.getRequestForCardList(isMPIN);
      // this.getCardList(reqParam);
      //transaction history
      this.selectedAccoutNo(this.dataService.customerAccountList[0]?.accountNo);
      // var transactionParam = this.dashboardService.getTransactionParam(this.dataService.customerAccountList[0]?.accountNumber);
      // this.getTransactionHistory(transactionParam);

      console.log(this.dataService.dashboardCustomizeMenuArr);

      if(this.dataService.dashboardCustomizeMenuArr.length == 0) {
        //customize menu
        // var customizeParam = this.dashboardService.getCustomizeMenuParam();
        // this.getUserCustomizeMenu(customizeParam);
      }
      //Account list
      this.getProfileDtl();
      this.fetchVPAAdressList();
      // Offers Cards
      //Checks if account is single currency or multiple currency
      if(this.dataService.isNRENRO){
        this.isOperativeSingleCurrency = this.dataService.customerOperativeAccList.some((e) => e.currency.toLowerCase() != "inr");
        this.isDepositeSingleCurrency = this.dataService.customerMyDepostie.some((e) => e.currency.toLowerCase() != "inr");
        this.isBorrowingSingleCurrency = this.dataService.customerBorrowingsList.some((e) => e.currency.toLowerCase() != "inr");
        console.log("<===== checking nre and nro ====>");
        console.log(this.isOperativeSingleCurrency,this.isDepositeSingleCurrency,this.isBorrowingSingleCurrency);
      }

    } else {
      if(this.constant.getPlatform() == "web"){
        this.router.navigateByUrl('/login');
      }
      else{
        this.router.navigateByUrl('/loginMobile');
      }
    }
    // this.updateSeries();

    this.getNotificationApiCall();
    this.dataService.recentTransData = {};
  }

  /**
  * function to get all the account list and filter
  *  data with respect to it
  */
   getAccountList(type?:any) {
    this.totalSavingAcc = this.dataService.customerOperativeAccList.length < 10 ? '0' + this.dataService.customerOperativeAccList.length : this.dataService.customerOperativeAccList.length;
    this.totalDepositeAcc = this.dataService.customerMyDepostie.length < 10 ? '0' + this.dataService.customerMyDepostie.length : this.dataService.customerMyDepostie.length;
    this.totalBorrowingAcc = this.dataService.customerBorrowingsList.length < 10 ? '0' + this.dataService.customerBorrowingsList.length : this.dataService.customerBorrowingsList.length;
  }

  /**
   * function to fetch profile Dtl and set profile Image
   * @accountNumber
   */
  getProfileDtl(){
    let param = this.profileDtlsService.getProfileDetailsParam();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CUSTPROFILEDETAILS).subscribe(data => {
      var resp = data.responseParameter;
      console.log('data: ', data);
      if (resp.opstatus == "00") {
        var responseData = data.listofDataset[0].records;
        this.dataService.profiledateDetails= responseData;
        console.log('customer profile data: ', this.dataService.profiledateDetails);
        this.dataService.userName = responseData[0].custName;
        this.dataService.profileDetails = responseData;
        if (resp?.base64Image != "")
          this.dataService.profileImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + resp?.base64Image);
        else
          this.dataService.profileImage = ""

        //get state and city code
        console.log('custProfileStateCityObj: ', this.dataService.custProfileStateCityObj);
        this.dataService.custProfileStateCityObj.state = data.responseParameter.stateCode;
        if(data.responseParameter.cityCode.includes('(')) {
          this.dataService.custProfileStateCityObj.city = data.responseParameter.cityCode.split('(')[0];
        }
        else {
          this.dataService.custProfileStateCityObj.city = data.responseParameter.cityCode;
        }

        this.dataService.custProfileStateCityObj.stateId = data.responseParameter.stateId;
        this.dataService.custProfileStateCityObj.cityId = data.responseParameter.CityId;

      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }
  transferTypeChange(type){
    this.transfertype = type;
    if(this.transfertype == 'outside'){
      this.instaPayForm.controls['IFSCCode'].setValidators([Validators.required, Validators.minLength(11), Validators.pattern("^[A-Z0-9]*$")])
     this.instaPayForm.controls['custname'].clearValidators();
     this.instaPayForm.controls['accNumber'].reset() ;
     this.instaPayForm.controls['confirmAccountNumber'].reset() ;


    }else{
      this.instaPayForm.controls['accNumber'].reset() ;
      this.instaPayForm.controls['confirmAccountNumber'].reset() ;

      this.instaPayForm.controls['custname'].setValidators([Validators.required])
    this.instaPayForm.controls['IFSCCode'].clearValidators();
    }


    this.instaPayForm.controls['IFSCCode'].updateValueAndValidity();
    this.instaPayForm.controls['custname'].updateValueAndValidity();
  }
  /**
   * function called when account no is selected
   * @accountNumber
   */
  selectedAccoutNo(accountNumber) {
    console.log("inside====>", accountNumber);
    var transactionParam = this.dashboardService.getTransactionParam(accountNumber);
    this.getTransactionHistory(transactionParam);

    //calculate index in case of view more option
    var index = this.accountList.findIndex(x => x.accountNumber === accountNumber)
    if (index === -1) return;
    this.accountDetails = this.accountList[index]
    this.index = index;
  }

  setLastRefreshedDate(){

    let param = this.detailStatementService.getMyAccountList(this.dataService.userDetails.cifNumber);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_OMNIDASHBOARD).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.dataService.timeFormat);
        this.accountList = data.set.records;
        this.dataService.fetchTotalBalance(data.set.records , "dashboard");

        this.dataService.customerMyDepostie = [];this.dataService.customerOperativeAccList =[];this.dataService.customerBorrowingsList;
          this.dataService.totalMyDepositBalance = 0;this.dataService.totalMyOperativeBalance = 0;this.dataService.totalMyBorrowingsBalance = 0;
            data.set.records.forEach(el => {
              if( el.accountType != "CAPPI"){
                if(el.SchemeCode == AccountType.FIXED_DEPOSITE_ACCOUNT){
                  this.dataService.customerMyDepostie.push(el);
                  this.dataService.totalMyDepositBalance = this.dataService.totalMyDepositBalance + parseFloat(el.acctBalance);
                }
                else if( el.SchemeCode == AccountType.SAVING_ACCOUNT ||  el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT ){
                  // el.AGSStatus = el["AGS Status"];
                  this.dataService.customerOperativeAccList.push(el);
                  this.dataService.totalMyOperativeBalance = this.dataService.totalMyOperativeBalance + parseFloat(el.acctBalance);
                }
                else if( el.SchemeCode == AccountType.LOAN_ACCOUNT ){
                  this.dataService.customerBorrowingsList.push(el);
                  this.dataService.totalMyBorrowingsBalance = this.dataService.totalMyBorrowingsBalance + parseFloat(el.acctBalance);
                }
              }
            });

        this.totalSavingAmt = this.dataService.totalMyOperativeBalance.toFixed(2);
        this.totalSavingMaskedAmt = this.commonMethod._maskBalance(this.totalSavingAmt.toString());
        this.totalDepositeAmt = this.dataService.totalMyDepositBalance.toFixed(2);
        this.totalDepositeMaskedAmt = this.commonMethod._maskBalance(this.totalDepositeAmt.toString());
        this.totalBorrowingAmt = this.dataService.totalMyBorrowingsBalance.toFixed(2);
        this.totalBorrowingMaskedAmt = this.commonMethod._maskBalance(this.totalBorrowingAmt.toString());

        this.totalSavingAcc
        this.totalDepositeAcc
        this.totalBorrowingAcc

        let _totalWorth :any = this.dataService.totalMyOperativeBalance + this.dataService.totalMyDepositBalance + this.dataService.totalMyBorrowingsBalance;
        this.totalWorth = _totalWorth;
        this.getAccountList();
        // this.accountList =
      }
      else {

      }
    });

  }
  /**
   * api call to get transaction history
   * @param
   */
  getTransactionHistory(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_TRANSACTIONHISTORY).subscribe(data => {
      console.log("=========>",data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        if (data.set !== undefined && data.set !== '' && data.set !== null) {
          this.transactionList = data.set.records;
          console.log('TRANSACTION LIST :::: ', this.transactionList)
          this.transactionList.forEach(el => {
            el.ShortName = el.productName.split(' ').map(x => x.charAt(0)).join('').substr(0, 2).toUpperCase()
            el.formatDate = el.Date.split('-')
          });
          console.log(this.transactionList);
        }
        else {
          this.transactionList = [];
        }
      }
      else {
        this.transactionList = [];
        this.errorCallBack(data.subActionId, resp);
      }

    });
  }

  /**
   * api call to get customize menu
   * @param
   */
  getUserCustomizeMenu(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CUSTOMIZEMENU).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log("CustomizeMenu" + JSON.stringify(data.set.records));

        /***** This details will not be displayed *****/
        // this.nonDisplayMenu.push("MY_ACCOUNTS");
        // this.nonDisplayMenu.push("OFFERS");
        // this.nonDisplayMenu.push("RECENT_PAYMENTS");
        // this.nonDisplayMenu.push("NOTIFICATIONS");
        // this.nonDisplayMenu.push("LOAN_CALCULATOR");

        data.set.records.forEach((element) => {
          if (
            element.Status == "Active" &&
            !this.nonDisplayMenu.includes(element.menuName)
          )
            console.log('valid customize menus: ', element);
            this.dashBoardMenu.push(element);
        });

        this.dataService.dashboardCustomizeMenuArr = this.dashBoardMenu;

        this.dashBoardMenu.forEach((element) => {
          switch (element.menuName) {
            case "Transactions":
              element.imgName = "transaction-desk.svg"
              break;
            case "Bill Pay":
              element.imgName = "billspay-desk.svg"
              break;
            case "Open Deposit":
              element.imgName = "open-deposit-desk.svg"
              break;
            case "Apply for PPF":
              element.imgName = "ppf-desk.svg"
              break;
            case "Stop Cheque":
              element.imgName = "stop-cheque-desk.svg"
              break;
            case "Insta SIP":
              element.imgName = "insta-sip-desk.svg"
              break;
            default:
              element.imgName = element.menuName.replace(/\s/g, "") + ".png";
              break;
          }
        });

        this.dataService.dashboardCustomizeMenuArr.forEach((element) => {
          switch (element.menuName) {
            case "Transactions":
              element.imgName = "transaction-desk.svg"
              break;
            case "Bill Pay":
              element.imgName = "billspay-desk.svg"
              break;
            case "Open Deposit":
              element.imgName = "open-deposit-desk.svg"
              break;
            case "Apply for PPF":
              element.imgName = "ppf-desk.svg"
              break;
            case "Stop Cheque":
              element.imgName = "stop-cheque-desk.svg"
              break;
            case "Insta SIP":
              element.imgName = "insta-sip-desk.svg"
              break;
            default:
              element.imgName = element.menuName.replace(/\s/g, "") + ".png";
              break;
          }
        });
        if(this.dataService.dashboardCustomizeMenuArr.length){
          for(var i=0 ; i < this.dataService.dashboardCustomizeMenuArr.length; i++){
            if( this.dataService.dashboardCustomizeMenuArr[i].type == 'BANKING_SERVICES'){


              this.mycustomMenu.push(this.dataService.dashboardCustomizeMenuArr[i])
              // this.mycustomMenu['menuName'] = (this.mycustomMenu['menuName']).replace("-", ' ')
              // console.log("data :: ", this.mycustomMenu[i]['menuName'])
            }
          }


          console.log("this.mycustomMenu" + JSON.stringify(this.mycustomMenu))

        }

        for(let i=0; i< this.mycustomMenu.length ; i++){
          this.mycustomMenu[i]['menuNameValue'] = (this.mycustomMenu[i]['menuName']).replace("-", ' ')
          console.log("data :: ", this.mycustomMenu[i]['menuNameValue'])
        }





      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }


  /**
   * This function is called when refresh icon is clicked to check the balance
   * @param customerAccDetails
   * @param index
   */
  getBalanceEnquiry(customerAccDetails, selectedIndex) {
    let balEnquiryReq = this.dashboardService.getBalEnqParam(customerAccDetails);
    this.http.callBankingAPIService(balEnquiryReq, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEENQUIRY).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        // this.dataService.customerAccountList = data.set.records;
        let list = data.set.records;
        list.map((customer, index) => {
          customer.maskBalance = this.commonMethod._maskBalance(customer.sbBalance);
          this.setCardColor(customer, index);
          return customer;
        });
        let balanceEnq = this.getBalanceEnquiryObj(list, customerAccDetails);
        balanceEnq.showBal = true;
        this.dataService.customerAccountList[selectedIndex] = balanceEnq;
        this.custAccountList = this.dataService.customerAccountList;
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  getData(data: SlidesOutputData) {
    this.activeSlides = data;
    console.log(this.activeSlides);
  }

  /**
   * This function is called to get the particular object updated from array
   */
  getBalanceEnquiryObj(array, obj) {
    return array.find(i => i.accountNumber == obj.accountNumber);
  }

  /**
   * To set the card colot dynamically this function is invoked
   * @param customerDetails
   * @param index
   */
  setCardColor(customerDetails, index) {
    customerDetails.cardColor = this.constant.cardColorsArr[index]?.cardColor;
    customerDetails.cardDetailsColor = this.constant.cardColorsArr[index]?.cardDetailsColor;
    return customerDetails;
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    if (resp.opstatus == "02") {
      //showToastMessage(resp.Result, "error");
    }
  }

  /**
   * function to hide and show max no of
   * frequent transaction
   */
  viewMore() {
    this.dataService.accDetails = this.accountDetails;
    this.dataService.accDetails.showBal = false;
    this.dataService.accDetailsIdx = this.index;
    this.dataService.accDetails.maskBalance = this.commonMethod._maskBalance(this.accountDetails.sbBalance);
    this.router.navigateByUrl('/myAccountDetails');
    // if (this.viewMoreTransac) {
    //   this.viewMoreTransac = false;
    // }
    // else {
    //   this.viewMoreTransac = true;
    // }
  }

  viewMoreCreditList() {
    if (this.viewMoreCredit) {
      this.viewMoreCredit = false;
    }
    else {
      this.viewMoreCredit = true;
    }
  }


  /**
   * This function is invoked to set total liablities,total networth and total assets in the chart
   */
  getTotalAssetsLiablities() {
    this.totalAsset = this.dataService.totalAssets;
    this.totalLiablities = this.dataService.totalLiabilities;
    this.totalWorth = parseFloat(this.totalAsset) - parseFloat(this.totalLiablities);

    this.canvasDonot = document.getElementById('pie-chart');
    this.ctxDonot = this.canvasDonot.getContext('2d');
    let myChart = new Chart(this.ctxDonot, {
      type: 'donut',
      data: {
        labels: [
          'Total Assets',
          'Total Liabilities',
        ],
        responsive: [
          {
            breakpoint: 1500,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ],
        datasets: [{
          data: [this.totalAsset, this.totalLiablities],
          backgroundColor: ['rgb(0, 180, 240)', 'rgb(240, 48, 10)']
        }]
      },
      options: {
        legend: {
          position: 'bottom',
          labels: {
            fontColor: "#000",
            padding: 10,
          }
        },
        cutoutPercentage: 70,
        responsive: true,
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var value = data.datasets[0].data[tooltipItem.index];
              if (parseInt(value) >= 1000) {
                return '₹ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              } else {
                return '₹ ' + value;
              }
            }
          } // end callbacks:
        }
      }

    });
  }

  /**
   * function to get all frequent transaction
   */
  getFrequentTransaction(frequentRransactionReq) {

    this.http.callBankingAPIService(frequentRransactionReq, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_FREQUENTTRANS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;

      if (resp.opstatus == "00") {
        console.log(resp);
        if (data.listofDataset !== undefined && data.listofDataset[0].records !== undefined ) {
          //this.dataService.frequentTransact = data.set.records;

          data.listofDataset[0].records.forEach(el => {
            var dtl = {
              "benefName": el.benefName,
              "txn_amount": el.txn_amount,
              "DestinationType": el.DestinationType,
              // "color": this.frequentTransactionColor[Math.floor(Math.random() * 3) + 1],
              "TransactionDate" : el.TransactionDate,
              "TransactionMonth" : el.TransactionMonth,
              "transType" : el.TransactionType,
              "accNo": el.accountNo,
              "fromAccNumber": el.fromAccNumber,
              "toAccNumber": el.toAccNumber,
              "beneficiary_bank_name": el.beneficiary_bank_name,
              "ifsc_code": el.ifsc_code,
              "transactionType" : el.RechargeType
            }
            this.frequentTransactionList.push(dtl);

          });

          this.frequentTransactionList = this.dataService.getRecentTransactionList(this.frequentTransactionList) ;
          console.log("Frequest List :: == > ", this.frequentTransactionList)
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }



  /**
  * api call for getting cardlist
  * @Param get request in encrypted format
  */
  getRecommededCard(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_RECOMMENDEDCARDS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.recommendedCard = data.set.records;


      }
      else {
        this.errorCallBack(data.subActionId, resp);

      }
    });
  }


  /**
  * api call to invest with list
  * @Param get request in encrypted format
  */
  getInvestWithUs(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_INVESTMENTPRODUCT).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.investProducts = data.set.records;



        console.log('investProducts', this.investProducts);

        var self = this
        data.set.records.forEach(el => {
          var dtl = {
            "productName": el.productName,
            // "logo":"data:image/svg+xml;base64," + el.logo,
            "logo": el.productName.replace('/',''),

          }
          self.investProductsupdated.push(dtl);
          console.log(" this.investProductsupdated" +  this.investProductsupdated)
        });

      }
      else {
        this.errorCallBack(data.subActionId, resp);

      }
    });
    // console.log(" this.investProductsupdated 1" +  this.investProductsupdated)
  }



  /**
  * api call for getting cardlist
  * @Param get request in encrypted format
  * @loginType
  */
  getCardList(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETCARDSLIST).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('set')) {
          // this.dataService.cardLists = data.set.records;
          this.creditCardList = data.set.records;
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);

      }
    });
  }

  /**
   * This function is invoked to get All state List
   */
  getStateList() {
    let stateListParams = this.dashboardService.getStateListParams();
    this.http.callBankingAPIService(stateListParams, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETSTATES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('set')) {
          this.dataService.stateList = data.set.records;
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);

      }
    });
  }

    /**
  * api call for getting cardlist
  * @Param get request in encrypted format
  * @loginType
  */
     getOfferCardList(param) {
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETOFFERS).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
          this.recommendedCard = data.set.records;
          console.log('Recommended Cards: ', this.recommendedCard);
        }
        else {
          this.errorCallBack(data.subActionId, resp);

        }
      });
    }

      /**
  * api call for getting cardlist
  * @Param get request in encrypted format
  * @loginType
  */
       getOfferList(param) {
        this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETOFFERS).subscribe(data => {
          console.log(data);
          var resp = data.responseParameter;
          if (resp.opstatus == "00") {
            console.log(data.responseParameter);
            this.recommendedOffer = data.set.records;
            console.log('recommended offers: ', this.recommendedOffer);
          }
          else {
            this.errorCallBack(data.subActionId, resp);

          }
        });
      }

  closeTransferPopup() {
    this.Showcondition = false
  }

  transferRoute(path) {
    this.router.navigateByUrl(path);
  }

  goToPage(item) {
    console.log(item);
    if (item.menuName == "Fund Transfer") {
      this.Showcondition = true
      // this.router.navigateByUrl('/ownBanks');
    } else if(item.menuName == "Fund Transfer") {
        this.router.navigateByUrl("/freezeAccount");
    } else if(item.menuName == "BILL_PAY") {
        this.router.navigateByUrl("/rechargeBillPay");
    } else if(item.menuName == "STOP_CHEQUE") {
        this.router.navigateByUrl("/stopCheques");
    } else if(item.menuName == "send-money") {
      this.router.navigateByUrl("/sendMoney");
    }
    else {
      this.Showcondition = false
    }
  }


  goToRoutePage(route){
    console.log(route)
    if(route && route != 'null'){
      this.router.navigateByUrl(route);
    }

  }

  goToRoutePageBankingService(route,routePageName){
    console.log(route)
    if(routePageName =='registered-bill-pay' || routePageName =='e-filling' || routePageName =='token' || routePageName =='pending-bill' || routePageName =='bills-recharges' || routePageName == 'scheduled-transaction'){
      return;
    }
    if(route && route != 'null'){
      this.router.navigateByUrl(route);
    }else if(routePageName == 'tds-certificate'){
      this.router.navigateByUrl('/tdsCertificate');
    } 
    else if(routePageName == 'create-si'){
      this.router.navigateByUrl('/standingInstructionList');
    }else if(routePageName == 'pending-bill'){
      this.router.navigateByUrl('/unpaidBill');
    }else if(routePageName == 'bills-recharges'){
      this.router.navigateByUrl('/retailRechargeBillPay')
    }else if(routePageName == 'scheduled-transaction'){
      this.router.navigateByUrl('/transactionStatus')
    }
    
  }

  goToRoutePageInvestUs(route){
    console.log(route)
   if(route == 'PMJJBY'){
      this.router.navigateByUrl('/pmjjby');
    }else if(route == 'PMSBY'){
      this.router.navigateByUrl('/pmsby');
    }else if(route == 'APY'){
      this.router.navigateByUrl('/socialSecurities');
    }
    else if( route == 'Open FD/RD'){
      this.router.navigateByUrl('/applyForFdRD');
    }
  }

  gotoOffers()
  {
    showToastMessage("Coming soon", "success");
  }
  // goToAddpayee(){
  //   this.router.navigate(['/addPayee']);
  // }
  gotoInvestwithUs()
  {
    showToastMessage("Coming soon", "success");
  }

  onWeblinkClicked() {
    this.router.navigateByUrl("/applyCards");
  }
  transactiondetails(data){
    console.log(JSON.stringify(data))
    this.dataService.recentTransData = data;
    this.router.navigate(['/sendMoney']);
  }
  refreshBtn(value){
    switch(value){
      case 'operativeAccounts':
          this.mySavingShow = !this.mySavingShow
      break ;

      case 'myDeposit':
        this.myDepositShow = !this.myDepositShow
      break ;

      case 'myBorrow':
        this.myBrowsingShow = !this.myBrowsingShow
      break ;
    }
  }

  instaPay(value){
    // this.instaPayAccount = !this.instaPayAccount ;
    switch(value){
      case 'open':
        $('#account').slideToggle();
        $('#account').parent().toggleClass('active')
      break ;

      case 'close' :
        this.instaPayAccount = false ;
        $('#account').slideToggle();
        $('#account').parent().toggleClass('')
      break ;

      case 'closeInstaPay' :
        this.instaPayAccount = false ;
        break;

      case 'user' :
        this.instaPayAccount = true ;
        if(this.oldRecord.accNumber){
          this.instaPayForm.patchValue({
            accNumber: this.oldRecord.accNumber,
            confirmAccountNumber: this.oldRecord.confirmAccountNumber,
            IFSCCode: this.oldRecord.IFSCCode,
            custname: this.oldRecord.custname,
          });
          if(this.oldRecord.IFSCCode != "" ) this.onCheckIFSCAvailability();
        }
        else{
          this.instaPayForm.reset();
          this.transfertype = 'within'
        }
      break ;

      case 'instaProceed' :
        if(this.instaPayForm.valid) {
          this.instaAccountForm.patchValue({
            "chooseAccount" : this.selectedAccount
          });
          this.instaPayToUserData = this.instaPayForm.value.accNumber ;
          console.log('Insta Pay to user account number :: ', this.instaPayToUserData);
          this.instaPayAccount = false ;
          this.oldRecord = this.instaPayForm.value;
          console.log(this.instaPayForm.value);
        }else {
          this.validateForm();
          console.log('failed');
        }
      break;
    }

  }

  accountNo(formGroup: FormGroup) {
    const { value: payeeAccNo } = formGroup.get('accNumber');
    const { value: payeeCnfAccNo } = formGroup.get('confirmAccountNumber');
    return payeeAccNo === payeeCnfAccNo ? null : { accountNotMatch: true };
  }

  validateForm() {
    if(this.instaAccountForm.invalid) {
      this.instaAccountForm.get('chooseAccount').markAsTouched();
      this.instaAccountForm.get('amount').markAsTouched();
      this.instaAccountForm.get('remark').markAsTouched();
    }

    if(this.instaPayForm.invalid) {
      this.instaPayForm.get('accNumber').markAsTouched();
      this.instaPayForm.get('confirmAccountNumber').markAsTouched();
      this.instaPayForm.get('IFSCCode').markAsTouched();
    }
  }

  selectAccountInsta(account){
    console.log(JSON.stringify(account));
    this.accountInsta = account.sbAccount ;
    console.log('selected account number: ', event);
    this.selectedAccount = account.accountNo;
    this.instaAccountForm.patchValue({
      "chooseAccount" : this.selectedAccount
    })
  }

  onTabChange(type) {
    if(type == 'instaPay') {
      this.instaPayForm.reset();
    }
  }

  onCheckIFSCAvailability() {

    if(this.instaPayForm.get('IFSCCode').valid) {
      this.ifscCheckFlag = true;
      // this.instaPayForm.patchValue({
      //   'IFSCCode' : this.instaPayForm.value.IFSCCode.toUpperCase()
      // })
      if(this.selectedAccount != '') {
        if(this.instaPayForm.get('accNumber').valid) {
          this.getNameInquiryAccountIFSCList();
        }
        else {
          this.instaPayForm.get('accNumber').markAsTouched();
        }
      }
      else {
        showToastMessage('Please select from account number');
        return;
      }
    }
    else {
      this.instaPayForm.get('IFSCCode').markAsTouched();
    }
  }

  getNameInquiryAccountIFSCList(){

    var param = this.addPayeeService.getBranchFromIFSC(
      this.instaPayForm.value.IFSCCode
    );
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_GETIMPSMASTERBYIFSC
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          this.ifscDtl = data.set.records[0];
          this.bankAddress = data.set.records[0].bank + "," + data.set.records[0].city + "," + data.set.records[0].cust_address;
          if (data.hasOwnProperty('set')) {
            this.isValidIFSC = true;
          }
        } else {
          this.validmsg = 'Invalid IFSC Code'
          this.isValidIFSC = false;
          this.instaPayForm.patchValue({
            ifsc : ''
          })
          // this.bankAddress = ''
        }
      });

    // var param = this.dashboardService.getNameInquiryAccountIFSC(this.instaPayForm.value , this.selectedAccount);
    // this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_NAMEINQUIRYACCOUNTIFSC).subscribe(data => {
    //   console.log(data);
    //   var resp = data.responseParameter
    //   if (resp.opstatus == "00") {

    //     // this.instaPayForm.patchValue({
    //     //   payeeName: resp.npciPayeeName,
    //     // });

    //   }
    //   else {
    //     this.errorCallBack(data.subActionId, resp);
    //   }
    // })

  }
  onConfirmAccountChange(number , from) {

    if(this.instaPayForm.hasError("accountNotMatch")){
      this.instaPayForm.patchValue({
        custname : ''
      })
      return;
    }

    if (number.length == 14 || number.length == 30) {

      var param = this.instantPayService.validatePayee(this.instaPayForm.value);


      this.http
        .callBankingAPIService(
          param,
          this.storage.getLocalStorage(this.constant.storage_deviceId),
          this.constant.serviceName_ACCOUNTNAME
        )
        .subscribe((data) => {
          console.log(data);
          var resp = data.responseParameter;
          if (resp.opstatus == '00') {

                this.instaPayForm.patchValue({
                  custname : data.set.records[0].accountName
                })
             this.instapayerror =""

          } else {
            this.instaPayForm.patchValue({
              custname : ''

            })
            this.errorCallBack(data.subActionId, resp);
            this.instapayerror =   data.responseParameter.Result
          }
        });

      // this.accountindex = this.accountList.findIndex(x => x.accountNo == number);
      // this.payeeIndex = this.payeeList.findIndex(x => x.beneficiary_account_no == number);
    // if(this.accountindex == -1 && this.payeeIndex == -1){
    //   this.invalidAccount = false;
    // }else{
    //   this.invalidAccount = true;
    // }

  }
  else{
    this.instapayerror =""
  }
}
  onInstaPaySubmit() {
    if(this.exceedMinAmt==true)
    return
    console.log("Formm :: ", this.instaAccountForm)
    if(this.instaPayToUserData == ''){
      this.instapayAccSelected = true
    }else{
      this.instapayAccSelected = false
    }
    if (this.instaAccountForm.valid && this.instaPayToUserData != '' ) {

      if(!this.isValidIFSC && this.transfertype == 'outside'){
        return
      }
      this.dataService.resetTransactionObj();
      var param;
      if(this.transfertype == 'within'){//if(this.instaPayForm.value.IFSCCode.toLowerCase().indexOf('psib') != -1){
        param = this.dashboardService.getFundTransferParam( this.instaPayForm.value, this.instaAccountForm.value, 'within' );

        this.dataService.transactionReceiptObj.from_acc = this.instaAccountForm.value.chooseAccount;
        this.dataService.transactionReceiptObj.to_acc = this.instaPayForm.value.accNumber;
        this.dataService.transactionReceiptObj.payee_name = this.instaPayForm.value.custname;
        // .trim().replace(/[^0-9]+/g, '')
        this.dataService.transactionReceiptObj.amount = this.instaAccountForm.value.amount;
        this.dataService.transactionReceiptObj.remarks = this.instaAccountForm.value.remark ? this.instaAccountForm.value.remark : "-";
        this.dataService.endPoint = this.constant.serviceName_TRANSFERTRANSACTION;
        this.dataService.screenType = 'fundTransfer';
      }
      else{

        param = this.dashboardService.getIFSCFundTransferParam(this.instaPayForm.value, this.instaAccountForm.value, this.instaPayToUserData);

        this.dataService.transactionReceiptObj.from_acc = this.instaAccountForm.value.chooseAccount;
        this.dataService.transactionReceiptObj.to_acc = this.instaPayForm.value.accNumber;
        this.dataService.transactionReceiptObj.payee_name = this.instaPayForm.value.custname;
        //this.dataService.transactionReceiptObj.payee_name = this.dataService.userName;
        //console.log(this.dataService.userName);
        //console.log(this.instaPayForm.value.custname);
        this.dataService.transactionReceiptObj.amount = this.instaAccountForm.value.amount;
        this.dataService.transactionReceiptObj.ifscCode = this.ifscDtl.IFSC;
        this.dataService.transactionReceiptObj.benificaryBankName = this.ifscDtl.bank;
        this.dataService.transactionReceiptObj.modeOfTransfer = "IMPS";

        this.dataService.transactionReceiptObj.remarks = this.instaAccountForm.value.remark ? this.instaAccountForm.value.remark : "-";
        this.dataService.endPoint = this.constant.serviceName_PAYERTOPAYEEUSINGIFSCACCOUNTNUMBER;
        this.dataService.screenType = 'instaPay';
      }

      this.dataService.authorizeHeader = "INSTA MONEY";
      this.dataService.screenType = 'instaPay';
      this.dataService.request = param;
      this.dataService.transactionReceiptObj.date = new Date().toISOString();
      var objCheckFlag = this.dataService.activitySettingData.findIndex(x => x.ACTIVITYNAME == this.dataService.endPoint.split('/')[1]);
        //  if(this.DataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y') {

        //  }
      this.dataService.otpSessionPreviousPage = "/dashboard";

      this.router.navigate(['/otpSession']);
    } else {
      this.validateForm()
    }
  }

    /**
   * set update currency value
   * @param value
   */
     formatCurrency(value, type) {
      let amt = this.customCurrencyPipe
        .transform(value, 'decimal')
        .replace(/[^.0-9]+/g, '');
        this.formValidation.formatCurrency(value, this.instaAccountForm);

        if(parseFloat(amt.trim().replace(/[^.0-9]+/g, '')) > 10000){
          this.exceedMinAmt = true;
        }
        else{
          this.exceedMinAmt = false;
        }
    }


    /**
   * Fetch VPA Address List
   */
   fetchVPAAdressList() {
    if (this.dataService.vpaAddressList.length == 0) {
      // this.upiDashboardService.getUserLocation();
      var param = this.upiDashboardService.getVPAAddressListAPICall();
      let deviceId = this.storage.getLocalStorage(this.constant.storage_deviceId)
      this.UpiApiCall(param, deviceId)
    }
  }

  UpiApiCall(request, deviceId) {
    this.http.callBankingAPIService(request, deviceId, this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      console.log("UPI Login API Success");
      let response = data.responseParameter.upiResponse;
      console.log(response);
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS:
            console.log("GETPAYMENTADDRESSLISTDETAILS => ", response);
            this.dataService.vpaAddressList = this.dataService.processVPAlist(response.responseParameter.addresslist);
            console.log('this.DataService.vpaAddressList', JSON.stringify(this.dataService.vpaAddressList));
            // this.dataService.omniUPIFlow = false;
            break;
          default:
            break;
        }
      } else {

      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  getNotificationApiCall() {
    var param = this.notificationServicemob.getNotificationParam();
    let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
    this.http.callBankingAPIService(param, deviceID, this.constant.serviceName_NOTIFICATIONS).subscribe(data => {
      console.log(data);

      var resp = data.responseParameter

      if (resp.opstatus == "00") {
        this.dataService.notificationBadge = resp.totalListCount
      }
    });
  }
}
