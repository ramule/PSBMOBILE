import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountsInfoComponent } from './my-accounts-info.component';

describe('MyAccountsInfoComponent', () => {
  let component: MyAccountsInfoComponent;
  let fixture: ComponentFixture<MyAccountsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAccountsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
