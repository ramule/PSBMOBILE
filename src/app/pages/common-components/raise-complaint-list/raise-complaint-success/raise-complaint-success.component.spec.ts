import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseComplaintSuccessComponent } from './raise-complaint-success.component';

describe('RaiseComplaintSuccessComponent', () => {
  let component: RaiseComplaintSuccessComponent;
  let fixture: ComponentFixture<RaiseComplaintSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiseComplaintSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseComplaintSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
