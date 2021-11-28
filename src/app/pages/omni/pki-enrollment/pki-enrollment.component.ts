import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-pki-enrollment',
  templateUrl: './pki-enrollment.component.html',
  styleUrls: ['./pki-enrollment.component.scss']
})
export class PkiEnrollmentComponent implements OnInit {



  constructor( 
    private router: Router, 
    public DataService: DataService,  
) { }

ngOnInit(): void {
  this.DataService.setPageSettings('PKI_ENROLLMENT');
  this.DataService.setShowThemeObservable(true)
  this.DataService.setShowsideNavObservable(true)
  this.DataService.setShowNotificationObservable(true);
  this.DataService.getBreadcrumb('PKI_ENROLLMENT' , this.router.url)
}

  pkiEnrollmentSubmit(){
    // alert('sms send') ;
  }

}
