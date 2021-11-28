import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';


@Component({
  selector: 'app-deactivate-upi-global-success',
  templateUrl: './deactivate-upi-global-success.component.html',
  styleUrls: ['./deactivate-upi-global-success.component.scss']
})
export class DeactivateUpiGlobalSuccessComponent implements OnInit {

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
