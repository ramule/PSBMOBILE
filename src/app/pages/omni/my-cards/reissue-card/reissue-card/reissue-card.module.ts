import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReissueCardRoutingModule } from './reissue-card-routing.module';
import { ReissueCardComponent } from './reissue-card.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ReissueCardComponent],
  imports: [
    CommonModule,
    ReissueCardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ReissueCardModule { }
