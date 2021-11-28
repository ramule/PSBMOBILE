import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../services/data.service';
declare var gstPay: any;

@Component({
  selector: 'app-gst-pay',
  templateUrl: './gst-pay.component.html',
  styleUrls: ['./gst-pay.component.scss']
})
export class GstPayComponent implements OnInit {

  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName':'Pay',
    'footertype':'none'
  } 

  constructor( private router:Router, public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    gstPay();
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 


}
