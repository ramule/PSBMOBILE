import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFavoritePayeeRoutingModule } from './search-favorite-payee-routing.module';
import { SearchFavoritePayeeComponent } from './search-favorite-payee.component';
import { CommonModules } from '../../common-ui/common.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchFavoritePayeeComponent],
  imports: [
    CommonModule,
    SearchFavoritePayeeRoutingModule,
    CommonModules,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class SearchFavoritePayeeModule { }
