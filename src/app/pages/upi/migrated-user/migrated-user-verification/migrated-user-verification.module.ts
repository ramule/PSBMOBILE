import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MigratedUserVerificationRoutingModule } from './migrated-user-verification-routing.module';
import { MigratedUserVerificationComponent } from './migrated-user-verification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MigratedUserVerificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MigratedUserVerificationRoutingModule
  ]
})
export class MigratedUserVerificationModule { }
