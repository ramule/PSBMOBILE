import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { BorrowerGuarantorService } from '../../loans/borrower-guarantor-details/borrower-guarantor-service';

@Component({
  selector: 'app-joint-holder-details',
  templateUrl: './joint-holder-details.component.html',
  styleUrls: ['./joint-holder-details.component.scss']
})
export class JointHolderDetailsComponent implements OnInit {


  powerOfAttorney:any = [];
  authSignator:any = [];
  letterOfAuthority:any = [];
  jtHolder:any =[];
  guarantor:any =[];
  legalHirer:any = [];
  lvhHirer:any=[];
  coObligant:any=[];
  dsa:any =[];
  others:any = [];
  portfolio:any = [];
  jointHolderDtl:any=[];


  constructor( 
    private router: Router, 
    public DataService: DataService,  
    private storage: LocalStorageService,
    private constant: AppConstants,
    private borrowerGarantorService: BorrowerGuarantorService,
    private http: HttpRestApiService,
) { }

  ngOnInit(): void {
    this.DataService.setPageSettings('Joint Holder Details');
    this.onInitialize();
  }

  onInitialize(){
    var param = this.borrowerGarantorService.getBorrowerGuarantorReq(this.DataService.loanAccNo);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_JOINTACCOUNTHOLDERDETAILS).subscribe(data => {
      console.log("loan enq resp===>",data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        if (data.hasOwnProperty("set")) {
          this.jointHolderDtl =data.set.records
          data.set.records.forEach(el => {
            if(el.typeOfHolderName == "P"){
              this.powerOfAttorney.push(el);
            }
            else if(el.typeOfHolderName == "A"){
              this.authSignator.push(el);
            }
            else if(el.typeOfHolderName == "L"){
              this.letterOfAuthority.push(el);
            }
            else if(el.typeOfHolderName == "J"){
              this.jtHolder.push(el);
            }
            else if(el.typeOfHolderName == "G"){
              this.guarantor.push(el);
            }
            else if(el.typeOfHolderName == "H"){
              this.legalHirer.push(el);
            }
            else if(el.typeOfHolderName == "V"){
              this.lvhHirer.push(el);
            }
            else if(el.typeOfHolderName == "C"){
              this.coObligant.push(el);
            }
            else if(el.typeOfHolderName == "D"){
              this.dsa.push(el);
            }
            else if(el.typeOfHolderName == "O"){
              this.others.push(el);
            }
            else if(el.typeOfHolderName == "S"){
              this.portfolio.push(el);
            }


            // if(el.typeOfHolderName == "G"){
            //   this.borrowerList.push(el);
            // }
            // else if(el.typeOfHolderName == "C" || el.typeOfHolderName == "J" ){
            //   this.coborrowerList.push(el);
            // }
          });
        }
      }
    });
  }
  
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

}
