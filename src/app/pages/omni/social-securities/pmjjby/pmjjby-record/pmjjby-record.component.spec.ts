import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmjjbyRecordComponent } from './pmjjby-record.component';

describe('PmjjbyRecordComponent', () => {
  let component: PmjjbyRecordComponent;
  let fixture: ComponentFixture<PmjjbyRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmjjbyRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmjjbyRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
