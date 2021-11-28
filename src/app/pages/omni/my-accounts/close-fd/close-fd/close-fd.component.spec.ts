import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseFdComponent } from './close-fd.component';

describe('CloseFdComponent', () => {
  let component: CloseFdComponent;
  let fixture: ComponentFixture<CloseFdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseFdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseFdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
