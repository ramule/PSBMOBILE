import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../services/data.service';


@Component({
  selector: 'app-register-biller-success',
  templateUrl: './register-biller-success.component.html',
  styleUrls: ['./register-biller-success.component.scss']
})
export class RegisterBillerSuccessComponent implements OnInit {

  
  headerdata = {
    'headerType': 'none',
    'titleName':'',
    'footertype':'none'
  } 

  constructor( public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
  }
}
