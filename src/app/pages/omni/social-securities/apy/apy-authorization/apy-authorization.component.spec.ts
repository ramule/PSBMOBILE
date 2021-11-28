import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApyAuthorizationComponent } from './apy-authorization.component';

describe('ApyAuthorizationComponent', () => {
  let component: ApyAuthorizationComponent;
  let fixture: ComponentFixture<ApyAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApyAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApyAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
