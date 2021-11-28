import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsbyRecordComponent } from './pmsby-record.component';

describe('PmsbyRecordComponent', () => {
  let component: PmsbyRecordComponent;
  let fixture: ComponentFixture<PmsbyRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmsbyRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsbyRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
