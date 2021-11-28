import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalDetailsRoutingModule } from './personal-details-routing.module';
import { PersonalDetailsComponent } from './personal-details.component';
import { CommonModules } from '../../common-ui/common.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [PersonalDetailsComponent],
  imports: [
    CommonModule,
    PersonalDetailsRoutingModule,
    SharedModule,
    CommonModules
  ]
})
export class PersonalDetailsModule { }
