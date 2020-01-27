import {
  Component,
  ComponentFactoryResolver, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {ElementEvent, MultiEntry} from '../interfaces';
import {FillInTheBlankComponent} from '../fill-in-the-blank/fill-in-the-blank.component';

@Component({
  selector: 'app-multi-entry',
  templateUrl: './multi-entry.component.html',
  styleUrls: ['./multi-entry.component.css']
})
export class MultiEntryComponent implements OnInit {

  @Input()
  multiEntry: MultiEntry;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  @Output()
  updated: EventEmitter<ElementEvent> = new EventEmitter();

  constructor(private factoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    // No real steps to complete, just let the containing element know that.
    this.done.emit();
    this.addDynamicComponent();  // Add first entry
  }

  addDynamicComponent() {
    const factory = this.factoryResolver.resolveComponentFactory(FillInTheBlankComponent);
    const component = factory.create(this.viewContainerRef.parentInjector);
    component.instance.fillInBlank = this.multiEntry.fillInBlank;
    component.instance.force_focus = true;
    component.instance.done.subscribe(v => this.addDynamicComponent());
    this.viewContainerRef.insert(component.hostView);
  }

}
