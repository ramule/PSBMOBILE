import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core'; 
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../../../services/data.service';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { AccountOpeningStepsService } from '../account-opening-steps/account-opening-steps.service';
import { DropDownMaster , AccountOpeningSteps} from '../../../../../utilities/app-enum';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
declare var showToastMessage: any;



@Component({
  selector: 'app-account-opening-additonal-details',
  templateUrl: './account-opening-additonal-details.component.html',
  styleUrls: ['./account-opening-additonal-details.component.scss']
})
export class AccountOpeningAdditonalDetailsComponent implements OnInit {
  @Output() nextEvent = new EventEmitter<number>();
  @Output() prevEvent = new EventEmitter<number>();

  headerdata = {
    'headerType': 'UpiMainHeader',  //Options: TitleHeader , preloginHeader
    'titleName': '',            // Note : add titlename if headerType = TitleHeader
    'footertype': 'none' //Options: upiFooter , none
  };
  addittonalInfoForm: FormGroup;
  annualIncomeList:any = [];
  occupationList:any = [];
  stateList:any = [];
  cityList:any = [];
  acceptTerms: boolean = false;
  

  constructor(private router: Router,   
    private commonMethods: CommonMethods,
    private form: FormBuilder,
    private dataService: DataService,
    private translate: TranslatePipe,
    public accOpeningService: AccountOpeningStepsService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    ) { 

      // $('#check1 #check2').click(function() {
      //   if ($('#check1').attr('checked'))
      //     $('#check2').prop('checked', false);
      //   else  
      //     $('#check1').prop('checked', false);
      // });

      if($("#check2").is(':checked'))

      $('body').on('change', 'input[type=checkbox]',function (e) {
        alert("isdsdsd")
        });

        $('#check2').change(function() {
          // if($(this).is(":checked")) {
          //     var returnVal = confirm("Are you sure?");
          //     $(this).attr("checked", returnVal);
          // }
          // $('#textbox1').val($(this).is(':checked'));    
          alert("rcceceec")    
      });

    }

  ngOnInit(): void {
    this.dataService.changeMessage(this.headerdata);
    this.buildForm();
    this.getOccupation();
    this.getAnnualIncome();
    this.getState();
  }

  buildForm() {
    this.addittonalInfoForm = new FormGroup({
      fathersName: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
      mothersName: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
      occupation: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      commAddLine1: new FormControl('', [Validators.required]),
      commAddLine2: new FormControl('', [Validators.required]),
      commAddState: new FormControl('', [Validators.required]),
      commAddCity: new FormControl('', [Validators.required]),
      commAddPincode: new FormControl('', [Validators.required]),
      income: new FormControl('', [Validators.required]),
      acceptTerms1 :new FormControl(''),
      acceptTerms2 :new FormControl(''),
    });
    this.setAditionalDtl();
  }


  setAditionalDtl(){
    console.log(this.dataService.accountOpenFldData.aadharLinkDBT1);
    this.addittonalInfoForm.patchValue({
      fathersName : this.dataService.accountOpenFldData.fatherName!="" && this.dataService.accountOpenFldData.fatherName!=undefined ? this.dataService.accountOpenFldData.fatherName : "",
      mothersName : this.dataService.accountOpenFldData.motherName!="" && this.dataService.accountOpenFldData.motherName!=undefined ? this.dataService.accountOpenFldData.motherName : "",
      occupation: this.dataService.accountOpenFldData.occupation!="" && this.dataService.accountOpenFldData.occupation!=undefined  ? this.dataService.accountOpenFldData.occupation : "",
      address: this.dataService.accountOpenFldData.isCommunAdrSameAsPermanent,//addrss
      commAddLine1: this.dataService.accountOpenFldData.communicationAddrL1!="" && this.dataService.accountOpenFldData.communicationAddrL1!=undefined  ? this.dataService.accountOpenFldData.communicationAddrL1 : "",
      commAddLine2: this.dataService.accountOpenFldData.communicationAddrL2!="" && this.dataService.accountOpenFldData.communicationAddrL2!=undefined  ? this.dataService.accountOpenFldData.communicationAddrL2 : "",
      commAddState: this.dataService.accountOpenFldData.communicationAddrState!="" && this.dataService.accountOpenFldData.communicationAddrState!=undefined  ? this.dataService.accountOpenFldData.communicationAddrState : "",
      commAddCity: this.dataService.accountOpenFldData.communicationAddrCity!="" && this.dataService.accountOpenFldData.communicationAddrCity!=undefined  ? this.dataService.accountOpenFldData.communicationAddrCity : "",
      commAddPincode: this.dataService.accountOpenFldData.communicationAddrPin!="" && this.dataService.accountOpenFldData.communicationAddrPin!=undefined  ? this.dataService.accountOpenFldData.communicationAddrPin : "",
      income: this.dataService.accountOpenFldData.annualIncome!="" && this.dataService.accountOpenFldData.annualIncome!=undefined  ? this.dataService.accountOpenFldData.annualIncome : "",
      acceptTerms1: this.dataService.accountOpenFldData.aadharLinkDBT1,
      acceptTerms2: this.dataService.accountOpenFldData.aadharLinkDBT2
    });
    var event = {
      target: {
        checked : this.dataService.accountOpenFldData.isCommunAdrSameAsPermanent
      }
    } 
    this.changeAddress(event);
  }

  changeAddress(event){
    if (!event.target.checked){
       $('#addrssblock').slideDown();
       this.addittonalInfoForm.patchValue({
        commAddLine1 : "",
        commAddLine2 : "",
        commAddState : "",
        commAddCity : "",
        commAddPincode : ""
       });
    }else{
     $('#addrssblock').slideUp();
     this.addittonalInfoForm.patchValue({
      commAddLine1 : this.dataService.accountOpenFldData.permanentAddrL1!="" && this.dataService.accountOpenFldData.permanentAddrL1!=undefined ? this.dataService.accountOpenFldData.permanentAddrL1 : '-',
      commAddLine2 : this.dataService.accountOpenFldData.permanentAddrL2!="" && this.dataService.accountOpenFldData.permanentAddrL2!=undefined ? this.dataService.accountOpenFldData.permanentAddrL2 : '-',
      commAddState : this.dataService.accountOpenFldData.permanentAddrState!="" && this.dataService.accountOpenFldData.permanentAddrState!=undefined ? this.dataService.accountOpenFldData.permanentAddrState : '-',
      commAddCity : this.dataService.accountOpenFldData.permanentAddrCity!="" && this.dataService.accountOpenFldData.permanentAddrCity!=undefined ? this.dataService.accountOpenFldData.permanentAddrCity : '-',
      commAddPincode : this.dataService.accountOpenFldData.permanentAddrPin!="" && this.dataService.accountOpenFldData.permanentAddrPin!=undefined ? this.dataService.accountOpenFldData.permanentAddrPin : '-'
     });
    }
   }

  routeTo(location){
    console.log('location', location);
    this.router.navigateByUrl(location);
  }


  validateForm() {
    if (this.addittonalInfoForm.invalid) {
      this.addittonalInfoForm.get('fathersName').markAsTouched();
      this.addittonalInfoForm.get('mothersName').markAsTouched();
      this.addittonalInfoForm.get('occupation').markAsTouched();
      this.addittonalInfoForm.get('commAddLine1').markAsTouched();
      this.addittonalInfoForm.get('commAddLine2').markAsTouched();
      this.addittonalInfoForm.get('commAddCity').markAsTouched();
      this.addittonalInfoForm.get('commAddState').markAsTouched();
      this.addittonalInfoForm.get('commAddPincode').markAsTouched();
      this.addittonalInfoForm.get('occupation').markAsTouched();
      this.addittonalInfoForm.get('income').markAsTouched();
      this.addittonalInfoForm.get('acceptTerms1').markAsTouched();
      this.addittonalInfoForm.get('acceptTerms2').markAsTouched();
      return;
    }
    if(this.addittonalInfoForm.value.acceptTerms1==false || this.addittonalInfoForm.value.acceptTerms2==false)
    this.acceptTerms = true
    else
    this.acceptTerms = false
  }

  
  submitForm(){
    this.acceptTerms = false;
    console.log(this.addittonalInfoForm.value.aadharLinkDBT1);
    this.validateForm()
    if(this.addittonalInfoForm.valid){ 
      if(this.addittonalInfoForm.value.acceptTerms1 == false && this.addittonalInfoForm.value.acceptTerms2 == false) {this.acceptTerms = true; ;return};
      this.dataService.accountOpenFldData.fatherName = this.addittonalInfoForm.value.fathersName;
      this.dataService.accountOpenFldData.motherName = this.addittonalInfoForm.value.mothersName ;
      this.dataService.accountOpenFldData.occupation = this.addittonalInfoForm.value.occupation;
      this.dataService.accountOpenFldData.annualIncome = this.addittonalInfoForm.value.income;
      this.dataService.accountOpenFldData.isCommunAdrSameAsPermanent = this.addittonalInfoForm.value.address
      this.dataService.accountOpenFldData.communicationAddrL1 = this.addittonalInfoForm.value.commAddLine1;
      this.dataService.accountOpenFldData.communicationAddrL2 = this.addittonalInfoForm.value.commAddLine2;
      this.dataService.accountOpenFldData.communicationAddrCity = this.addittonalInfoForm.value.commAddCity;
      this.dataService.accountOpenFldData.communicationAddrState = this.addittonalInfoForm.value.commAddState;
      this.dataService.accountOpenFldData.communicationAddrPin = this.addittonalInfoForm.value.commAddPincode;
      this.dataService.accountOpenFldData.aadharLinkDBT1 = this.addittonalInfoForm.value.acceptTerms1;
      this.dataService.accountOpenFldData.aadharLinkDBT2 = this.addittonalInfoForm.value.acceptTerms2;
      this.createAccount();
    }
  }

  createAccount(){
    var param = this.accOpeningService.getSaveaAccOpenParam(AccountOpeningSteps.PERSONAL_DETAILS,0);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serivceName_SAVEACCOUNTOPENINGDATA).subscribe(data => {
      console.log("=====CREATEACCOUNT=====",data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.nextEvent.next(2);
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  prevtab(){
    this.prevEvent.next(2);
  }

  getOccupation() {
    var param = this.accOpeningService.getDropDownMasterParam(DropDownMaster.OCCUPATION);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETREFCODE).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        if (data.hasOwnProperty('listofDataset')) {
          this.occupationList = data.listofDataset[0].records;
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  getAnnualIncome() {
    var param = this.accOpeningService.getKycDropDownMasterParam(DropDownMaster.ANNUAL_INCOME);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETCODE).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        if (data.hasOwnProperty('listofDataset')) {
          this.annualIncomeList = data.listofDataset[0].records;
        }
      }
      else {
        this.annualIncomeList = [
          {"DESCRIPTION":"annualIncome1","ref_code":"1"},
          {"DESCRIPTION":"annualIncome2","ref_code":"2"},
          {"DESCRIPTION":"annualIncome3","ref_code":"3"}
        ]
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  getState(){
    let stateListParams = this.accOpeningService.getStateListParams();
    this.http.callBankingAPIService(stateListParams, this.constant.deviceID, this.constant.serviceName_GETSTATES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('set')) {
          this.stateList = data.set.records;
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);

      }
    });
  }

  getCity(stateId){
    this.cityList = [];
    let cityListParams = this.accOpeningService.getCityListParams(stateId);
      this.http.callBankingAPIService(cityListParams, this.constant.deviceID, this.constant.serviceName_GETCITIES).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
          if (data.hasOwnProperty('set')) {
            this.cityList = data.set.records;
          }
        }
        else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
   errorCallBack(subActionId, resp) {
    //showToastMessage(resp.Result, "error");
  }

  onCheckboxChange(event)
  {
    if(event.target.id=='check1')
    {
       if(event.target.checked==true)
       {
        $('#check2').prop('checked', false);
        this.addittonalInfoForm.value.acceptTerms2 = false
        this.addittonalInfoForm.value.acceptTerms1 =  true
       }
        

    }
    else
    {
      if(event.target.checked==true)
      {
        $('#check1').prop('checked', false);
        this.addittonalInfoForm.value.acceptTerms1 = false
        this.addittonalInfoForm.value.acceptTerms2 =  true
      }
   


    }
  }
}


