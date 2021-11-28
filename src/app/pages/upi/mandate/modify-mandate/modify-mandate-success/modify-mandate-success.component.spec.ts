import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMandateSuccessComponent } from './modify-mandate-success.component';

describe('ModifyMandateSuccessComponent', () => {
  let component: ModifyMandateSuccessComponent;
  let fixture: ComponentFixture<ModifyMandateSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyMandateSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyMandateSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
