import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChequeBookViewDetailsComponent } from './my-cheque-book-view-details.component';

describe('MyChequeBookViewDetailsComponent', () => {
  let component: MyChequeBookViewDetailsComponent;
  let fixture: ComponentFixture<MyChequeBookViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyChequeBookViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChequeBookViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
