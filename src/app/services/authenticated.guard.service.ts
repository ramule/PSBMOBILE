import { Injectable, Injector } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import {DataService} from './data.service'
@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor( private router: Router,private injector : Injector ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        var dataService = this.injector.get(DataService);
        if (dataService.isOmniLogin || dataService.isUPILogin) {
          return true;
        }
        return false;
     }
}