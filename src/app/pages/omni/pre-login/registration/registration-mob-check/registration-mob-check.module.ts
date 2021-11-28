import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationMobCheckComponent } from './registration-mob-check.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModules } from '../../../../common-ui/common.module';
import  {RegistrationMobCheckRoutingModule} from './registration-mob-check-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [RegistrationMobCheckComponent],
  imports: [
    CommonModule,
    RegistrationMobCheckRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules, 
    
  ],
  exports:[RegistrationMobCheckComponent]

})
export class RegistrationMobCheckModule { }
