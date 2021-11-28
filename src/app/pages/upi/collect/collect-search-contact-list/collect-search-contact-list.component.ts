import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { AddBenificiary } from 'src/app/models/add-benificiary-model';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { PluginService } from 'src/app/services/plugin-service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../services/data.service';
import { BenificiaryService } from '../../benificiary/benificiary.service';

@Component({
  selector: 'app-collect-search-contact-list',
  templateUrl: './collect-search-contact-list.component.html',
  styleUrls: ['./collect-search-contact-list.component.scss']
})
export class CollectSearchContactListComponent implements OnInit {
  searchContacts = '';
  payeeList = [];
  information="";
  payeeDetails:any;
  constructor(private router:Router, public DataService: DataService, private loader: pageLoaderService,private pluginService: PluginService,private location : Location,private localStorage : LocalStorageService,private commonMethods : CommonMethods, private http : HttpRestApiService, private constant : AppConstants,private benificiaryService : BenificiaryService) { }

  ngOnInit(): void {
    var headerName = this.DataService.upiCollectsearchType == 'recent' ? 'RECENT_PAYEE' :'FAVORITE_PAYEE';
    history.pushState({}, this.DataService.contactPrevURL, this.location.prepareExternalUrl(this.DataService.contactPrevURL));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.DataService.setPageSettings(headerName);
    this.payeeList = this.DataService.upiSearchCollectPayeeList;
  }
  
  selectContact(contact){
    // this.DataService.validateAddressByMobileNo(contact.number);
    if(this.DataService.contactPrevURL == "/collectRecentRequest" ){
      this.DataService.upiCollectRequest.validatedVpaAdress =  this.DataService.upiCollectsearchType == 'recent' ?contact.beneVpa : contact.beneVpa;
    }
    else if(this.DataService.contactPrevURL == "/payUpi"){
      console.log(contact.beneVpa);
      if(contact?.txnMode == 'ACCOUNT'){
        this.DataService.accountIFscDetails = contact;
      }else{
        this.DataService.upiPayRequest.validatedVpaAdress =  this.DataService.upiCollectsearchType == 'recent' ?contact.beneVpa : contact.beneVpa;    
      }
      
    }
    else if(this.DataService.contactPrevURL == "/requestMandate" || this.DataService.contactPrevURL == "/createMandate" ){
      this.DataService.upiValidatedVpaAdress = this.DataService.upiCollectsearchType == 'recent' ?contact.beneVpa : contact.beneVpa;
    }
    this.location.back();
  }

  
  closePopup(popup) {
    this.commonMethods.closePopup('div.popup-bottom.' + popup)
  }

  openPopup(payee,popup) {
    if(popup == 'fav-popup'){
      this.payeeDetails = payee;
    }
    this.commonMethods.openPopup('div.popup-bottom.' + popup)
  }

   /**
   * Api call for adding payee as favorite payee
   */
    removePayeeFromFavorite(){
      if(!this.payeeDetails.beneVpa){
        this.DataService.upiBenfAccNo =this.payeeDetails.beneAccount;
        this.DataService.upiBenfIfsc = this.payeeDetails.beneIfsc;
      }
      let addBenificiary:AddBenificiary = new AddBenificiary().deserialize({isFavourite:'N',payeeName:this.payeeDetails.nickName,nickName:this.payeeDetails.nickName,payeeVPA:this.payeeDetails?.beneVpa ? this.payeeDetails?.beneVpa : ''});
      this.benificiaryService.getUserLocation();
      var reqParams = this.benificiaryService.setAddBenificiaryRequest(addBenificiary,!this.payeeDetails.beneVpa ? true : false,true,this.payeeDetails.beneVpa ? true :false);
      this.closePopup('fav-popup');
      this.UpiApiCall(reqParams);
    }

  

  /**
   * Common Api Call for collect 
   * @param request 
   */
   UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_ADDBENIFICIARY:
              this.information = response.msg;
              this.DataService.fetchUPIbenificiaryLists = true;
              this.commonMethods.openPopup('div.popup-bottom.show-fav-info');
              this.getBenificiaryList();
            break;
          default:
            break;
        }
      } else {
        // showToastMessage(data.msg, "error");
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  getBenificiaryList() {
    this.benificiaryService.getBenificiaryList().then((response: any) => {
      this.payeeList  = this.DataService.favPayeeList;
    });
  }
}
