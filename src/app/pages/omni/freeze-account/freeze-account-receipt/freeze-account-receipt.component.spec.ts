import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezeAccountReceiptComponent } from './freeze-account-receipt.component';

describe('FreezeAccountReceiptComponent', () => {
  let component: FreezeAccountReceiptComponent;
  let fixture: ComponentFixture<FreezeAccountReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreezeAccountReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreezeAccountReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
