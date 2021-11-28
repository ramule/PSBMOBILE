import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { Location , DatePipe} from '@angular/common';




@Component({
  selector: 'app-standing-instruction-view',
  templateUrl: './standing-instruction-view.component.html',
  styleUrls: ['./standing-instruction-view.component.scss']
})
export class StandingInstructionViewComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods,
    private location : Location,
    private datePipe : DatePipe
  ) { }

  standingInstructionList : any ;
  numberOfInstallment : any ;

  ngOnInit(): void {
    this.DataService.setPageSettings('STANDING_INSTRUCTION_OVERVIEW');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('STANDING_INSTRUCTION_OVERVIEW' , this.router.url)

    var siDataTemp = this.location.getState()
    this.standingInstructionList =siDataTemp['modifySi']
    this.numberOfInstallment = this.standingInstructionList[0]['NO SI period']
    console.log("Number of installment - ", this.numberOfInstallment)

    console.log("standingInstructionList - ", this.standingInstructionList)

  }

  
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 
}
