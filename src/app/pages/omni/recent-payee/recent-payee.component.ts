import { RecentPayeeService } from './recent-payee.service';
import { data } from 'jquery';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { DropDownMaster, AccountOpeningSteps } from '../../../utilities/app-enum';
import { DatePipe, Location } from '@angular/common'
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import * as moment from 'moment';
import { BenificiaryService } from '../../upi/benificiary/benificiary.service';
import {Subject, BehaviorSubject } from 'rxjs';
declare var showToastMessage: any;

@Component({
  selector: 'app-recent-payee',
  templateUrl: './recent-payee.component.html',
  styleUrls: ['./recent-payee.component.scss']
})
export class RecentPayeeComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private location: Location,
    private datePipe: DatePipe,
    private recentPayeeService: RecentPayeeService,
    private benificiaryService : BenificiaryService
  ) { }

  favoriteList: any = [];
  recentTransactionList = [];
  
  upifavoriteList: any = [];
  upirecentTransactionList = [];
  @Input() type ="";
  @Input() favoritePayee = true;
  @Output() payeeUpdate = new EventEmitter<any>();

  ngOnInit(): void {
    this.DataService.isPayeeSelected = false;
    
  }
  
  ngAfterViewInit(){
    this.getBenificiaryList();
    this.favorite();
    this.getFrequentTransaction();
  }

   /**
    * Get Recent & Favorite Collect Request List
    */
    getBenificiaryList() {
      this.benificiaryService.getBenificiaryList().then((response: any) => {
        this.DataService.benficiaryListData = response.recentBeneList;
        this.upirecentTransactionList = [];
        this.favoriteList = [];
        response.recentBeneList.map((benificiary, index) => {
          if (benificiary.txnMode == 'VPA') {
            this.upirecentTransactionList.push(benificiary);
            this.upirecentTransactionList = this.DataService.getContactListColour(this.upirecentTransactionList);
            if(this.constant.getPlatform() != "web"){
              this.upirecentTransactionList = this.upirecentTransactionList.slice(0, 7);
            }
          }
        });
        this.upifavoriteList =  this.DataService.getContactListColour(this.DataService.favPayeeList);
        // this.resetForm(this.activeTabName);
      });
    }


  favorite() {
    var param = this.recentPayeeService.getFavouritePayee();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceNmae_GETFAVORITETRANSACTIONS).subscribe((data) => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
          this.favoriteList = this.DataService.getContactListColour(data.set['records']);
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })

  }

  getFrequentTransaction() {
    let isMPIN = this.DataService.loginType == 'mpin';
    var frequentTransacParam = this.recentPayeeService.getFrequentTransacParam(isMPIN);
    this.http.callBankingAPIService(frequentTransacParam, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_FREQUENTTRANS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;

      if (resp.opstatus == "00") {
        console.log("recent Transaction", data);  
        this.recentTransactionList = this.DataService.getContactListColour(data.listofDataset[0].records);
        if(this.constant.getPlatform() != "web"){
          this.recentTransactionList = this.recentTransactionList.slice(0, 7);
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }
  errorCallBack(subActionId, resp) {
    // showToastMessage(resp.Result, "error");
  }

  payeeSelection(value,payeeType){
    console.log("value====>",value);
    if(this.type == 'vpa'){
      // this.DataService.isPayeeSelected = true;
      // this.DataService.updateVerifyVPABehaviourSource = new Subject();
    // this.DataService.updateVerifyVPABehaviourSource = new BehaviorSubject({});
      this.DataService.verifyOmniVPACallback(value);
    }else{
      this.payeeUpdate.emit({"output": value,"payeeType" : payeeType});
    }
  }


  gotoPage(toPage){
   // this.router.navigateByUrl("/"+toPage);
  }

  viewMoreDtl(type){
    if(type == "favorite"){
      this.DataService.omniAllRecentPayeeList = this.favoriteList;
    }
    else{
      this.DataService.omniAllRecentPayeeList = this.recentTransactionList;
    }
    this.router.navigateByUrl('/omniAllRecentPayeeMob')
  }

}

