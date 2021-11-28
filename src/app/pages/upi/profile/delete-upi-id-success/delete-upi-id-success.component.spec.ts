import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUpiIdSuccessComponent } from './delete-upi-id-success.component';

describe('DeleteUpiIdSuccessComponent', () => {
  let component: DeleteUpiIdSuccessComponent;
  let fixture: ComponentFixture<DeleteUpiIdSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUpiIdSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUpiIdSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
