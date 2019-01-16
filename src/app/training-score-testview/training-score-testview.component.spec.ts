import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingScoreTestviewComponent } from './training-score-testview.component';

describe('TrainingScoreTestviewComponent', () => {
  let component: TrainingScoreTestviewComponent;
  let fixture: ComponentFixture<TrainingScoreTestviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingScoreTestviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingScoreTestviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
