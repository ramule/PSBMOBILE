import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DthBillComponent } from './dth-bill.component';

describe('DthBillComponent', () => {
  let component: DthBillComponent;
  let fixture: ComponentFixture<DthBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DthBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DthBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
