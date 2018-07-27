import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationSessionIndicatorComponent } from './education-session-indicator.component';

describe('EducationSessionIndicatorComponent', () => {
  let component: EducationSessionIndicatorComponent;
  let fixture: ComponentFixture<EducationSessionIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationSessionIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationSessionIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
