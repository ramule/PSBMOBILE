import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChequeBookRequestComponent } from './cheque-book-request.component';
import {ChequeBookRequestRoutingModule} from './cheque-book-request-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module'

@NgModule({
  declarations: [ChequeBookRequestComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    ChequeBookRequestRoutingModule,
    
  ]
})
export class ChequeBookRequestModule { }
