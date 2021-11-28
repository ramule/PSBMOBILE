import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMpinComponent } from './change-mpin.component';

describe('ChangeMpinComponent', () => {
  let component: ChangeMpinComponent;
  let fixture: ComponentFixture<ChangeMpinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMpinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
