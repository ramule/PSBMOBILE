import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-track-card-application',
  templateUrl: './track-card-application.component.html',
  styleUrls: ['./track-card-application.component.scss']
})
export class TrackCardApplicationComponent implements OnInit {

  constructor( 
    private router: Router, 
    public DataService: DataService,  
) { }

ngOnInit(): void {
  this.DataService.setPageSettings('TRACK_CARD_APPLICATION');
  this.DataService.setShowThemeObservable(true)
  this.DataService.setShowsideNavObservable(true)
  this.DataService.setShowNotificationObservable(true);
  this.DataService.getBreadcrumb('TRACK_CARD_APPLICATION' , this.router.url)
}

goToPage(routeName){
  this.router.navigateByUrl('/'+routeName);
} 

}
