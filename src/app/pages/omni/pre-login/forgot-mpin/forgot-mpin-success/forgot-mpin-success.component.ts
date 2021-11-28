import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';


@Component({
  selector: 'app-forgot-mpin-success',
  templateUrl: './forgot-mpin-success.component.html',
  styleUrls: ['./forgot-mpin-success.component.scss']
})
export class ForgotMpinSuccessComponent implements OnInit {

  commonPageComponent = {
    'headerType': 'preloginHeaderomni',
    'sidebarNAv': 'none',
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
