import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionWarningComponent } from './session-warning.component';

describe('SessionWarningComponent', () => {
  let component: SessionWarningComponent;
  let fixture: ComponentFixture<SessionWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
