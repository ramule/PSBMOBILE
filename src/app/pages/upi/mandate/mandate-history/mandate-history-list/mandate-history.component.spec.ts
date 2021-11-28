import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateHistoryComponent } from './mandate-history.component';

describe('MandateHistoryComponent', () => {
  let component: MandateHistoryComponent;
  let fixture: ComponentFixture<MandateHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandateHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
