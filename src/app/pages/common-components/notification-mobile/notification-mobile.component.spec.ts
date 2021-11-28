import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationMobileComponent  } from './notification-mobile.component';

describe('NotificationMobileComponent', () => {
  let component: NotificationMobileComponent;
  let fixture: ComponentFixture<NotificationMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
