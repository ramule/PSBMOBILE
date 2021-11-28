import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageChangeComponent } from './language-change.component';
import {LanguageChangeRoutingModule} from './language-change-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModules } from '../../common-ui/common.module';

@NgModule({
  declarations: [LanguageChangeComponent],
  imports: [
    CommonModule,
    LanguageChangeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules
  ]
})
export class LanguageChangeModule { }
