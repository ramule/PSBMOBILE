import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseFDAuthorizationComponent } from './close-fd-authorization.component';

describe('CloseFDAuthorizationComponent', () => {
  let component: CloseFDAuthorizationComponent;
  let fixture: ComponentFixture<CloseFDAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseFDAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseFDAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
