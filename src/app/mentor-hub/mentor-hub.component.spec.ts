import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorHubComponent } from './mentor-hub.component';

describe('MentorHubComponent', () => {
  let component: MentorHubComponent;
  let fixture: ComponentFixture<MentorHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
