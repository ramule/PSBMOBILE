import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayeeAuthorizationComponent } from './add-payee-authorization.component';

describe('AddPayeeAuthorizationComponent', () => {
  let component: AddPayeeAuthorizationComponent;
  let fixture: ComponentFixture<AddPayeeAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPayeeAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPayeeAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
