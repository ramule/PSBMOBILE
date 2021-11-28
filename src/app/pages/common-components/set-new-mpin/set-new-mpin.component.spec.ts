import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetNewMpinComponent } from './set-new-mpin.component';

describe('SetNewMpinComponent', () => {
  let component: SetNewMpinComponent;
  let fixture: ComponentFixture<SetNewMpinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetNewMpinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetNewMpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
