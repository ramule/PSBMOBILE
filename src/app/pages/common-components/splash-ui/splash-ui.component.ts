import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-splash-ui',
  templateUrl: './splash-ui.component.html',
  styleUrls: ['./splash-ui.component.scss']
})
export class SplashUiComponent implements OnInit {
  commonPageComponent = {
    'headerType': 'none',
    'sidebarNAv': false,
    'footer': 'none'
  }
  constructor(public DataService: DataService,) { }

  ngOnInit(): void {
    this.commonPageComponent = {
      'headerType': 'none',
      'sidebarNAv': false,
      'footer': 'none'
    }
  this.DataService.changeMessage(this.commonPageComponent);
  }

}

