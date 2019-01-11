import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalScoreTestviewComponent } from './final-score-testview.component';

describe('FinalScoreTestviewComponent', () => {
  let component: FinalScoreTestviewComponent;
  let fixture: ComponentFixture<FinalScoreTestviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalScoreTestviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalScoreTestviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
