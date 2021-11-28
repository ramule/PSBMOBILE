import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopChequesComponent } from './stop-cheques.component';

describe('StopChequesComponent', () => {
  let component: StopChequesComponent;
  let fixture: ComponentFixture<StopChequesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopChequesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopChequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
