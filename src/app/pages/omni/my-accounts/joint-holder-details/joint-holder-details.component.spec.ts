import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointHolderDetailsComponent } from './joint-holder-details.component';

describe('JointHolderDetailsComponent', () => {
  let component: JointHolderDetailsComponent;
  let fixture: ComponentFixture<JointHolderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JointHolderDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JointHolderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
