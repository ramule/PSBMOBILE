import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpiMandateRevokeViewDetailsComponent } from './upi-mandate-revoke-view-details.component';

describe('UpiMandateRevokeViewDetailsComponent', () => {
  let component: UpiMandateRevokeViewDetailsComponent;
  let fixture: ComponentFixture<UpiMandateRevokeViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpiMandateRevokeViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpiMandateRevokeViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
