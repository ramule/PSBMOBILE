import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteUpiIdSuccessRoutingModule } from './delete-upi-id-success-routing.module';
import { DeleteUpiIdSuccessComponent } from './delete-upi-id-success.component';
import { CommonModules } from '../../../common-ui/common.module';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [DeleteUpiIdSuccessComponent],
  imports: [
    CommonModule,
    DeleteUpiIdSuccessRoutingModule,
    SharedModule,
    CommonModules
  ]
})
export class DeleteUpiIdSuccessModule { }
