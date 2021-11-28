import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DetailedStatementRoutingModule } from './detailed-statement-routing.module';
import { DetailedStatementComponent } from './detailed-statement.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from "angular-datatables";


@NgModule({
  declarations: [DetailedStatementComponent],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    ReactiveFormsModule,
    DetailedStatementRoutingModule,
    SharedModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    DataTablesModule
  ]
})
export class DetailedStatementModule { }
