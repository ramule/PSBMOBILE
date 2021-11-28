import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobChequebookLandingComponent } from './mob-chequebook-landing.component';

describe('MobChequebookLandingComponent', () => {
  let component: MobChequebookLandingComponent;
  let fixture: ComponentFixture<MobChequebookLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobChequebookLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobChequebookLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
