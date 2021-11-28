import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MigratedUserVerificationComponent } from './migrated-user-verification.component';

const routes: Routes = [
  {path: '', component: MigratedUserVerificationComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MigratedUserVerificationRoutingModule { }
