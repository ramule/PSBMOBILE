import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqOmniRoutingModule } from './faq-omni-routing.module';
import { FaqOmniComponent } from './faq-omni.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModules } from '../../common-ui/common.module';


@NgModule({
  declarations: [FaqOmniComponent],
  imports: [
    CommonModule,
    FaqOmniRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules
  ]
})
export class FaqOmniModule { }
