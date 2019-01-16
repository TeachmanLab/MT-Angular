import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingScoreComponent } from './training-score.component';

describe('TrainingScoreComponent', () => {
  let component: TrainingScoreComponent;
  let fixture: ComponentFixture<TrainingScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
