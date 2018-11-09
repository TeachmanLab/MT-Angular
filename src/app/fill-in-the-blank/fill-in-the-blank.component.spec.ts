import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInTheBlankComponent } from './fill-in-the-blank.component';

describe('FillInTheBlankComponent', () => {
  let component: FillInTheBlankComponent;
  let fixture: ComponentFixture<FillInTheBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInTheBlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInTheBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
