import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageChangeComponent } from './language-change.component';

describe('LanguageChangeComponent', () => {
  let component: LanguageChangeComponent;
  let fixture: ComponentFixture<LanguageChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
