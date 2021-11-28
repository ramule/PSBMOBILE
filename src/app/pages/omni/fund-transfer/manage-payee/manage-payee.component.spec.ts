import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePayeeComponent } from './manage-payee.component';

describe('ManagePayeeComponent', () => {
  let component: ManagePayeeComponent;
  let fixture: ComponentFixture<ManagePayeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePayeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
