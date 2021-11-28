import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';


@Component({
  selector: 'app-fast-tag-payment',
  templateUrl: './fast-tag-payment.component.html',
  styleUrls: ['./fast-tag-payment.component.scss']
})
export class FastTagPaymentComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods
  ) { }
  
  accountList =[
    { 'accoutType': 'Saving Account', 'accountNo' : 'XXX XXX 9897'},
    {'accoutType': 'Saving Account', 'accountNo' : 'XXX XXX 9898'},
    {'accoutType': 'Saving Account', 'accountNo' : 'XXX XXX 9899'},
    {'accoutType': 'Saving Account', 'accountNo' : 'XXX XXX 9890'},
  ] ;

  accountValue : any = '';

  ngOnInit(): void {
    this.DataService.setPageSettings('FASTTAG_PAYMENT');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('FASTTAG_PAYMENT', this.router.url)
  }

  onAccountSelectType() {
    if(window.innerWidth < 767) {
      this.commonMethod.openPopup('div.popup-bottom.sel-account');
    }
  }

  getToAccValue(accountType, accountNo){
    this.accountValue = accountType.concat(" ", accountNo);
   }

   
  closePopup(){
    this.commonMethod.closeAllPopup();
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

}
