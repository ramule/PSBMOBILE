import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe, Location } from '@angular/common'
import * as moment from 'moment';
import { StandingInstructionListService } from './standing-instruction-list.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { ContactUsRoutingModule } from 'src/app/pages/common-components/contact-us/contact-us-routing.module';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
// import { TranslatePipe } from '../../../../pipes/translate.pipe';

declare var showToastMessage: any;

@Component({
  selector: 'app-standing-instruction-list',
  templateUrl: './standing-instruction-list.component.html',
  styleUrls: ['./standing-instruction-list.component.scss']
})
export class StandingInstructionListComponent implements OnInit {


  constructor(
    private router: Router,
    public DataService: DataService,
    private datePipe: DatePipe,
    private standingInstructionListService: StandingInstructionListService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private commonMethod: CommonMethods,
    private translatePipe: TranslatePipe,
  ) { }

  standingInstructionListData: any = [];
  standingInstructionListDataVal: any = [];


  searchText : any ;
  noSIPeriod : any ;

  deleteSiData: any = [];

  now = new Date();

  ngOnInit(): void {
    this.DataService.setPageSettings('STANDING_INSTRUCTION_LIST');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('STANDING_INSTRUCTION_LIST', this.router.url)
    this.getStandingInstructionDetails();
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  close() {
    this.commonMethod.closeAllPopup();
  }

  deleteSiPopUp(siData) {
    this.deleteSiData = siData
    console.log("Delete SI Data :: ", this.deleteSiData)
    this.commonMethod.openPopup('div.delete-si')

  }

  getStandingInstructionDetails() {
    var param = this.standingInstructionListService.getStandingInstructionFutureDetails(this.DataService.userDetails.cifNumber);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_FUTURESTANDINGINSTRUCTIONINQUIRY).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log("Standing Instruction List :: ", data.set['records']);
        this.standingInstructionListData = data.set['records']
        this.standingInstructionListDataVal = data.set['records']

        // for(let i=0 ; i<this.standingInstructionListDataVal.length ; i++){
        //   this.standingInstructionListDataVal[i].siFreq = this.standingInstructionListDataVal[i].siFreq == 'W' ? 'Weekly' : this.standingInstructionListDataVal[i].siFreq == 'M' ? 'Monthly' :  
        //                                                 this.standingInstructionListDataVal[i].siFreq == 'H' ? 'Half yearly' : this.standingInstructionListDataVal[i].siFreq == 'Q' ? 'Quartely' : 'Yearly'
        // } 
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result, "error");
  }

  deleteSi() {
    var param = this.standingInstructionListService.getInquiryStandingInstruction(this.deleteSiData,this.DataService.userDetails.cifNumber);
    
    this.DataService.standingInstructionDelete = this.deleteSiData
    this.DataService.screenType = 'deleteStandingInstruction';
    this.DataService.endPoint = this.constant.serviceName_DELETESTANDINGINSTRUCTION;
    var objCheckFlag = this.DataService.activitySettingData.findIndex(x => x.ACTIVITYNAME == this.DataService.endPoint.split('/')[1]);
   
    if (this.DataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y') {
      this.DataService.standingInstructionDtl = this.deleteSiData;
      this.DataService.request = this.standingInstructionListService.getDeleteStandingInstruction(this.deleteSiData);
      this.DataService.otpName = "OTP"


      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_INQUIRYSTANDINGINSTRUCTION ).subscribe(data => {
        var resp = data.responseParameter;
        console.log("dat----- >> ", resp)
        if (resp.opstatus == "00") {
          console.log("Modify Standing Instruction List :: ", data.set['records']);
          var modifyStandingData = data.set['records']
          this.DataService.noSIPeriod = data.set['records'][0]['NO SI period']
          this.router.navigateByUrl("/standingInstructionOverview");
        }
      });
    }
  }

  modifySi(routeName, modifySiData){
    let noSIPeriod ;
    var param = this.standingInstructionListService.getInquiryStandingInstruction(modifySiData,this.DataService.userDetails.cifNumber);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_INQUIRYSTANDINGINSTRUCTION ).subscribe(data => {
      var resp = data.responseParameter;
      console.log("dat----- >> ", resp)
      if (resp.opstatus == "00") {
        console.log("Modify Standing Instruction List :: ", data.set['records']);
        var modifyStandingData = data.set['records']
        noSIPeriod = modifyStandingData[0]['NO SI period']
        this.router.navigateByUrl('/' + routeName, {state : { modifySi : modifySiData , siPeriod : noSIPeriod }});
      }
    });



  }

  viewSI(viewSI){
    console.log("View SI :: ", viewSI)
    var param = this.standingInstructionListService.getInquiryStandingInstruction(viewSI,this.DataService.userDetails.cifNumber);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_INQUIRYSTANDINGINSTRUCTION ).subscribe(data => {
      var resp = data.responseParameter;
      console.log("dat----- >> ", resp)
      if (resp.opstatus == "00") {
        console.log("View Standing Instruction List :: ", data.set['records']);
        var modifyStandingData = data.set['records']
        this.router.navigateByUrl('/' + 'standingInstructionView', {state : { modifySi : modifyStandingData }});
      }if(resp.opstatus == "911"){
        this.DataService.information = this.translatePipe.transform('CARD_ISSUER_TIME_OUT');
        this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
        this.DataService.primaryBtnText = this.translatePipe.transform('OK');
        this.commonMethod.openPopup('div.popup-bottom.show-common-info');
        // this.errorCallBack(resp.Result, resp);
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  searchAccount(event) {
        if (this.searchText != '') {
          var payeeArray = this.standingInstructionListData;
          var filterArray = payeeArray.filter((x) =>
            x.siNum.toLowerCase().includes(this.searchText.toLowerCase()) ||
            x.drAccountNumber.toLowerCase().includes(this.searchText.toLowerCase()) ||
            x.crForacid.toLowerCase().includes(this.searchText.toLowerCase()) ||
            x.flowAmount.toLowerCase().includes(this.searchText.toLowerCase()) ||
            x.siFreq.toLowerCase().includes(this.searchText.toLowerCase()) 

          );
          this.standingInstructionListDataVal = [];
          this.standingInstructionListDataVal = filterArray;
        } else {
          this.standingInstructionListDataVal = [];
          this.standingInstructionListDataVal = this.standingInstructionListData;
        }
      }
  
}
