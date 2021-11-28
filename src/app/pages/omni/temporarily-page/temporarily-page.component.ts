import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-temporarily-page',
  templateUrl: './temporarily-page.component.html',
  styleUrls: ['./temporarily-page.component.scss']
})
export class TemporarilyPageComponent implements OnInit {

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
  this.DataService.gotpage ="";
}

goToPage(routeName){
  this.router.navigateByUrl('/'+routeName);
}
}
