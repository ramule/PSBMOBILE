import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagePayeeComponent } from './manage-payee.component';
import {ManagePayeeRoutingModule} from './manage-payee-routing.module'
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [ManagePayeeComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule, 
    ManagePayeeRoutingModule,
    NgxPaginationModule,
    DataTablesModule
  ]
})
export class ManagePayeeModule { }
