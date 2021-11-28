import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUPIComponent } from './create-upi.component';

describe('CreateUPIComponent', () => {
  let component: CreateUPIComponent;
  let fixture: ComponentFixture<CreateUPIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUPIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
