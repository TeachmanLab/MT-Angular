import {Component, Input, OnInit} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {

  @Input()
  items: ProgressItem[];

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('progress-next',
      sanitizer.bypassSecurityTrustResourceUrl('assets/progress/tiny_arrow.svg'));
    iconRegistry.addSvgIcon('connector',
      sanitizer.bypassSecurityTrustResourceUrl('assets/progress/connector.svg'));
    iconRegistry.addSvgIcon('connector-blank',
      sanitizer.bypassSecurityTrustResourceUrl('assets/progress/connector_blank.svg'));
    iconRegistry.addSvgIcon('circle-open',
      sanitizer.bypassSecurityTrustResourceUrl('assets/progress/circle_open.svg'));
    iconRegistry.addSvgIcon('circle-full',
      sanitizer.bypassSecurityTrustResourceUrl('assets/progress/circle_full.svg'));
    iconRegistry.addSvgIcon('checked',
      sanitizer.bypassSecurityTrustResourceUrl('assets/progress/checked.svg'));
  }

}

export interface ProgressItem {
  // status can be complete, active, incomplete, or error.
  status: string;
}
