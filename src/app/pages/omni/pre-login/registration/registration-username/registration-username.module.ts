import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationUsernameComponent } from './registration-username.component';
import { RegistrationUsernameRoutingModule} from './registration-username-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModules } from '../../../../common-ui/common.module';


@NgModule({
  declarations: [RegistrationUsernameComponent],
  imports: [
    CommonModule,
    RegistrationUsernameRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules,
  ],
  exports:[
    RegistrationUsernameComponent
  ]
})
export class RegistrationUsernameModule { }
