import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../../../../utilities/common-methods';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-non-register',
  templateUrl: './non-register.component.html',
  styleUrls: ['./non-register.component.scss']
})
export class NonRegisterComponent implements OnInit {

  mobNumber: any;

  constructor(private commonMethod: CommonMethods, private storage: LocalStorageService, private router: Router,private dataService : DataService) { }

  ngOnInit(): void {
    this.initialization();
  }

  initialization() {
    // this.dataService.setPageSettings('ALREADY_REGISTERED');
    this.mobNumber = this.commonMethod.maskMobileNumber(this.storage.getLocalStorage("mobileNo"));
  }
  
  routeTo(location) {

    this.router.navigate([location]);
  }

}
