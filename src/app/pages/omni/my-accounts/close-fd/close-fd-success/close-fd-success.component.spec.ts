import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseFDSuccessComponent } from './close-fd-success.component';

describe('CloseFDSuccessComponent', () => {
  let component: CloseFDSuccessComponent;
  let fixture: ComponentFixture<CloseFDSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseFDSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseFDSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
