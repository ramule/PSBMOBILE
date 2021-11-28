import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReissueCardSuccessRoutingModule } from './reissue-card-success-routing.module';
import { ReissueCardSuccessComponent } from './reissue-card-success.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ReissueCardSuccessComponent],
  imports: [
    CommonModule,
    ReissueCardSuccessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ReissueCardSuccessModule { }
