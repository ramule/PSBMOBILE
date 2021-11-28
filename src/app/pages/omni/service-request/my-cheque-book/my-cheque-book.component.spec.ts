import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChequeBookComponent } from './my-cheque-book.component';

describe('MyChequeBookComponent', () => {
  let component: MyChequeBookComponent;
  let fixture: ComponentFixture<MyChequeBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyChequeBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChequeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
