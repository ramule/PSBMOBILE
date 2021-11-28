import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositivePayConfirmationRoutingModule } from './positive-pay-confirmation-routing.module';
import { PositivePayConfirmationComponent } from './positive-pay-confirmation.component';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [PositivePayConfirmationComponent],
  imports: [  
    CommonModule,
    PositivePayConfirmationRoutingModule,
    SharedModule
  ]
})
export class PositivePayConfirmationModule { }
