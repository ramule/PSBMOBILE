import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NreDepositeComponent } from './nre-deposite.component';

describe('NreDepositeComponent', () => {
  let component: NreDepositeComponent;
  let fixture: ComponentFixture<NreDepositeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NreDepositeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NreDepositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
