import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyChequeBookRoutingModule } from './my-cheque-book-routing.module';
import { MyChequeBookComponent } from './my-cheque-book.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SharedModule } from '../../../../shared/shared.module';
@NgModule({
  declarations: [MyChequeBookComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyChequeBookRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModule
  ]
})
export class MyChequeBookModule { }
