import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracesFormComponent } from './traces-form.component';

describe('TracesFormComponent', () => {
  let component: TracesFormComponent;
  let fixture: ComponentFixture<TracesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TracesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
