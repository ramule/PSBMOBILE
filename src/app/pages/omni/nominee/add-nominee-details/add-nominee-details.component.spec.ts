import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNomineeDetailsComponent } from './add-nominee-details.component';

describe('AddNomineeDetailsComponent', () => {
  let component: AddNomineeDetailsComponent;
  let fixture: ComponentFixture<AddNomineeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNomineeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNomineeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
