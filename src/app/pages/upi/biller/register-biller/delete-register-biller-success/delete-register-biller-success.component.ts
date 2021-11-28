import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../services/data.service';


@Component({
  selector: 'app-delete-register-biller-success',
  templateUrl: './delete-register-biller-success.component.html',
  styleUrls: ['./delete-register-biller-success.component.scss']
})
export class DeleteRegisterBillerSuccessComponent implements OnInit {

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
