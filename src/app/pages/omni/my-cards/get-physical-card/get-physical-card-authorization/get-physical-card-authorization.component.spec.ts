import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPhysicalCardAuthorizationComponent } from './get-physical-card-authorization.component';

describe('GetPhysicalCardAuthorizationComponent', () => {
  let component: GetPhysicalCardAuthorizationComponent;
  let fixture: ComponentFixture<GetPhysicalCardAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPhysicalCardAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPhysicalCardAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
