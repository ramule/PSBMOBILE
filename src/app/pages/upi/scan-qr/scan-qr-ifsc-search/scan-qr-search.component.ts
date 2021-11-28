import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';

declare var createGlobalNavMore: any;

@Component({
  selector: 'app-pay-ifsc-search',
  templateUrl: './pay-ifsc-search.component.html',
  styleUrls: ['./pay-ifsc-search.component.scss']
})
export class PayIfscSearchComponent implements OnInit {

  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName':'IFSC Search',
    'footertype':'none'
  }
  ifscSearch: FormGroup;

  constructor( public DataService: DataService,
  public router: Router) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    this.DataService.setPageSettings('PAY_IFSC_SEARCH');
    createGlobalNavMore();
  }

  buildForm() {
    // this.ifscSearch = new FormGroup({
    //   bank: new FormControl('', [Validators.required]),
    //   stateCity: new FormControl('', [Validators.required]),
    //   branch: new FormControl('', [Validators.required])
    // });
  }

}
