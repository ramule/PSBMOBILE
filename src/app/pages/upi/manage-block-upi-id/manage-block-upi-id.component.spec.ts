import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBlockUpiIdComponent } from './manage-block-upi-id.component';

describe('ManageBlockUpiIdComponent', () => {
  let component: ManageBlockUpiIdComponent;
  let fixture: ComponentFixture<ManageBlockUpiIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBlockUpiIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBlockUpiIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
