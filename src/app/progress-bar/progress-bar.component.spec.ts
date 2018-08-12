import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionProgresssComponent } from './session-progresss.component';

describe('SessionProgresssComponent', () => {
  let component: SessionProgresssComponent;
  let fixture: ComponentFixture<SessionProgresssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionProgresssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionProgresssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
