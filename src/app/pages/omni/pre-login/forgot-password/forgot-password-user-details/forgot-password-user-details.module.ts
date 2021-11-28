import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordUserDetailsComponent } from './forgot-password-user-details.component';



@NgModule({
  declarations: [ForgotPasswordUserDetailsComponent],
  imports: [
    CommonModule
  ],
  exports:[ForgotPasswordUserDetailsComponent]
})
export class ForgotPasswordUserDetailsModule { }
