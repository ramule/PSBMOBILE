import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAccountSuccessComponent } from './remove-account-success.component';

describe('RemoveAccountSuccessComponent', () => {
  let component: RemoveAccountSuccessComponent;
  let fixture: ComponentFixture<RemoveAccountSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveAccountSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAccountSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
