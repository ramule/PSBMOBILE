import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeAddSuccessComponent } from './payee-add-success.component';

describe('PayeeAddSuccessComponent', () => {
  let component: PayeeAddSuccessComponent;
  let fixture: ComponentFixture<PayeeAddSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayeeAddSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeAddSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
