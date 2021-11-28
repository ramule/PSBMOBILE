import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotlistCardAuthorizationComponent } from './hotlist-card-authorization.component';

describe('HotlistCardAuthorizationComponent', () => {
  let component: HotlistCardAuthorizationComponent;
  let fixture: ComponentFixture<HotlistCardAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotlistCardAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotlistCardAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
