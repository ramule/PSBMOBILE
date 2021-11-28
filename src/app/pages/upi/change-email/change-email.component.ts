import { CommonMethods } from './../../../utilities/common-methods';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/app.constant';


@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {

  constructor(
    public DataService: DataService,
    private router : Router,
    private commonMethods :CommonMethods,
    private constant : AppConstants
  ) { }

  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'Change Email',
    'footertype': 'none'
  }
  changeEmailForm : FormGroup

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    this.buildForm();
  }

  buildForm(){
    this.changeEmailForm = new FormGroup({
      newEmailId : new FormControl('', [Validators.required, Validators.pattern(this.constant.email_regex)]),
    })
  }

  validateForm(){
    if(this.changeEmailForm.invalid){
      this.changeEmailForm.get('newEmailId').markAsTouched();
    }
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  changeEmailSubmit(){
    if(this.changeEmailForm.valid){
      console.log("Change Email :: ", this.changeEmailForm.value)
      this.commonMethods.openPopup('div.otp-popup')
    }
    else{
      this.validateForm();
    }
  }

  closeAllPopUp(){
    this.commonMethods.closeAllPopup();
  }
}