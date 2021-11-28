import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseRDSuccessComponent } from './close-rd-success.component';

describe('CloseRDSuccessComponent', () => {
  let component: CloseRDSuccessComponent;
  let fixture: ComponentFixture<CloseRDSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseRDSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseRDSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
