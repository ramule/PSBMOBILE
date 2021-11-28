import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRdAccountSuccessReceiptComponent } from './open-rd-account-success-receipt.component';

describe('OpenRdAccountSuccessReceiptComponent', () => {
  let component: OpenRdAccountSuccessReceiptComponent;
  let fixture: ComponentFixture<OpenRdAccountSuccessReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenRdAccountSuccessReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenRdAccountSuccessReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
