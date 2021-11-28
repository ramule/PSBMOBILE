import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOtherBankComponent } from './select-other-bank.component';

describe('SelectOtherBankComponent', () => {
  let component: SelectOtherBankComponent;
  let fixture: ComponentFixture<SelectOtherBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectOtherBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOtherBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
