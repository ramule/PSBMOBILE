import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { FavoritePayeeRoutingModule } from './favorite-payee-routing.module';
import { FavoritePayeeComponent } from './favorite-payee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/*****modified by USER PSB1*****/
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from "angular-datatables";
/*****modified by USER PSB1 ENDS*****/

@NgModule({
  declarations: [FavoritePayeeComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FavoritePayeeRoutingModule,
    SharedModule,    
    NgxPaginationModule, //Added by User PSB1
    DataTablesModule //Added by User PSB1
  ]
})
export class FavoritePayeeModule { }
