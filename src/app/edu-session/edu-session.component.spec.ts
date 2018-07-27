import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduSessionComponent } from './edu-session.component';

describe('EduSessionComponent', () => {
  let component: EduSessionComponent;
  let fixture: ComponentFixture<EduSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
