import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdsCertificateComponent } from './tds-certificate.component';

describe('TdsCertificateComponent', () => {
  let component: TdsCertificateComponent;
  let fixture: ComponentFixture<TdsCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdsCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TdsCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
