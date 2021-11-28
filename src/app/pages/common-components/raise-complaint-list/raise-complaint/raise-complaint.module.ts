import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaiseComplaintRoutingModule } from './raise-complaint-routing.module';
import { RaiseComplaintComponent } from './raise-complaint.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RaiseComplaintComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RaiseComplaintRoutingModule
  ]
})
export class RaiseComplaintModule { }
