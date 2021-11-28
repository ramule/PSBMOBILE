import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from '../../../../utilities/common-methods';
import { Location } from '@angular/common';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service'; 
import { BorrowerGuarantorService } from './borrower-guarantor-service';

@Component({
  selector: 'app-borrower-guarantor-details',
  templateUrl: './borrower-guarantor-details.component.html',
  styleUrls: ['./borrower-guarantor-details.component.scss']
})
export class BorrowerGuarantorDetailsComponent implements OnInit {

  borrowerList:any = [];
  coborrowerList:any = [];
  powerAttorney : any =[] ;
  authSignatory : any = [] ;
  letterAuthority : any = [] ;
  legalHire : any =[] ;
  others : any = [] ;
  lvhHirer : any = [] ;
  dsa : any = [] ;
  portfolio : any = [] ;


  constructor( 
    private router: Router, 
    public DataService: DataService,  
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private borrowerGarantorService: BorrowerGuarantorService
) { }

ngOnInit(): void {
  this.onInitialize();
  this.DataService.setShowThemeObservable(true)
  this.DataService.setShowsideNavObservable(true)
  this.DataService.setShowNotificationObservable(true)

  this.DataService.getBreadcrumb('BORROWER_GUARANTOR' , this.router.url)
  this.DataService.setPageSettings('BORROWER_GUARANTOR');
  
}

onInitialize(){
  var param = this.borrowerGarantorService.getBorrowerGuarantorReq(this.DataService.loanAccNo);
  this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_JOINTACCOUNTHOLDERDETAILS).subscribe(data => {
    console.log("loan enq resp===>",data);
    var resp = data.responseParameter;
    if (resp.opstatus == "00") {
      if (data.hasOwnProperty("set")) {
        data.set.records.forEach(el => {
          // if(el.typeOfHolderName == "G"){
          //   this.borrowerList.push(el);
          // }
          // else if(el.typeOfHolderName == "C" || el.typeOfHolderName == "J" ){
          //   this.coborrowerList.push(el);
          // }
          // else if(el.typeOfHolderName == 'P'){

          // }

          switch(el.typeOfHolderName){

            case 'G' :
              this.borrowerList.push(el);
              break ;

            case 'C' :
            case 'J' :
              this.coborrowerList.push(el);
              break;

            case 'P' :
              this.powerAttorney.push(el);
              break ;

            case 'A':
              this.authSignatory.push(el) ;
              break ;

            case 'L':
              this.letterAuthority.push(el) ;
              break ;

            case 'H':
              this.legalHire.push(el) ;
              break ;

            case 'O':
              this.others.push(el) ;
              break ;

            case 'V':
              this.lvhHirer.push(el) ;
              break ;
                
              

          }






        });
      }
    }
  });
}

goToPage(routeName){
  this.router.navigateByUrl('/'+routeName);
} 
}
