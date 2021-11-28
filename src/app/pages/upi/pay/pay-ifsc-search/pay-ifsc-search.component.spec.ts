import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayIfscSearchComponent } from './pay-ifsc-search.component';

describe('PayIfscSearchComponent', () => {
  let component: PayIfscSearchComponent;
  let fixture: ComponentFixture<PayIfscSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayIfscSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayIfscSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
