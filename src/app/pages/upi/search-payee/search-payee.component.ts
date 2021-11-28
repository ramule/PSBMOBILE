import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router, RoutesRecognized } from '@angular/router';
import { Location } from '@angular/common';
import { filter, pairwise } from 'rxjs/operators';
import { AppConstants } from '../../../app.constant';
declare var createGlobalNavMore: any;

@Component({
  selector: 'app-search-payee',
  templateUrl: './search-payee.component.html',
  styleUrls: ['./search-payee.component.scss']
})
export class SearchPayeeComponent implements OnInit {
  payeeList = [];
  searchContacts = '';

  headerdata = {
    'headerType': 'TitleClose',
    'titleName': '',
    'footertype': 'none'
  }

  constructor(private router: Router, public DataService: DataService, private location: Location, 
    public constant: AppConstants,) { }

  // ngOnInit(): void {
  //   this.DataService.changeMessage(this.headerdata);
  //   createGlobalNavMore();
  // }

  ngOnInit(): void {
    this.headerdata.titleName = this.DataService.upiSearchType == 'recent' ? 'RECENT_PAYEE' : 'FAVORITE_PAYEE';
    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        console.log(events);
        let prevURL = events[0].urlAfterRedirects.replace('/', '');
        console.log('previous url', events[0].urlAfterRedirects);
        console.log('current url', events[1].urlAfterRedirects);
        history.pushState({}, prevURL, this.location.prepareExternalUrl(prevURL));
        history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
      });
    this.DataService.changeMessage(this.headerdata);
    this.payeeList = this.DataService.upiSearchPayeeList;
  }

  selectContact(contact) {
    // this.DataService.validateAddressByMobileNo(contact.number);
    this.DataService.upiValidatedVpaAdress = this.DataService.upiSearchType == 'recent' ? contact.beneVpa : contact.paymentAddress;
    this.location.back();
  }
}
