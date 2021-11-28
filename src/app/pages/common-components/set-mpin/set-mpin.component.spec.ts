import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMpinComponent } from './set-mpin.component';

describe('SetMpinComponent', () => {
  let component: SetMpinComponent;
  let fixture: ComponentFixture<SetMpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetMpinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetMpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
