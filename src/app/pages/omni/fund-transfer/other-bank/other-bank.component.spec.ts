import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherBankComponent } from './other-bank.component';

describe('OtherBankComponent', () => {
  let component: OtherBankComponent;
  let fixture: ComponentFixture<OtherBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
