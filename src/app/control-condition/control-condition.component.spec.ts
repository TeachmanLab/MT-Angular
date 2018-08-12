import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlConditionComponent } from './control-condition.component';

describe('ControlConditionComponent', () => {
  let component: ControlConditionComponent;
  let fixture: ComponentFixture<ControlConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
