import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { SharedModule } from '../../../shared/shared.module';




@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class FeedbackModule { }
