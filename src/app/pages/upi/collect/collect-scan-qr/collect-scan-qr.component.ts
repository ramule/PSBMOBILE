import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-collect-scan-qr',
  templateUrl: './collect-scan-qr.component.html',
  styleUrls: ['./collect-scan-qr.component.scss']
})
export class CollectScanQrComponent implements OnInit {
   
  headerdata = {
    'headerType': 'backUpiIdHeader',
    'titleName':'COLLECT',
    'footertype':'none'
  } 
  constructor(public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
  }

}
