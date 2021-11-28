import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-transaction-success',
  templateUrl: './transaction-success.component.html',
  styleUrls: ['./transaction-success.component.scss']
})
export class TransactionSuccessComponent implements OnInit {

  constructor(private router:Router, public DataService: DataService) {}
 headerdata = {
    'headerType': 'none',
    'titleName':'',
    'footertype':'none'
  } 
  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);

  }


}
