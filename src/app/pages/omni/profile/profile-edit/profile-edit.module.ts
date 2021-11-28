import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditComponent } from './profile-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [ProfileEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule

  ],
  exports:[ProfileEditComponent]
})
export class ProfileEditModule { }
