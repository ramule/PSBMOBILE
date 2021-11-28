import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';


@Component({
  selector: 'app-transaction-fail',
  templateUrl: './transaction-fail.component.html',
  styleUrls: ['./transaction-fail.component.scss']
})
export class TransactionFailComponent implements OnInit {
  
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
