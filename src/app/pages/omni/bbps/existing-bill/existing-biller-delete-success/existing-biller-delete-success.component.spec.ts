import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingBillerDeleteSuccessComponent } from './existing-biller-delete-success.component';

describe('ExistingBillerDeleteSuccessComponent', () => {
  let component: ExistingBillerDeleteSuccessComponent;
  let fixture: ComponentFixture<ExistingBillerDeleteSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingBillerDeleteSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingBillerDeleteSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
