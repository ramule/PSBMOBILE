import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-session-timeout',
  templateUrl: './session-timeout.component.html',
  styleUrls: ['./session-timeout.component.scss']
})
export class SessionTimeoutComponent implements OnInit {
  constructor( 
    private router: Router, 
    public DataService: DataService,  
) { }

commonPageComponent = {
  'headerType': 'preloginHeaderomni',
  'sidebarNAv': 'none',
  'footer': 'innerFooter',
}
ngOnInit(): void {
  // this.DataService.setPageSettings('');
  this.DataService.changeMessage(this.commonPageComponent)
}

goToPage(routeName){
  this.router.navigateByUrl('/'+routeName);
}

}
