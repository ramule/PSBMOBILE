import { Component, OnInit,NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.scss']
})
export class LaunchComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
    public datepipe: DatePipe,
    private ngZone: NgZone,
  ) { }


  timeString = "18:00:00";
  setTime = 300
  currentTime: any;
  date: any;

  diffTimInSec1: any
  diffTimInSec2: any
  aheadTime: any;


  commonPageComponent = {
    'headerType': 'launchHeader',
    'sidebarNAv': false,
    'footer': 'none',
  }

  ngOnInit(): void {
    this.dataService.changeMessage(this.commonPageComponent);
    this.date = new Date();
    this.currentTime = this.datepipe.transform(this.date, 'HH:mm:ss').split(":");
    this.aheadTime = this.timeString.split(":")

    this.diffTimInSec1 = this.currentTime[0] * 3600 + this.currentTime[1] * 60 + (+this.currentTime[2]);
    this.diffTimInSec2 = this.aheadTime[0] * 3600 + this.aheadTime[1] * 60 + (+this.aheadTime[2]);

    this.setTime = this.diffTimInSec2 - this.diffTimInSec1
    // alert(this.setTime)

    this.ngZone.run(() => {
    setInterval(() => {
      if (this.setTime > 0) {
        this.setTime = this.setTime - 1;
        // console.log("SetTime Remaning :", this.setTime)
      } else {
        this.router.navigate(['nliLanding']);
      }
    }, 1000)
  })
}

}
