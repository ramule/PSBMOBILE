import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyForFdRdComponent } from './apply-for-fd-rd.component';

describe('ApplyForFdRdComponent', () => {
  let component: ApplyForFdRdComponent;
  let fixture: ComponentFixture<ApplyForFdRdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyForFdRdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyForFdRdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
