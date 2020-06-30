import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognitionRatingsComponent } from './recognition-ratings.component';

describe('RecognitionRatingsComponent', () => {
  let component: RecognitionRatingsComponent;
  let fixture: ComponentFixture<RecognitionRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecognitionRatingsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecognitionRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
