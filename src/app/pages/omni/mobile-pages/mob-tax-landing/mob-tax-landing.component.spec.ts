import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobTaxLandingComponent } from './mob-tax-landing.component';

describe('MobTaxLandingComponent', () => {
  let component: MobTaxLandingComponent;
  let fixture: ComponentFixture<MobTaxLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobTaxLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobTaxLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
