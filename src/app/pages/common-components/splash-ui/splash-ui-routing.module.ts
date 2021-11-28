import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashUiComponent } from './splash-ui.component';

const routes: Routes = [
{path: '', component: SplashUiComponent},];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SplashUiRoutingModule { }
