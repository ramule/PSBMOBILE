import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';


@Component({
  selector: 'app-transaction-rejected',
  templateUrl: './transaction-rejected.component.html',
  styleUrls: ['./transaction-rejected.component.scss']
})
export class TransactionRejectedComponent implements OnInit {
  headerdata = {
    'headerType': 'none',
    'titleName':'',
    'footertype':'none'
  } 

  constructor(private router:Router, public DataService: DataService) {}

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
  }


}
