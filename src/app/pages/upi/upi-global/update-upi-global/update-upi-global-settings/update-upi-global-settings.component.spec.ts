import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUpiGlobalSettingsComponent } from './update-upi-global-settings.component';

describe('UpdateUpiGlobalSettingsComponent', () => {
  let component: UpdateUpiGlobalSettingsComponent;
  let fixture: ComponentFixture<UpdateUpiGlobalSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUpiGlobalSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUpiGlobalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
