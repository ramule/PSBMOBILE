import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherBankComponent } from './other-bank.component';
import { OtherBankRoutingModule } from './other-bank-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [OtherBankComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OtherBankRoutingModule,
    SharedModule
  ]
})
export class otherBankTransferModule { 




  
}
