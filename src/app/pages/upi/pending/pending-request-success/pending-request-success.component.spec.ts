import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestSuccessComponent } from './pending-request-success.component';

describe('PendingRequestSuccessComponent', () => {
  let component: PendingRequestSuccessComponent;
  let fixture: ComponentFixture<PendingRequestSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingRequestSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRequestSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
