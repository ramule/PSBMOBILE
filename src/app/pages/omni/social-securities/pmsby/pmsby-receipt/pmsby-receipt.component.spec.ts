import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsbyReceiptComponent } from './pmsby-receipt.component';

describe('PmsbyReceiptComponent', () => {
  let component: PmsbyReceiptComponent;
  let fixture: ComponentFixture<PmsbyReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmsbyReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsbyReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
