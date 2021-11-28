import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCustDetailsComponent } from './registration-cust-details.component';

describe('RegistrationCustDetailsComponent', () => {
  let component: RegistrationCustDetailsComponent;
  let fixture: ComponentFixture<RegistrationCustDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationCustDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationCustDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
