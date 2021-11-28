import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateSendMoneyComponent } from './initiate-send-money.component';

describe('InitiateSendMoneyComponent', () => {
  let component: InitiateSendMoneyComponent;
  let fixture: ComponentFixture<InitiateSendMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateSendMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateSendMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
