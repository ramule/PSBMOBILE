import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../../../services/data.service';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { AccountOpeningStepsService } from '../account-opening-steps/account-opening-steps.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { DropDownMaster , AccountOpeningSteps} from '../../../../../utilities/app-enum';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
declare var showToastMessage: any;


@Component({
  selector: 'app-account-opening-create-upi',
  templateUrl: './account-opening-create-upi.component.html',
  styleUrls: ['./account-opening-create-upi.component.scss']
})
export class AccountOpeningCreateUpiComponent implements OnInit {

  upiVerified : boolean = false;

  constructor(private router: Router,
    private commonMethods: CommonMethods,
    private form: FormBuilder,
    private dataService: DataService,
    private translate: TranslatePipe,
    public accOpeningService: AccountOpeningStepsService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private storage : LocalStorageService
    ) { }
  createUpiForm: FormGroup;

  @Output() nextEvent = new EventEmitter<number>();
  @Output() prevEvent = new EventEmitter<number>();
  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.createUpiForm = new FormGroup({
      upiId: new FormControl('', [Validators.required]),
    });
    this.setUpiId();
  }

  setUpiId(){
    if(this.dataService.accountOpenFldData.UPI_ADDRESS != ''){
      let totalUpiId = this.dataService.accountOpenFldData.UPI_ADDRESS;
      let upiId = totalUpiId.split("@");
      this.createUpiForm.patchValue({
        upiId : upiId[0]
      })
      this.upiVerified = true;
    }
  }

  onUpiChange(){
    this.upiVerified = false;
  }

  submit() {
    this.validateForm()
    if (this.createUpiForm.valid) {
      this.dataService.accountOpenFldData.UPI_ADDRESS = this.createUpiForm.value.upiId+"@psb";
      this.createAccount();
    }
  }

  validateForm() {
    if (this.createUpiForm.invalid) {
      this.createUpiForm.get('upiId').markAsTouched();
      return;
    }
  }

  prevtab() {
    this.prevEvent.next(5);
  }


  checkAvailability(){
    var requestObj = this.accOpeningService.checkUpiAddress(this.createUpiForm.value.upiId);
    this.http.callBankingAPIService(requestObj, this.constant.deviceID, this.constant.serviceName_VERIFYUPIPAYMENTADDRESS).subscribe(data => {
      console.log('success', data);
      if (data.responseParameter.opstatus == "00") {
        //success handler
        let upiResponseData = data.responseParameter.upiResponse;
        console.log('upiResponseData => ', upiResponseData);
        if (upiResponseData.status == "00") {
          this.upiVerified = true;
          //success handler
        } else {
          this.upiVerified = false;
          //failure handler
        }
      } else {
        //failure handler
        this.commonMethods.openPopup('div.popup-bottom.aadhar-otp-confirm')
        this.upiVerified = false;
        console.log("FAILURE");
      }
    }, error => {
      this.upiVerified = false;
      console.log("ERROR!", error);
    });
  }

  createAccount(){
    var param = this.accOpeningService.getSaveaAccOpenParam(AccountOpeningSteps.CREATE_UPI_ID,0);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serivceName_SAVEACCOUNTOPENINGDATA).subscribe(data => {
      console.log("=====CREATEACCOUNT=====",data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.nextEvent.next(5);
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
}
