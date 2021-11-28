import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {MyChequeBookService} from './my-cheque-book.service'
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { Location } from '@angular/common';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { CommonMethods } from 'src/app/utilities/common-methods';

declare var showToastMessage: any;
@Component({
  selector: 'app-my-cheque-book',
  templateUrl: './my-cheque-book.component.html',
  styleUrls: ['./my-cheque-book.component.scss']
})
export class MyChequeBookComponent implements OnInit {

  constructor( private router:Router,
    public dataService: DataService,
    public MyChequeBookService: MyChequeBookService,
    private localStorage: LocalStorageService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private encryptDecryptService:EncryptDecryptService,
    public datePipe: DatePipe,
    private location: Location,
    public commonMethod: CommonMethods,
    ) { }


  accList:any;
  chequeNo:any;
  noofleaves:any;
  sessionDecryptKey: any;
  myChequeBookForm:FormGroup;
  formDate:any;
  toDate:any;
  selectedAccount:any = '';
  chequeHistory:any;
  chequeEndNumber:any;
  maxTo : Date = new Date();
  accountValue : any = '';
  minTo :Date = new Date();
  platfrom:any;
  selectedAccountDisplay:any;

  ngOnInit(): void {
    this.platfrom = this.constant.getPlatform()
    this.dataService.setPageSettings('MY_CHEQUE_BOOK');
    this.dataService.getBreadcrumb('MY_CHEQUE_BOOK' , this.router.url)
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);

    console.log('DataService.customerOperativeAccList: ', this.dataService.customerOperativeAccList);
    this.buildForm();

    this.accList = this.dataService.customerOperativeAccList;
    this.accList = this.accList.filter( (obj) =>(obj.accountType!='CAPPI' && obj.Status.toLowerCase()=='active'));
    var fromIndex = this.accList.findIndex(e => e.accountFlag == 'P');
    var element = this.accList[fromIndex];
    this.accList.splice(fromIndex, 1);
    this.accList.splice(0, 0, element);
    this.selectedAccount = this.accList[0].accountNo;
    this.selectedAccountDisplay = this.accList[0].SchemeCode +" "+this.accList[0].sbAccount


    var backUrl;
    if(this.dataService.previousPageUrl == "mobQuickAccessLanding"){
      backUrl = this.dataService.previousPageUrl;
    }
    else{
      backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile';
    }

    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

  }
  buildForm(){
    this.myChequeBookForm = new FormGroup({
      fromDate: new FormControl('',[Validators.required]),
      toDate: new FormControl('',[Validators.required]),

    });
}


submit(){
  if(this.myChequeBookForm.valid){
    console.log("form value and to value::::::::",this.myChequeBookForm.value);
    this. getAccountList();
   }
    else{
      this.validateForm();
    }
}
validateForm() {
    if (this.myChequeBookForm.invalid) {
      this.myChequeBookForm.get('fromDate').markAsTouched();
      this.myChequeBookForm.get('toDate').markAsTouched();
      return;
    }
  }


  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  onFromAccountSelect(event){
    this.selectedAccount = "";
    console.log(this.selectedAccount);
    this.selectedAccount = event;

    var SchemeCode = this.dataService.customerOperativeAccList.filter(obj => (obj.accountNo == this.selectedAccount))[0].SchemeCode;
    var accountNo = this.dataService.customerOperativeAccList.filter(obj => (obj.accountNo == this.selectedAccount))[0].sbAccount;
    var userDtl = SchemeCode +" "+accountNo; 
    this.selectedAccountDisplay = userDtl;
  }
  // onFromAccountSelect(valee){
  //   console.log('valee' + valee)
  //   this.getAccountList(valee);
  // }

  getAccountList() {
    let param = this.MyChequeBookService.getchekbookList(this.dataService.userDetails.cifNumber, this.selectedAccount,this.myChequeBookForm.value);
    //let deviceID=this.localStorage.getLocalStorage("deviceId");
    if(this.selectedAccount)
    this.getAccountListApiCall(param)
    else
    showToastMessage("Please select account", 'error');
  }

  getAccountListApiCall(param){
    this.http.callBankingAPIService(param,this.localStorage.getLocalStorage("deviceId"),this.constant.serviceName_CHEQUEHISTORYDETAILS).subscribe(data=>{
      console.log(data);
      var resp = data.responseParameter
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
          this.chequeHistory=data.set.records
          this.chequeEndNumber= this.chequeHistory.cheque_Number;
          console.log("ChequeHistory::",this.chequeEndNumber);
          var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey,resp.Session);
          console.log('sessionKey', sessionKey);

        }
        else
        this.chequeHistory = []
      });
    }

    onAccountSelectType() {
      if(window.innerWidth < 767) {
        this.commonMethod.openPopup('div.popup-bottom.sel-account');
      }
    }


  getToAccValue( accountNo){
    this.accountValue = accountNo
   }

   closePopup(){
     this.commonMethod.closeAllPopup() ;
   }

   onCancel() {
    if(this.constant.getIsCordova() == "web"){
      this.router.navigateByUrl('/dashboard');
    }
    else{
      this.location.back();
    }
  }

  }
