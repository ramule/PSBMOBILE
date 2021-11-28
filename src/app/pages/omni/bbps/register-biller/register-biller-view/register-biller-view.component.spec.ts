import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBillerViewComponent } from './register-biller-view.component';

describe('RegisterBillerViewComponent', () => {
  let component: RegisterBillerViewComponent;
  let fixture: ComponentFixture<RegisterBillerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBillerViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBillerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
