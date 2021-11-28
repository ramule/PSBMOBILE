import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmjjbySuccessRoutingModule } from './pmjjby-success-routing.module';
import { PmjjbySuccessComponent } from './pmjjby-success.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PmjjbySuccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    PmjjbySuccessRoutingModule
  ]
})
export class PmjjbySuccessModule { }
