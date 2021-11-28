import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRdAccountAuthorizationComponent } from './open-rd-account-authorization.component';

describe('OpenRdAccountAuthorizationComponent', () => {
  let component: OpenRdAccountAuthorizationComponent;
  let fixture: ComponentFixture<OpenRdAccountAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenRdAccountAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenRdAccountAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
