import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeElectricityBillDetailsComponent } from './home-electricity-bill-details.component';

describe('HomeElectricityBillDetailsComponent', () => {
  let component: HomeElectricityBillDetailsComponent;
  let fixture: ComponentFixture<HomeElectricityBillDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeElectricityBillDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeElectricityBillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
