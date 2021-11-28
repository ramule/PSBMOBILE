import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveMandateViewDetailsComponent } from './approve-mandate-view-details.component';

describe('ApproveMandateViewDetailsComponent', () => {
  let component: ApproveMandateViewDetailsComponent;
  let fixture: ComponentFixture<ApproveMandateViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveMandateViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveMandateViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
