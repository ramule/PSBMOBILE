import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseRDAuthorizationComponent } from './close-rd-authorization.component';

describe('CloseRDAuthorizationComponent', () => {
  let component: CloseRDAuthorizationComponent;
  let fixture: ComponentFixture<CloseRDAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseRDAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseRDAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
