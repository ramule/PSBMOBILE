import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-about-upi',
  templateUrl: './about-upi.component.html',
  styleUrls: ['./about-upi.component.scss']
})
export class AboutUpiComponent implements OnInit {
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName':'About',
    'footertype':'none'
  }
  constructor( private router:Router, public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

}
