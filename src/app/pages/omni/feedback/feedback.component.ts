import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { FeedbackService } from './feedback.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from '../../../utilities/common-methods';
// declare var omniFeedback : any ;




declare var showToastMessage: any;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  selectedStar= 0.0
  feedbackForm: FormGroup;
  star:String="";
  currentRate = 0;
  result:any;

  // commonPageComponent = {
  //   'headerType': 'innerHeader',
  //   'sidebarNAv': 'OmniNAv',
  //   'footer': 'innerFooter',
  // }

feebackValue
  constructor( private router:Router,
    public DataService: DataService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private feedback:FeedbackService,
    private commonMethod:CommonMethods,
    private form: FormBuilder,
    ) { }

  ngOnInit(): void {
    // omniFeedback();
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    this.DataService.getBreadcrumb('FEEDBACK' , this.router.url)
    this.DataService.setPageSettings('FEEDBACK');
    this.buildForm();


  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }
  starclick(value){
    this.feedbackForm.patchValue({
      rating:value
    })
    this.selectedStar = value
  }

  buildForm() {
    this.feedbackForm = new FormGroup({
      rating: new FormControl('', [Validators.required]),
      remark: new FormControl('', [Validators.required])

    });

  };

  validateForm(){

    if (this.feedbackForm.invalid) {
      this.feedbackForm.get('rating').markAsTouched();
      this.feedbackForm.get('remark').markAsTouched();

      return;
    }
  }

  errorCallBack(subActionId, resp) {
    console.log(subActionId);
    if( subActionId == "LEAVEFEEDBACK"){

    }
    else{
      showToastMessage(resp.Result, "error");
    }
  }

  cancleFeedback(){
    console.log("TEST")
    // this.router.navigate(['/feedback']);
    if(this.DataService.isCordovaAvailable){
      this.router.navigateByUrl('/dashboardMobile')
    }else{
      this.router.navigateByUrl('/dashboard')
    }
  }

  closePopups()
{
    this.commonMethod.closeAllPopup()
    this.router.navigate(['/feedback']);
}

okconfirm(){
  this.commonMethod.closeAllPopup()
  if(this.constant.getIsCordova() == "web"){
    this.router.navigate(['/dashboard']);
  }
  else{
    this.router.navigate(['/dashboardMobile']);
  }
}

feedbackSubmit(){
  this.validateForm();

    if(this.feedbackForm.valid){

      //  this.commonMethod.closeAllPopup();
    this.commonMethod.openPopup("div.confirmation1")
    //  this.feebackValue = document.getElementsByClassName('show-result');
      console.log("Star form:",this.feedbackForm.value)
    // //  alert(this.star);
    // console.log("feedback form:", this.feedbackForm)
      var param = this.feedback.feedBack(this.feedbackForm.value);
      console.log("paramsssssss",param);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_Feedback).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
            this.result = data.responseParameter.Result;
        }
        else {
          this.errorCallBack(data.subActionId, resp);
        }
      })

    }
  
  }

  goBack(){
    if(this.constant.getIsCordova() == "web" ){
      this.router.navigateByUrl('/dashboard');
    }
    else{
      this.router.navigateByUrl('/dashboardMobile');
    }
  }


}
