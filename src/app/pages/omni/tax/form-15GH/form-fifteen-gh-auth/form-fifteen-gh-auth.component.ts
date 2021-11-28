import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OtpSessionService } from '../../../otp-session/otp-session.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { DatePipe, Location } from '@angular/common'

@Component({
  selector: 'app-form-fifteen-gh-auth',
  templateUrl: './form-fifteen-gh-auth.component.html',
  styleUrls: ['./form-fifteen-gh-auth.component.scss']
})
export class FormFifteenGhAuthComponent implements OnInit {

  constructor(
    private router: Router,
    public dataService: DataService,
    public otpSessionService: OtpSessionService,
    public http: HttpRestApiService,
    public storage: LocalStorageService,
    public constant: AppConstants,
    private date: DatePipe
  ) { }

  formFifteenAuth: FormGroup;

  @ViewChildren('fifteenGHRow') fifteenGHRows: any;

  fifteenGHInput = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6']

  ngOnInit(): void {
    this.buildForm();
    this.dataService.setPageSettings('Form 15 G/H');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('AUTHORIZATION' , this.router.url)
  }

  buildForm() {
    this.formFifteenAuth = new FormGroup({
      otp1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp3: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp4: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp5: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp6: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    });
  }

  validateForm() {
    if (this.formFifteenAuth.invalid) {
      this.formFifteenAuth.get('otp1').markAsTouched();
      this.formFifteenAuth.get('otp2').markAsTouched();
      this.formFifteenAuth.get('otp3').markAsTouched();
      this.formFifteenAuth.get('otp4').markAsTouched();
      this.formFifteenAuth.get('otp5').markAsTouched();
      this.formFifteenAuth.get('otp6').markAsTouched();
      return;
    }
  }
  onKeyUpEvent(index: any, event: any, type: any) {
    const eventCode = event.which || event.keyCode;

    if (this.getSpasswordElement(index, type)?.value.length === 1) {
      if (index !== 5) {
        this.getSpasswordElement(index + 1, type)?.focus();
      } else {
        this.getSpasswordElement(index, type)?.blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, type)?.focus();
    }


    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        if (type == 'otp') {
          this.formFifteenAuth.get(this.fifteenGHInput[index])?.setValue("");
          this.getSpasswordElement(index - 1, type)?.focus();
        }
        
      }
    }

  }

  onFocusEvent(index: any, type: any) {
    for (let item = 1; item < index; item++) {
      console.log("index = ", index)
      const currentElement = this.getSpasswordElement(item, type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  getSpasswordElement(index: any, type: any) {
    if (type == 'otp') {
      return this.fifteenGHRows._results[index].nativeElement;
    }
  }
  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  otpSubmit() {
    if (this.formFifteenAuth.valid) {
      this.goToPage('form15GHSuccess')
    }
    else {
      this.validateForm();
    }
  }
}
