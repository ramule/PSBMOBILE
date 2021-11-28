import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mob-biller-dropdown',
  templateUrl: './mob-biller-dropdown.component.html',
  styleUrls: ['./mob-biller-dropdown.component.scss']
})
export class MobBillerDropdownComponent implements OnInit {
  constructor(
    public dataService : DataService,
    private router : Router,
  ) { }

  @Output() billerVaue  = new EventEmitter<any>(); ;
  
  billPaymentBoardName = [
    { 'imagName' : 'assets/images/icons/mahavitran.png', 'boardName' : 'Adani Electicity - Mumbai'},
    { 'imagName' : 'assets/images/icons/aasam-power.png', 'boardName' : 'Assam Power - RAPDR'},
    { 'imagName' : 'assets/images/icons/best-mumbai.png', 'boardName' : 'BEST - Mumbai'},
  ]


  ngOnInit(): void {
    this.dataService.setPageSettings('BILLER_DROPDOWN');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('BILLER_DROPDOWN' , this.router.url)
  }

  
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  billerSelectionData(item){
    this.dataService.billerValueMob = item
    this.goToPage('retailBillPayment')
  }


}
