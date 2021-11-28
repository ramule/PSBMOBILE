import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopChequeAuthorizationComponent } from './stop-cheque-authorization.component';

describe('StopChequeAuthorizationComponent', () => {
  let component: StopChequeAuthorizationComponent;
  let fixture: ComponentFixture<StopChequeAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopChequeAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StopChequeAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
