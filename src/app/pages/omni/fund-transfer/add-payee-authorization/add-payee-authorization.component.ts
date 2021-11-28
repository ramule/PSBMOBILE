import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-add-payee-authorization',
  templateUrl: './add-payee-authorization.component.html',
  styleUrls: ['./add-payee-authorization.component.scss']
})
export class AddPayeeAuthorizationComponent implements OnInit {

  commonPageComponent = {
    'headerType': 'innerHeader',
    'sidebarNAv': 'OmniNAv',
    'footer': 'innerFooter',
  }


  constructor( private router:Router, public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.commonPageComponent);
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

}
