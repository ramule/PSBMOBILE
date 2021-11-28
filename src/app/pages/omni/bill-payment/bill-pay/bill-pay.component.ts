import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-bill-pay',
  templateUrl: './bill-pay.component.html',
  styleUrls: ['./bill-pay.component.scss']
})
export class BillPayComponent implements OnInit {

  moreClicked:boolean = false;

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.initialization();
  
  }


  initialization(){
    this.dataService.setPageSettings('RECHARGE_AND_BILL_PAY');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
  }

}
