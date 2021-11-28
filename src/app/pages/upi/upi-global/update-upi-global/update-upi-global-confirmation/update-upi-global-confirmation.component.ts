import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';

@Component({
  selector: 'app-update-upi-global-confirmation',
  templateUrl: './update-upi-global-confirmation.component.html',
  styleUrls: ['./update-upi-global-confirmation.component.scss']
})
export class UpdateUpiGlobalConfirmationComponent implements OnInit {

  headerdata = {
    'headerType': 'TitleClose',
    'titleName':'Confirmation',
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
