import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePinAuthorizationComponent } from './generate-pin-authorization.component';

describe('GeneratePinAuthorizationComponent', () => {
  let component: GeneratePinAuthorizationComponent;
  let fixture: ComponentFixture<GeneratePinAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePinAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePinAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
