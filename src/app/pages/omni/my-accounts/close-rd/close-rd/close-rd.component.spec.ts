import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseRdComponent } from './close-rd.component';

describe('CloseRdComponent', () => {
  let component: CloseRdComponent;
  let fixture: ComponentFixture<CloseRdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseRdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseRdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
