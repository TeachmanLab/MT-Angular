import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Highlight } from '../interfaces'

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {

  @Input()
  highlight: Highlight;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('physical-health',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/step-body-images/highlight-icons/physical-health.svg'));
    iconRegistry.addSvgIcon('thinking',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/step-body-images/highlight-icons/thinking.svg'));
    iconRegistry.addSvgIcon('relationships',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/step-body-images/highlight-icons/relationships.svg'));
    iconRegistry.addSvgIcon('other-psychological-problems',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/step-body-images/highlight-icons/other-psychological-problems.svg'));
    iconRegistry.addSvgIcon('face-your-fears',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/step-body-images/highlight-icons/face-your-fears.svg'));
    iconRegistry.addSvgIcon('live-healthy',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/step-body-images/highlight-icons/live-healthy.svg'));
    iconRegistry.addSvgIcon('think-flexibly',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/step-body-images/highlight-icons/think-flexibly.svg'));
    iconRegistry.addSvgIcon('open-up-to-others',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/step-body-images/highlight-icons/open-up-to-others.svg'));
  }

  ngOnInit() {
    this.highlight.content = this.highlight.title + ' ' + this.highlight.highlight; // for populating pageData
    this.allDone();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.highlight.isFirstChange()) {
      this.highlight = changes.highlight.currentValue;
      this.allDone();
    }
  }

  allDone() {
    this.done.emit();
  }

}
