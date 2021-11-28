import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyRegisteredComponent } from './already-registered.component';

describe('AlreadyRegisteredComponent', () => {
  let component: AlreadyRegisteredComponent;
  let fixture: ComponentFixture<AlreadyRegisteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlreadyRegisteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
