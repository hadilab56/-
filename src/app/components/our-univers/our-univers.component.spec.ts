import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurUniversComponent } from './our-univers.component';

describe('OurUniversComponent', () => {
  let component: OurUniversComponent;
  let fixture: ComponentFixture<OurUniversComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurUniversComponent]
    });
    fixture = TestBed.createComponent(OurUniversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
