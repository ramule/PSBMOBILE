import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDepositsComponent } from './my-deposits.component';

describe('MyDepositsComponent', () => {
  let component: MyDepositsComponent;
  let fixture: ComponentFixture<MyDepositsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDepositsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
