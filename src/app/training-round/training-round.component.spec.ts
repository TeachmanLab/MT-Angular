import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRoundComponent } from './training-round.component';

describe('TrainingRoundComponent', () => {
  let component: TrainingRoundComponent;
  let fixture: ComponentFixture<TrainingRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
