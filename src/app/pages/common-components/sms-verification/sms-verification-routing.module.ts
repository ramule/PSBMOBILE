
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmsVerificationComponent} from '../../common-components/sms-verification/sms-verification.component'

const routes: Routes = [
  {path: '', component: SmsVerificationComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsVerificationRoutingModule { }
