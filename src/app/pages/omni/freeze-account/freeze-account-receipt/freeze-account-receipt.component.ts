import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-freeze-account-receipt',
  templateUrl: './freeze-account-receipt.component.html',
  styleUrls: ['./freeze-account-receipt.component.scss']
})
export class FreezeAccountReceiptComponent implements OnInit {

  // commonPageComponent = {
  //   'headerType': 'innerHeader',
  //   'sidebarNAv': 'OmniNAv',
  //   'footer': 'innerFooter',
  // }

  constructor(
    private router:Router,
    public dataService: DataService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)

    this.dataService.getBreadcrumb('RECEIPT' , this.router.url)
    history.pushState({}, this.dataService.previousPageUrl, this.location.prepareExternalUrl(this.dataService.previousPageUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.dataService.setPageSettings('Receipt');
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

}
