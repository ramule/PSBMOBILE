import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMandateComponent } from './request-mandate.component';

describe('RequestMandateComponent', () => {
  let component: RequestMandateComponent;
  let fixture: ComponentFixture<RequestMandateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestMandateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
