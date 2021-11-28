import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UgradeCardRoutingModule } from './upgrade-card-routing.module';
import { UpgradeCardComponent } from './upgrade-card.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [UpgradeCardComponent],
  imports: [
    CommonModule,
    UgradeCardRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UpgradeCardModule { }
