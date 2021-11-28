import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NomineeOverviewRoutingModule } from './nominee-overview-routing.module';
import { NomineeOverviewComponent } from './nominee-overview.component';


@NgModule({
  declarations: [NomineeOverviewComponent],
  imports: [
    CommonModule,
    NomineeOverviewRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class NomineeOverviewModule { }
