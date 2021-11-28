import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPayeeRoutingModule } from './search-payee-routing.module';
import { SearchPayeeComponent } from './search-payee.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SearchPayeeComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    SearchPayeeRoutingModule
  ]
})
export class SearchPayeeModule { }
