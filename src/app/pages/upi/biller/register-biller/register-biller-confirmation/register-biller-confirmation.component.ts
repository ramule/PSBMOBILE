import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';

@Component({
  selector: 'app-register-biller-confirmation',
  templateUrl: './register-biller-confirmation.component.html',
  styleUrls: ['./register-biller-confirmation.component.scss']
})
export class RegisterBillerConfirmationComponent implements OnInit {

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
