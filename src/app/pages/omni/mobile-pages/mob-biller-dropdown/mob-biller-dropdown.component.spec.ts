import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobBillerDropdownComponent } from './mob-biller-dropdown.component';

describe('MobBillerDropdownComponent', () => {
  let component: MobBillerDropdownComponent;
  let fixture: ComponentFixture<MobBillerDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobBillerDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobBillerDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
