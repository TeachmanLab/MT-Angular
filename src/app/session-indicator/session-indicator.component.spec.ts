import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionIndicatorComponent } from './session-indicator.component';

describe('SessionIndicatorComponent', () => {
  let component: SessionIndicatorComponent;
  let fixture: ComponentFixture<SessionIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
