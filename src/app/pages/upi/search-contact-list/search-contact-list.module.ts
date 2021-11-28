import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchContactListRoutingModule } from './search-contact-list-routing.module';
import { SearchContactListComponent } from './search-contact-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SearchContactListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    SearchContactListRoutingModule
  ]
})
export class SearchContactListModule { }
