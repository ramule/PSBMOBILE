import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../services/data.service';


@Component({
  selector: 'app-add-bill-reminder-success',
  templateUrl: './add-bill-reminder-success.component.html',
  styleUrls: ['./add-bill-reminder-success.component.scss']
})
export class AddBillReminderSuccessComponent implements OnInit {

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
