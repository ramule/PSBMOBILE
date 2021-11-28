import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveMandateSuccessComponent } from './approve-mandate-success.component';

describe('ApproveMandateSuccessComponent', () => {
  let component: ApproveMandateSuccessComponent;
  let fixture: ComponentFixture<ApproveMandateSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveMandateSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveMandateSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
