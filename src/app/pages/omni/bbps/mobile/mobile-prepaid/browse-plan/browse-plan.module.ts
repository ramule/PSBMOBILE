import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowsePlanRoutingModule } from './browse-plan-routing.module';
import { BrowsePlanComponent } from './browse-plan.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BrowsePlanComponent
  ],
  imports: [
    CommonModule,
    BrowsePlanRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BrowsePlanModule { }
