import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
declare var inviteContactList: any;



@Component({
  selector: 'app-invite-contact-list',
  templateUrl: './invite-contact-list.component.html',
  styleUrls: ['./invite-contact-list.component.scss']
})
export class InviteContactListComponent implements OnInit {

  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName':'Invite Contact',
    'footertype':'none'
  } 

  constructor( private router:Router, public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    inviteContactList();
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 
}
