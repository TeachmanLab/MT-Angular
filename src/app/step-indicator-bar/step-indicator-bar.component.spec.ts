import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepIndicatorBarComponent } from './step-indicator-bar.component';

describe('StepIndicatorBarComponent', () => {
  let component: StepIndicatorBarComponent;
  let fixture: ComponentFixture<StepIndicatorBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepIndicatorBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepIndicatorBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
