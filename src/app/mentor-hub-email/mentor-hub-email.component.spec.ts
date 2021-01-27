import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorHubEmailComponent } from './mentor-hub-email.component';

describe('MentorHubComponent', () => {
  let component: MentorHubEmailComponent;
  let fixture: ComponentFixture<MentorHubEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorHubEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorHubEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
