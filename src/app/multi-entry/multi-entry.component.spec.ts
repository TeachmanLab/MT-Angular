import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiEntryComponent } from './multi-entry.component';

describe('MultiEntryComponent', () => {
  let component: MultiEntryComponent;
  let fixture: ComponentFixture<MultiEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
