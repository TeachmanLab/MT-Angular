import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingLetterComponent } from './missing-letter.component';

describe('MissingLetterComponent', () => {
  let component: MissingLetterComponent;
  let fixture: ComponentFixture<MissingLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
