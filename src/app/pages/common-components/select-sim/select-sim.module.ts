import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectSimComponent } from './select-sim.component';
import { SelectSimRoutingModule } from './select-sim-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModules } from '../../common-ui/common.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [SelectSimComponent],
  imports: [
    CommonModule,
    SelectSimRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    SharedModule,
    CommonModules
  ]
})
export class SelectSimModule { }
