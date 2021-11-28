import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {OtpRoutingModule} from './otp-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpComponent } from './otp.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModules } from '../../../common-ui/common.module';



@NgModule({
  declarations: [OtpComponent],
  imports: [
    CommonModule,
    OtpRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules
  ],
  exports:[
    OtpComponent,
  ]
})
export class OtpModule { }
