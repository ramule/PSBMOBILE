import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMandateSuccessComponent } from './request-mandate-success.component';

describe('RequestMandateSuccessComponent', () => {
  let component: RequestMandateSuccessComponent;
  let fixture: ComponentFixture<RequestMandateSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestMandateSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestMandateSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
