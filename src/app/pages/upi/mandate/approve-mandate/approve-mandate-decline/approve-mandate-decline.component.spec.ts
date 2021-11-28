import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveMandateDeclineComponent } from './approve-mandate-decline.component';

describe('ApproveMandateDeclineComponent', () => {
  let component: ApproveMandateDeclineComponent;
  let fixture: ComponentFixture<ApproveMandateDeclineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveMandateDeclineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveMandateDeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
