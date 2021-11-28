import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeStatusListComponent } from './cheque-status-list.component';

describe('ChequeStatusListComponent', () => {
  let component: ChequeStatusListComponent;
  let fixture: ComponentFixture<ChequeStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequeStatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
