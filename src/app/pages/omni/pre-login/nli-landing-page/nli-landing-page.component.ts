import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from '../../../../utilities/common-methods';
import { Location } from '@angular/common';
import { AppConstants } from 'src/app/app.constant';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { FormValidationService } from 'src/app/services/form-validation.service';
declare var slideCarousel: any;
declare var showToastMessage: any;

@Component({
  selector: 'app-nli-landing-page',
  templateUrl: './nli-landing-page.component.html',
  styleUrls: ['./nli-landing-page.component.scss']
})
export class NliLandingPageComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    private commonmethod:CommonMethods,
    private constant:AppConstants,
    private httpClient:HttpClient,
    private formValidation: FormValidationService,

  ) { }

  tabActive: any = 'retail';
  callbackForm: FormGroup;
  callbackdata;
  callbackRequestFlag:boolean = false;
  referenceNo;


  commonPageComponent = {
    'headerType': 'preloginHeader',
    'sidebarNAv': false,
    'footer': 'innerFooter',
  }

  ngOnInit(): void {
    this.callbackRequestFlag = false
    slideCarousel();
    this.DataService.changeMessage(this.commonPageComponent);
    this.buildForm()
  }


  buildForm(){
    this.callbackForm = new FormGroup({
      mobNumber: new FormControl('',[Validators.required, Validators.pattern(/^[6-9]\d{9}$/), Validators.minLength(10)]),

    })
  }

  goToPage(routeName,regtype?:any) {
    if(routeName == "registration"){
      this.DataService.regIsAtStep = 1;
      this.DataService.regFeildData.custId = "";
      this.DataService.regFeildData.accNo = "";
      this.DataService.regType = regtype
    }
    this.router.navigateByUrl('/' + routeName);
  }

  selectionTab(value) {
    this.tabActive = value;
  }

  openCallBAckPoupup(){
    this.commonmethod.openPopup('div.collectPhoneNo')
  }

  registerSoleProprietor(){
    // 'http://localhost:5000/#/login'
    window.open(this.constant.nliLandingPageURL.corporateRegistrationURL,'_self');
  }

  loginSoleProprietor(){
    window.open(this.constant.nliLandingPageURL.corporateLoginURL,'_self');
  }

  validatesForm() {
    if (this.callbackForm.invalid) {
      this.formValidation.markFormGroupTouched(this.callbackForm);
      return;
    }
  }

  requestCallbackService(){
    this.validatesForm();

    if(this.callbackForm.valid){
    this.callbackdata ={

      "body":{

        "MobileNo":this.callbackForm.value.mobNumber,
        "PreferredLang":"English",
        "PreferredTime":"9-19"

      }
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "TokenID":this.constant.crm_TOKEN
      })
    };


    this.httpClient.post(this.constant.publicURL.crmURL + this.constant.serviceName_CALLBACK, this.callbackdata, httpOptions)
    .subscribe(
    data  => {
    console.log("POST Request is successful ", data);
    this.referenceNo = data[0].CBRefNo
    this.callbackRequestFlag = true
    },
    error  => {

    console.log("Error", error);

    }

    );
  }
}

closePopup(){
  this.commonmethod.closeAllPopup() ;
  this.callbackRequestFlag = false
}

navigateToPage(page){
  window.open(this.constant.nliLandingPageURL.aboutUsURL,'_self');
}

comingsoon(){
  showToastMessage("Coming Soon","success");
}


}
