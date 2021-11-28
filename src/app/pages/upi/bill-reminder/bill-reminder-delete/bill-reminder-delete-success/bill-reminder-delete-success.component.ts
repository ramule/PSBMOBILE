import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../services/data.service';


@Component({
  selector: 'app-bill-reminder-delete-success',
  templateUrl: './bill-reminder-delete-success.component.html',
  styleUrls: ['./bill-reminder-delete-success.component.scss']
})
export class BillReminderDeleteSuccessComponent implements OnInit {

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
