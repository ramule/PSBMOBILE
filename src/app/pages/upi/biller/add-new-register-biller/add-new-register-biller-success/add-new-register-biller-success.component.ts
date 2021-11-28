import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../services/data.service';


@Component({
  selector: 'app-add-new-register-biller-success',
  templateUrl: './add-new-register-biller-success.component.html',
  styleUrls: ['./add-new-register-biller-success.component.scss']
})
export class AddNewRegisterBillerSuccessComponent implements OnInit {

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
