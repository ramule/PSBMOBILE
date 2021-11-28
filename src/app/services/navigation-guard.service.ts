import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

declare var $:any;

// in navigation guard
@Injectable()
export class NavigationGuard implements CanDeactivate<any> {
  constructor(private dataService: DataService) {}
  canDeactivate(component: any) {
    // will prevent user from going back
    if (this.dataService.isBackClick) {
      this.dataService.isBackClick = false;
      // push current state again to prevent further attempts.
      $('#logoutModal').modal('show');
      // history.pushState(null, null, location.href);
      return false;
      
    }
    return true;
  }
}


export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate>{

  constructor() { console.log('CanDeactivateGuard called') }
  canDeactivate(component: CanComponentDeactivate, 
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) {
    let url: string = state.url;
    console.log('CanDeactivateGuard Url: '+ url);
    return component.canDeactivate ? component.canDeactivate() : true;
}
}



