import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavOmniComponent } from './side-nav-omni.component';

describe('SideNavOmniComponent', () => {
  let component: SideNavOmniComponent;
  let fixture: ComponentFixture<SideNavOmniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavOmniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavOmniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
