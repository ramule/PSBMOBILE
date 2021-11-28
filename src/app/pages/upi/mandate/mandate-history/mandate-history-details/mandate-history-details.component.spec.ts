import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateHistoryDetailsComponent } from './mandate-history-details.component';

describe('MandateHistoryDetailsComponent', () => {
  let component: MandateHistoryDetailsComponent;
  let fixture: ComponentFixture<MandateHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandateHistoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandateHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
