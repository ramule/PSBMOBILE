import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidBillInfosComponent } from './unpaid-bill-infos.component';

describe('UnpaidBillInfosComponent', () => {
  let component: UnpaidBillInfosComponent;
  let fixture: ComponentFixture<UnpaidBillInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnpaidBillInfosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpaidBillInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
