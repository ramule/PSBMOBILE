import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsbyAuthorizationComponent } from './pmsby-authorization.component';

describe('PmsbyAuthorizationComponent', () => {
  let component: PmsbyAuthorizationComponent;
  let fixture: ComponentFixture<PmsbyAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmsbyAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsbyAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
