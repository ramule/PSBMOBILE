import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationTpinComponent } from './registration-tpin.component';

describe('RegistrationTpinComponent', () => {
  let component: RegistrationTpinComponent;
  let fixture: ComponentFixture<RegistrationTpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationTpinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationTpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
