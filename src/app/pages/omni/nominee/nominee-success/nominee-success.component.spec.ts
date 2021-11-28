import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineeSuccessComponent } from './nominee-success.component';

describe('NomineeSuccessComponent', () => {
  let component: NomineeSuccessComponent;
  let fixture: ComponentFixture<NomineeSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NomineeSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NomineeSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
