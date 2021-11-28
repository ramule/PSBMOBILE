import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpiMandateActiveViewDetailsComponent } from './upi-mandate-active-view-details.component';

describe('UpiMandateActiveViewDetailsComponent', () => {
  let component: UpiMandateActiveViewDetailsComponent;
  let fixture: ComponentFixture<UpiMandateActiveViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpiMandateActiveViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpiMandateActiveViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
