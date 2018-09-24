import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionIndicatorBarComponent } from './session-indicator-bar.component';

describe('SessionIndicatorBarComponent', () => {
  let component: SessionIndicatorBarComponent;
  let fixture: ComponentFixture<SessionIndicatorBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionIndicatorBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionIndicatorBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
