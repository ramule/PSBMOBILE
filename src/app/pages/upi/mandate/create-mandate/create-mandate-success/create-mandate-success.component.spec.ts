import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMandateSuccessComponent } from './create-mandate-success.component';

describe('CreateMandateSuccessComponent', () => {
  let component: CreateMandateSuccessComponent;
  let fixture: ComponentFixture<CreateMandateSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMandateSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMandateSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
