import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantPayComponent } from './instant-pay.component';

describe('InstantPayComponent', () => {
  let component: InstantPayComponent;
  let fixture: ComponentFixture<InstantPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstantPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
