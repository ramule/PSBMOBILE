import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
@Component({
  selector: 'registration-header',
  templateUrl: './registration-header.component.html',
  styleUrls: ['./registration-header.component.scss']
})
export class RegisterHeaderComponent implements OnInit {
  commonPageComponent:any;
  constructor(public DataService:DataService,) { }

  ngOnInit(): void {


  }

}
