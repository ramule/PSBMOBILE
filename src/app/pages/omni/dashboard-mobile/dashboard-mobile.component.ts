import { AfterViewInit,NgZone , Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { pageLoaderService } from '../../../services/pageloader.service';
import { HttpRestApiService } from '../../../services/http-rest-api.service';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { CommonMethods } from '../../../utilities/common-methods';
import { AppConstants } from '../../../app.constant';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { DashboardMobileService } from './dashboard-mobile.service';
import { LocationStrategy } from '@angular/common';
import { DatePipe, Location } from '@angular/common';
import { ProfileDetailsService } from '../profile/profile-details/profile-details.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DetailStatementService } from '../my-accounts/detailed-statement/detailed-statement.service';
import { AccountType } from '../../../utilities/app-enum';
import * as Chart from 'chart.js'
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { Idle } from '@ng-idle/core';
import { UpiDashboardService } from '../../upi/dashboard/upi-dashboard.service';
import { PluginService } from '../../../../app/services/plugin-service';
import { NotificationService } from '../notification/notification.service';

declare function vartualKeybord(vartualPass, keyBoardDiv): any;
declare var showToastMessage: any;
declare var $: any;
declare var cordova:any;
declare var imgCarousel : any ;

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-mobile.component.html',
  styleUrls: ['./dashboard-mobile.component.scss']
})
export class DashboardMobileComponent implements OnInit,AfterViewInit {
  // custAccountList = [];
  // accountList: any = [];
  // transactionList: any = [];
  // nonDisplayMenu: any = [];
  // dashBoardMenu: any = [];
  // viewMoreTransac: boolean = true;
  // viewMoreCredit: boolean = true;
  // Showcondition: boolean = false;
  // creditCardList = [];
  // frequentTransactionList = [];
  // frequentTransactionColor = ['green1', 'grey1', 'red1', 'greenlight', 'yellow'];
   accountCarouselOptionsMobile: OwlOptions;
   dashboardMobileServices: OwlOptions;
  // recommendedCardCarouselOptions :OwlOptions
  // activeSlides: SlidesOutputData;
  // canvasDonot: any;
  // ctxDonot: any;
  // totalAsset: any;
  // totalLiablities: any;
  // totalWorth: any;
  // commonPageComponent = {
  //   'headerType': 'innerHeader',
  //   'sidebarNAv': 'OmniNAv',
  //   'footer': 'innerFooter',
  //   'currentpageRoute': '/dashboard'
  // }
  notificationList: any = [];

  bankingServices: any = [];
  paymentRecharge: any = [];
  investement: any = [];

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
  activeSlides: SlidesOutputData;
  canvasDonot: any;
  ctxDonot: any;
  totalAsset: any;
  totalLiablities: any;
  totalWorth: any = 0;
  refreshedTime:any;
  checkLocationPermissions = true;

  commonPageComponent = {
    'headerType': '',
    'sidebarNAv': 'OmniNAv',
    // 'footer': 'innerFooter',
    'currentpageRoute': '/dashboardMobile',
    'footertype': 'omniDashboardFooter'
  }

  accountDetails: any;
  index: any;
  userName: any;

  //feilds for card
  totalSavingAcc: any = '00';
  totalSavingAmt: any = 0;
  totalDepositeAcc: any = '00';
  totalDepositeAmt: any = 0;
  totalBorrowingAcc: any = '00';
  totalBorrowingAmt: any = 0;
  investProducts:any;
  recommendedCard:any;
  myBrowsingShow: boolean = false;
  myDepositShow: boolean = false;
  mySavingShow: boolean = false;


  totalSavingMaskedAmt:any;
  totalDepositeMaskedAmt:any;
  totalBorrowingMaskedAmt:any;

  getFrequentTransactionss:any =[];
  recommendedOffer:any



  constructor(
    // private router: Router,
    // public dataService: DataService,
    // public loader: pageLoaderService,
    // private http: HttpRestApiService,
    // public commonMethod: CommonMethods,
     private dashboardMobileService: DashboardMobileService,
     private upiDashboardService : UpiDashboardService,
    // private constant: AppConstants,
    // private storage: LocalStorageService,
    // private locationStrategy: LocationStrategy,
    // private idle: Idle
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
    private plugin : PluginService,
    private notificationServicemob : NotificationService,
    private ngZone: NgZone,

  ) {

  }

  ngOnInit(): void {
    this.ngZone.run(() => {
      if(this.dataService.bezellessIphone) {
        $("#mainDiv").removeClass("pre-login");
      }
    });
    this.dataService.quickAccessFromDashboard = false
      console.log("data initialization started");
  }


   initialization() {
    imgCarousel() ;
    this.accountCarouselOptionsMobile = this.dataService.getAccountCarouselOptionsMobile();
    this.dashboardMobileServices = this.dataService.getDashboardMobileServices();
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)
    this.dataService.changeMessage(this.commonPageComponent);
    //this.initializeEvents();
    this.dataService.omniUPIFlow = true;
    this.totalSavingAcc = this.dataService.customerOperativeAccList.length < 10 ? '0' + this.dataService.customerOperativeAccList.length : this.dataService.customerOperativeAccList.length;
    this.totalDepositeAcc = this.dataService.customerMyDepostie.length < 10 ? '0' + this.dataService.customerMyDepostie.length : this.dataService.customerMyDepostie.length;
    this.totalBorrowingAcc = this.dataService.customerBorrowingsList.length < 10 ? '0' + this.dataService.customerBorrowingsList.length : this.dataService.customerBorrowingsList.length;
    this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.dataService.timeFormat);
    this.idle.watch();
    this.recommendedCardCarouselOptions = this.dataService.getrecommendedCardCarouselOptions();
    var cardParam = this.dashboardMobileService.getOfferCradsparam('Cards');
    this.getOfferCardList(cardParam)
    this.accountList = this.dataService.customerAccountList;
    this.accountCarouselOptions = this.dataService.getAccountCarouselOptions();
    this.customizeMenuCarouselOptions = this.dataService.getCustomizeMenuCarouselOptions();
    this.investCarouselOptions = this.dataService.getinvestCarouselOptions();
   
    //TODO:Need to modify with respect to edit profile
    this.userName = this.dataService.userDetails?.customerName;
    console.log("completed after init event =======>");
    this.dataService.recentTransData = {}; 
  }

  ngAfterViewInit(){
    this.initialization();
    console.log("ngAfterViewInit started =======>");
    this.loadAfterInit();
  }


  loadAfterInit() {
    //Api call for Invest with Us
    let dashboardCustomizeMenuArrTemp;
    if (this.dataService.dashboardCustomizeMenuArr.length == 0) {
      this.getUserCustomizeMenu();
    }
    else {
      // dashboardCustomizeMenuArrTemp = this.dataService.dashboardCustomizeMenuArr
      // for (let i = 0; i < this.dataService.dashboardCustomizeMenuArr.length; i++) {
      //   dashboardCustomizeMenuArrTemp[i]['menuNameValue'] = (dashboardCustomizeMenuArrTemp[i]['menuName']).replaceAll("-", ' ')
        
      //   console.log("data :: ", dashboardCustomizeMenuArrTemp[i]['menuNameValue'])

      //   switch(dashboardCustomizeMenuArrTemp[i]['menuNameValue']){
      //     case 'gov schemes':
      //       dashboardCustomizeMenuArrTemp[i]['menuNameValue'] = 'Government Schemes'
      //     break ;

      //     case 'asba ipo' :
      //       dashboardCustomizeMenuArrTemp[i]['menuNameValue'] = 'ASBA/IPO'
      //     break ;

      //     case 'open fd rd' :
      //       dashboardCustomizeMenuArrTemp[i]['menuNameValue'] = 'Open FD/RD'
      //     break ;
      //   }
      // }
      this.dataService.dashboardCustomizeMenuArr.forEach(el => {
      // dashboardCustomizeMenuArrTemp.forEach(el => { 
        el.URL = el.URL == "null" ? el.menuName : el.URL;

        if (el.type == 'BANKING_SERVICES') {
          this.bankingServices.push(el);
        }
        else if (el.type == 'PAYMENT_RECHARGES') {
          this.paymentRecharge.push(el);
        }
        else if (el.type == 'INVESTMENTS') {
          this.investement.push(el);
        }
      });
    }
    console.log("BANKING_SERVICES LL : ", this.bankingServices)

    console.log("PAYMENT_RECHARGES LL : ", this.paymentRecharge)


    console.log("Investment LL : ", this.investement)
    //webLastLogin
    if (this.storage.hasKeySessionStorage("isLoggedIn")) {
      // Amount of all account
    this.totalSavingAmt = this.customCurrencyPipe.transform(this.dataService.totalMyOperativeBalance.toString().trim(), 'symbol');
    this.totalSavingMaskedAmt = this.commonMethod._maskBalance(this.totalSavingAmt);
    this.totalDepositeAmt = this.customCurrencyPipe.transform(this.dataService.totalMyDepositBalance.toString().trim(), 'symbol');
    this.totalDepositeMaskedAmt = this.commonMethod._maskBalance(this.totalDepositeAmt);
    this.totalBorrowingAmt = this.customCurrencyPipe.transform(this.dataService.totalMyBorrowingsBalance.toString().trim(), 'symbol');
    this.totalBorrowingMaskedAmt = this.commonMethod._maskBalance(this.totalBorrowingAmt);
    let _totalWorth :any = this.dataService.totalMyOperativeBalance + this.dataService.totalMyDepositBalance + this.dataService.totalMyBorrowingsBalance;
    var totalBal = this.dataService.totalMyOperativeBalance + this.dataService.totalMyDepositBalance;
    if(totalBal >= (-this.dataService.totalMyBorrowingsBalance)){
      this.totalWorth = this.customCurrencyPipe.transform(_totalWorth.toString().trim(), 'decimal');
    }else{
      this.totalWorth = " -" + this.customCurrencyPipe.transform(_totalWorth.toString().trim(), 'decimal');
    }
    this.dataService.showDetails = true;

      if(!this.dataService.fistTimeLoad){
        var self = this;
        setTimeout(function(){
          self.dataService.fistTimeLoad = true;
          let getParam = self.dashboardService.getInvestWithUsparam();
          self.getInvestWithUs(getParam);
          self.selectedAccoutNo(self.dataService.customerAccountList[0]?.accountNo);
          self.getProfileDtl();
          self.fetchVPAAdressList();
        },300);
      }
      this.getFrequentTransactions();

    } else {
      this.router.navigateByUrl('/loginMobile');
    }
  }

  /**
   * function to fetch profile Dtl and set profile Image
   * @accountNumber
   */
  getProfileDtl(){
    let param = this.profileDtlsService.getProfileDetailsParam();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CUSTPROFILEDETAILS).subscribe(data => {
      console.log("data  " + JSON.stringify(data));
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        var responseData = data.listofDataset[0].records;
        this.dataService.profiledateDetails= responseData;
        this.dataService.omniProfileName = resp.userName;
        this.dataService.profileName = this.dataService.omniProfileName;
        this.dataService.profileDetails = responseData;
        this.dataService.userName = responseData[0].custName;
        this.storage.setLocalStorage(this.constant.storage_username, resp.userName);

        if (resp?.base64Image != "")
          this.dataService.profileImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + resp?.base64Image);
        else
          this.dataService.profileImage = ""

        //get state and city code
        this.dataService.custProfileStateCityObj.state = data.responseParameter.stateCode;
        if(data.responseParameter.cityCode.includes('(')) {
          this.dataService.custProfileStateCityObj.city = data.responseParameter.cityCode.split('(')[0];
        }
        else {
          this.dataService.custProfileStateCityObj.city = data.responseParameter.cityCode;
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  /**
   * function called when account no is selected
   * @accountNumber
   */
  selectedAccoutNo(accountNumber) {
    var transactionParam = this.dashboardService.getTransactionParam();
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

        this.totalSavingAmt = this.customCurrencyPipe.transform(this.dataService.totalMyOperativeBalance.toString().trim(), 'symbol');
        this.totalSavingMaskedAmt = this.commonMethod._maskBalance(this.totalSavingAmt);
        this.totalDepositeAmt = this.customCurrencyPipe.transform(this.dataService.totalMyDepositBalance.toString().trim(), 'symbol');
        this.totalDepositeMaskedAmt = this.commonMethod._maskBalance(this.totalDepositeAmt);
        this.totalBorrowingAmt = this.customCurrencyPipe.transform(this.dataService.totalMyBorrowingsBalance.toString().trim(), 'symbol');
        this.totalBorrowingMaskedAmt = this.commonMethod._maskBalance(this.totalBorrowingAmt);

        let _totalWorth :any = this.dataService.totalMyOperativeBalance + this.dataService.totalMyDepositBalance + this.dataService.totalMyBorrowingsBalance;
        this.totalWorth = _totalWorth;
        this.getAccountList();
        // this.accountList =
      }
      else {

      }
    });

  }

  transactiondetails(data){
    console.log(JSON.stringify(data))
    this.dataService.recentTransData = data;
    this.router.navigate(['/sendMoney']);
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
  getUserCustomizeMenu() {
    var param = this.dashboardService.getCustomizeMenuParam();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CUSTOMIZEMENU).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log("CustomizeMenu" + JSON.stringify(data.set.records));

        data.set.records.forEach((element) => {
         // if ( element.Status == "Active" && !this.nonDisplayMenu.includes(element.menuName))
         if ( element.Status == "Active")
            console.log('valid customize menus: ', element);
            this.dataService.dashboardCustomizeMenuArr.push(element);
        });

        this.dataService.dashboardCustomizeMenuArr.forEach(el => {
           if(el.type == 'BANKING_SERVICES'){
            this.bankingServices.push(el);
           }
           else if(el.type == 'PAYMENT_RECHARGES'){
            this.paymentRecharge.push(el);
           }
           else if(el.type == 'INVESTMENTS'){
            this.investement.push(el);
           }
         });

         console.log("banking services",this.bankingServices);
         console.log("payment and Recharge",this.paymentRecharge);
         console.log("investement",this.investement);
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
   * To get Account List this function is invoked
   */
  getAccountList() {
    this.totalSavingAcc = this.dataService.customerOperativeAccList.length < 10 ? '0' + this.dataService.customerOperativeAccList.length : this.dataService.customerOperativeAccList.length;
    this.totalDepositeAcc = this.dataService.customerMyDepostie.length < 10 ? '0' + this.dataService.customerMyDepostie.length : this.dataService.customerMyDepostie.length;
    this.totalBorrowingAcc = this.dataService.customerBorrowingsList.length < 10 ? '0' + this.dataService.customerBorrowingsList.length : this.dataService.customerBorrowingsList.length;
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
      showToastMessage(resp.Result, "error");
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

    this.canvasDonot = document.getElementById('donut-chart');
    this.ctxDonot = this.canvasDonot.getContext('2d');
    let myChart = new Chart(this.ctxDonot, {
      type: 'doughnut',
      data: {
        labels: [
          'Total Assets',
          'Total Liabilities',
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
        if (data.set !== undefined && data.set !== undefined && data.set.records !== undefined) {
          //this.dataService.frequentTransact = data.set.records;
          data.set.records.forEach(el => {
            var dtl = {
              "benefName": el.benefName,
              "color": this.frequentTransactionColor[Math.floor(Math.random() * 3) + 1]
            }
            this.frequentTransactionList.push(dtl);
          });
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
  // getRecommededCard() {
  //    var param = this.dashboardMobileService.getRecommendedCard();
  //   this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_RECOMMENDEDCARDS).subscribe(data => {
  //     console.log(data);
  //     var resp = data.responseParameter;
  //     if (resp.opstatus == "00") {
  //       console.log(data.responseParameter);
  //       this.recommendedCard = data.set.records;
  //       console.log('Recommended Cards: ', this.recommendedCard);
  //     }
  //     else {
  //       this.errorCallBack(data.subActionId, resp);

  //     }
  //   });
  // }


  /**
  * api call to invest with list
  * @Param get request in encrypted format
  */
  getInvestWithUs(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_INVESTMENTPRODUCT).subscribe(data => {
      console.log('getInvestWithUs ',data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.investProducts = data.set.records;
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
      //  getOfferList(param) {
      //   this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETOFFERS).subscribe(data => {
      //     console.log(data);
      //     var resp = data.responseParameter;
      //     if (resp.opstatus == "00") {
      //       console.log(data.responseParameter);
      //       this.recommendedOffer = data.set.records;
      //       console.log('recommended offers: ', this.recommendedOffer);
      //     }
      //     else {
      //       this.errorCallBack(data.subActionId, resp);

      //     }
      //   });
      // }

  closeTransferPopup() {
    this.Showcondition = false
  }

  transferRoute(path) {
    this.router.navigateByUrl(path);
  }
  goToPageInvestment(e){
    console.log('investment log : ', e.menuName)
    if(e.URL == "gov-schemes" || e.URL =='asba-ipo' || e.URL == "insurance" || e.URL == 'gold-bonds'){
      return;
    }
    if(e.menuName == 'open-fd-rd'){
      this.router.navigateByUrl('/openDeposit');
      return;
    } 
    
    if(e.URL && e.URL == "null" ){
      return ;
    } else{
      if(e.URL == 'mobSocialLanding'){
        this.dataService.socialSecFromDashboard = true;
      }
      this.router.navigateByUrl(e.URL);
    }
  }
  goToPage(e) {
    
    console.log(e);

    if( e.URL == 'etoken' || e.URL == 'cardless-cash' || e.URL == 'e-mandate' || e.URL == 'e-tokenization' || e.URL == 'mobServiceLanding' || e.URL == 'schedule-pay' || e.URL == 'transactionStatus' || e.URL == 'pending-bill' ){
      return ;
    }

    if(e.menuName == 'create-si'){
      this.router.navigateByUrl('standingInstructionList');
      return;
    }

    //this.loader.showLoader();
    if(e.URL && e.URL != "null" ){
      if(e.URL == 'myAccount'){
        if(this.constant.getPlatform() != "web" ){
          this.router.navigateByUrl('/myAccountMobile')
        }else{
          this.router.navigateByUrl(e.URL)
        }
      }else if(e.URL == 'Login'){
        return;
      }else{
        if(e.URL == 'mobSocialLanding'){
          this.dataService.socialSecFromDashboard = true;
        }
        this.router.navigateByUrl(e.URL);
      }
    }
  }

  // gotoMyaccount(){
  //   this.router.navigateByUrl('/myAccount');
  // }


  // goToRoutePage(route){

  //    this.router.navigateByUrl(route);
  //   console.log(route)
  //   if( route == '/myBorrowings'){
  //     showToastMessage("Coming soon", "success");
  //   }
  //   else{
  //     this.router.navigateByUrl(route);
  //   }
  // }


  goToRoutePage(route){
    if(route == '/instantPay'){
      this.dataService.fromInstaPay = true;
    }
    this.router.navigateByUrl(route);
  }

  navigateToUPIFlow(){
    this.dataService.omniUPIFlow = true;
    this.router.navigateByUrl('upiDashboard');
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

  // getFrequentTransactions() {
  //   var param = this.dashboardMobileService.getFrequentTransactionParam();
  //   console.log('get Frequesnt Transaction  params: ', param);
  //   this.http
  //     .callBankingAPIService(
  //       param,
  //       this.storage.getLocalStorage('deviceId'),
  //       this.constant.serviceName_FREQUENTTRANS
  //     )
  //     .subscribe((data) => {
  //       console.log(data);

  //       let getFrequentTransactionParam = data.listofDataset['records'];
  //       console.log('getFrequentTransactionParam :: ', getFrequentTransactionParam);

  //       var resp = data.responseParameter;
  //       if (resp.opstatus == '00') {

  //       } else {
  //         // this.errorCallBack(data.subActionId, resp);
  //       }
  //     });
  // }

  getOfferCardList(param) {
    // var param = this.dashboardMobileService.getOfferCradsparam(param);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETOFFERS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.recommendedCard = data.set.records;
        console.log('Get offer card list: ', this.recommendedCard);
      }
      else {
        this.errorCallBack(data.subActionId, resp);

      }
    });
  }

  getFrequentTransactions() {
    var param = this.dashboardMobileService.getFrequentTransactionParam();

    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_FREQUENTTRANS
      )
      .subscribe((data) => {
        // console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
        console.log('get Frequesnt Transaction  params: ', data);
        if(data.hasOwnProperty('listofDataset')){
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
                'accNo': el.accountNo,
                "fromAccNumber": el.fromAccNumber,
                "toAccNumber": el.toAccNumber,
                "beneficiary_bank_name": el.beneficiary_bank_name,
                "ifsc_code": el.ifsc_code,
                "transactionType" : el.RechargeType
              }
              this.getFrequentTransactionss.push(dtl);
  
            });
  
            this.getFrequentTransactionss = this.dataService.getRecentTransactionList(this.getFrequentTransactionss) ;
            console.log("Frequest List :: == > ", this.getFrequentTransactionss)
          }
          // this.getFrequentTransactionss = this.dataService.getRecentTransactionList(data.listofDataset['records']);
          // this.getFrequentTransactionss = this.dataService.getRecentTransactionList(this.getFrequentTransactionss)
          console.log('getFrequentTransactionss :: ', this.getFrequentTransactionss);
          this.dataService.omniAllRecentPayeeList = this.getFrequentTransactionss;
        }else{
          this.getFrequentTransactionss = [];
          this.dataService.omniAllRecentPayeeList  = []
        }
         
        } else {
          // this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  goToAccountDetails(){
    this.router.navigateByUrl('/myAccountMobile')
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

  openRecentPayeeList(){
    this.router.navigateByUrl('/omniAllRecentPayeeMob')
  }

  initializeEvents() {
    if (this.dataService.isCordovaAvailable) {
      if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
        if (!this.dataService.isLatLongFetched) {
          this.checkIfLocationEnabled();
        }
      } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
        this.checkLocationPermission();
      }
    }
    document.addEventListener("resume", this.onResume.bind(this), false);
  }

  onResume() {
    console.log("OnResume called...");
    if (this.checkLocationPermissions && !this.dataService.isLatLongFetched) {
      this.commonMethod.closePopup('div.popup-bottom.location-permission-denied')
      this.checkIfLocationEnabled();
    }
  }


  checkIfLocationEnabled() {
    // this.loader.showLoader();
    console.log("checkIfLocationEnabled");
    cordova.plugins.diagnostic.requestLocationAuthorization((status) => {
      this.checkLocationPermissions = false;
      switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
          this.proceedToCheckLocationAccurracy()
          break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
          this.commonMethod.openPopup('div.popup-bottom.location-permission-denied', true)
          break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
          console.log("Permission permanently denied");
          this.commonMethod.openPopup('div.popup-bottom.location-permission-denied', true)
          break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
          console.log("Permission granted always");
          this.proceedToCheckLocationAccurracy()
          break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
          console.log("Permission granted only when in use");
          this.proceedToCheckLocationAccurracy()
          break;
      }
    }, function (error) {
      console.error(error);
    }, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);
  }

  proceedToCheckLocationAccurracy() {
    cordova.plugins.locationAccuracy.canRequest((canRequest) => {
      if (canRequest) {
        cordova.plugins.locationAccuracy.request((success) => {
          console.log("Successfully requested accuracy: " + success.message);
          this.loader.showLoader();
          this.checkLocationPermission();
        }, (error) => {
          console.error("Accuracy request failed: error code=" + error.code + "; error message=" + error.message);
          if (error.code == cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
            //  if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
            // cordova.plugins.diagnostic.switchToLocationSettings();
            //  }
            this.commonMethod.openPopup('div.popup-bottom.location-permission-denied', true)
          }
        }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);

      } else {
        // this.showPopup('location-permission-denied');
        //   
        // request location permission and try again
      }
    });
  }

  checkLocationPermission() {
    console.log('this.DataService.isLatLongFetched', this.dataService.isLatLongFetched);
    let self = this;
    if (!this.dataService.isLatLongFetched) {
      cordova.plugins.diagnostic.getLocationAuthorizationStatus(function(status){
        switch(status){
            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                console.log("Permission not requested");
                self.requestLocationAuthorizationIos();
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                console.log("Permission denied");
                self.commonMethod.openPopup('div.popup-bottom.location-permission-denied', true)
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                console.log("Permission granted always");
                self.getCurrentLocationIos();
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                console.log("Permission granted only when in use");
                self.getCurrentLocationIos();
                break;
        }
     }, function(error){
         console.error("The following error occurred: "+error);
     });
    } else {
      // if(!this.DataService.cameraPermissionGrantedIos) {
      //   this.getCameraPermissionIos();
      // }
    }
  }

  requestLocationAuthorizationIos() {
    let self = this;
    cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
        switch(status){
            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                console.log("Permission not requested");
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                console.log("Permission denied");
                self.commonMethod.openPopup('div.popup-bottom.location-permission-denied', true)
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                console.log("Permission granted always");
                self.getCurrentLocationIos();
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                console.log("Permission granted only when in use");
                self.getCurrentLocationIos();
                break;
        }
    }, function(error){
        console.error(error);
    }, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);
  }

  getCurrentLocationIos() {
    this.dataService.getCurrentLatLong().subscribe((data) => {
        console.log("location success");
        if (data) {
          this.loader.hideLoader();
          this.dataService.isLatLongFetched = true;
        }
        else {
          this.loader.hideLoader();
        }
      }, err => {
        this.loader.hideLoader();
        console.log('GeoLocation Plugin => getCurrentLatLong Error => ', err);
      });
      // this.getCameraPermissionIos();
  }
  
  goToSettings() {
    this.checkLocationPermissions = true;
    this.commonMethod.closePopup('div.popup-bottom.location-permission-denied');
    console.log("Opening native settings for location...");
    this.plugin.gotoSetting().subscribe((status) => {
      console.log("gotoSetting=====>", status);
    }, (err) => {
      console.log("gotoSetting error", err);
    });
  }

  closePopup(popupName) { 
    this.commonMethod.closePopup(popupName);
  }

  
  menuClick() {
    this.dataService.getAccountCarouselOptions();
    this.dataService.getCustomizeMenuCarouselOptions();
    this.dataService.getinvestCarouselOptions();
  }

  
  openProfile() {
    this.router.navigateByUrl("/profileDetails");
  }

  routePage(routeName) {
    this.dataService.routefrom = 'dashboard';
    this.router.navigateByUrl(routeName);
  }

  
  getNotification() {
    if(this.dataService.isCordovaAvailable && this.dataService.omniUPIFlow){
      this.router.navigateByUrl('/commonNotification')
    }else{
      var param = this.notificationServicemob.getNotificationParam();
      let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
      this.getNotificationApiCall(param, deviceID)
    }

  }

  getNotificationApiCall(param, deviceID) {
    this.http.callBankingAPIService(param, deviceID, this.constant.serviceName_NOTIFICATIONS).subscribe(data => {
      console.log(data);

      var resp = data.responseParameter

      console.log("Notification List=====", this.notificationList);
      if (resp.opstatus == "00") {
        this.notificationList = data.set.records;
        this.dataService.notificationArray = data.set.records
        console.log(data.responseParameter);
        this.notificationList = data.set.records;
        this.dataService.notificationBadge = resp.totalListCount
        this.dataService.sendNotification(this.notificationList.toString());
        // var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey, resp.Session);
        // console.log('sessionKey', sessionKey);
      }
    });
  }

  goToMyAccount()
  {
    this.router.navigateByUrl('myAccountMobile')
  }

  
  showPopup(popupName) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName,true);
  }


  

}
