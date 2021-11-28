import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpiMandateCompletedDetailsComponent } from './upi-mandate-completed-details.component';

describe('UpiMandateCompletedDetailsComponent', () => {
  let component: UpiMandateCompletedDetailsComponent;
  let fixture: ComponentFixture<UpiMandateCompletedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpiMandateCompletedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpiMandateCompletedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
