import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnBankComponent } from './own-bank.component';

describe('OwnBankComponent', () => {
  let component: OwnBankComponent;
  let fixture: ComponentFixture<OwnBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
