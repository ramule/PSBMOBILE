import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectOtherBankComponent } from './select-other-bank.component';
import { SelectOtherBankRoutingModule } from './select-other-bank-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { CommonModules } from '../../common-ui/common.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [SelectOtherBankComponent],
  imports: [
    CommonModule, 
    SelectOtherBankRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModules,
    SharedModule
  ]
})
export class SelectOtherBankModule { }
