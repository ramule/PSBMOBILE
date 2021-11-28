import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileBillComponent } from './mobile-bill/mobile-bill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { ElectricityBillComponent } from './electricity-bill/electricity-bill.component';
import { LandlineBillComponent } from './landline-bill/landline-bill.component';
import { WaterBillComponent } from './water-bill/water-bill.component';
import { DthBillComponent } from './dth-bill/dth-bill.component';
import { GasBillComponent } from './gas-bill/gas-bill.component';
import { TaxComponent } from './tax/tax.component';
import { InsuranceBillComponent } from './insurance-bill/insurance-bill.component';
import { DonationComponent } from './donation/donation.component';

@NgModule({
  declarations: [
    MobileBillComponent, 
    ElectricityBillComponent, 
    LandlineBillComponent,
    WaterBillComponent,
    DthBillComponent, 
    GasBillComponent, 
    TaxComponent, 
    InsuranceBillComponent, DonationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[MobileBillComponent, 
    ElectricityBillComponent, 
    LandlineBillComponent, 
    WaterBillComponent, 
    DthBillComponent , 
    GasBillComponent, 
    TaxComponent , 
    InsuranceBillComponent, DonationComponent]

})
export class BillTypeModule { }
