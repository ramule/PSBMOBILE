import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmjjbyAuthorizationComponent } from './pmjjby-authorization.component';

describe('PmjjbyAuthorizationComponent', () => {
  let component: PmjjbyAuthorizationComponent;
  let fixture: ComponentFixture<PmjjbyAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmjjbyAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmjjbyAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
