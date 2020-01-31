import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomNonPreviousStatementComponent } from './random-non-previous-statement.component';

describe('RandomNonPreviousStatementComponent', () => {
  let component: RandomNonPreviousStatementComponent;
  let fixture: ComponentFixture<RandomNonPreviousStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomNonPreviousStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomNonPreviousStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
