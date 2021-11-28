import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSimComponent } from './select-sim.component';

describe('SelectSimComponent', () => {
  let component: SelectSimComponent;
  let fixture: ComponentFixture<SelectSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
