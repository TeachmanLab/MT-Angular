import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoughtbubbleComponent } from './thoughtbubble.component';

describe('ThoughtbubbleComponent', () => {
  let component: ThoughtbubbleComponent;
  let fixture: ComponentFixture<ThoughtbubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThoughtbubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThoughtbubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
