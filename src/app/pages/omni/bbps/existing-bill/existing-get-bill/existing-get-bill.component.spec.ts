import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingGetBillComponent } from './existing-get-bill.component';

describe('ExistingGetBillComponent', () => {
  let component: ExistingGetBillComponent;
  let fixture: ComponentFixture<ExistingGetBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingGetBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingGetBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
