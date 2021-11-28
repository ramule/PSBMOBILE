import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameSuccessComponent } from './username-success.component';

describe('UsernameSuccessComponent', () => {
  let component: UsernameSuccessComponent;
  let fixture: ComponentFixture<UsernameSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernameSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernameSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
