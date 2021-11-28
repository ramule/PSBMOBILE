import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineeDetailsComponent } from './nominee-details.component';

describe('NomineeDetailsComponent', () => {
  let component: NomineeDetailsComponent;
  let fixture: ComponentFixture<NomineeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NomineeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NomineeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
