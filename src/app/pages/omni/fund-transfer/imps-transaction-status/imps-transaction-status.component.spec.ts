import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsTransactionStatusComponent } from './imps-transaction-status.component';

describe('ImpsTransactionStatusComponent', () => {
  let component: ImpsTransactionStatusComponent;
  let fixture: ComponentFixture<ImpsTransactionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpsTransactionStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsTransactionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
