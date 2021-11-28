import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMandateViewDetailsComponent } from './request-mandate-view-details.component';

describe('RequestMandateViewDetailsComponent', () => {
  let component: RequestMandateViewDetailsComponent;
  let fixture: ComponentFixture<RequestMandateViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestMandateViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestMandateViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
