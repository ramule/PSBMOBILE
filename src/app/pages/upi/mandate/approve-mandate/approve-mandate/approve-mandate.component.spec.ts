import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveMandateComponent } from './approve-mandate.component';

describe('ApproveMandateComponent', () => {
  let component: ApproveMandateComponent;
  let fixture: ComponentFixture<ApproveMandateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveMandateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
