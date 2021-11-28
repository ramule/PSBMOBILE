import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfTransferSuccessComponent } from './self-transfer-success.component';

describe('SelfTransferSuccessComponent', () => {
  let component: SelfTransferSuccessComponent;
  let fixture: ComponentFixture<SelfTransferSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfTransferSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfTransferSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
