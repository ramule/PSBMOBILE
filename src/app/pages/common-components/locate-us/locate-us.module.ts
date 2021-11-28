import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocateUsComponent } from './locate-us.component';
import {LocateUsRoutingModule} from './locate-us-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModules } from '../../common-ui/common.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [LocateUsComponent],
  imports: [
    CommonModule,
    LocateUsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    SharedModule,
    CommonModules
  ]
})
export class LocateUsModule { }
