import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingConditionComponent } from './training-condition.component';

describe('TrainingConditionComponent', () => {
  let component: TrainingConditionComponent;
  let fixture: ComponentFixture<TrainingConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
