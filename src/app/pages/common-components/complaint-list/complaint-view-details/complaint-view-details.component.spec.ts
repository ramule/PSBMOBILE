import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintViewDetailsComponent } from './complaint-view-details.component';

describe('ComplaintViewDetailsComponent', () => {
  let component: ComplaintViewDetailsComponent;
  let fixture: ComponentFixture<ComplaintViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
