import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModules } from '../../../common-ui/common.module';
import { PersonalInfoComponent } from './personal-info.component';
import { PersonalInfoRoutingModule } from './personal-info-routing.module';

@NgModule({
  declarations: [ PersonalInfoComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules,
    PersonalInfoRoutingModule
  ]
})

export class PersonalInfoModule { }
