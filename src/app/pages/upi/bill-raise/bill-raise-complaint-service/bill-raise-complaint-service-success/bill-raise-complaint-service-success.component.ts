import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../services/data.service';


@Component({
  selector: 'app-bill-raise-complaint-service-success',
  templateUrl: './bill-raise-complaint-service-success.component.html',
  styleUrls: ['./bill-raise-complaint-service-success.component.scss']
})
export class BillRaiseComplaintServiceSuccessComponent implements OnInit {

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
