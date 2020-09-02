import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import {ProgressItem} from '../progress-bar/progress-bar.component';
import {Session} from '../interfaces';

@Component({
  selector: 'app-session-indicator',
  templateUrl: './session-indicator.component.html',
  styleUrls: ['./session-indicator.component.scss']
})
export class SessionIndicatorComponent implements OnInit {

  @Input()
  session: Session;

  @Input()
  active = false;

  @Input()
  title = false;

  @Input()
  steps = false;

  @Input()
  isStory = false;

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('session1',
      sanitizer.bypassSecurityTrustResourceUrl('assets/control/s1.svg'));
    iconRegistry.addSvgIcon('session2',
      sanitizer.bypassSecurityTrustResourceUrl('assets/control/s2.svg'));
    iconRegistry.addSvgIcon('session3',
      sanitizer.bypassSecurityTrustResourceUrl('assets/control/s3.svg'));
    iconRegistry.addSvgIcon('session4',
      sanitizer.bypassSecurityTrustResourceUrl('assets/control/s4.svg'));
    iconRegistry.addSvgIcon('session5',
      sanitizer.bypassSecurityTrustResourceUrl('assets/control/s5.svg'));
    iconRegistry.addSvgIcon('recognitionRatings',
      sanitizer.bypassSecurityTrustResourceUrl('assets/training_images/example_icons/recognitionRatings.svg'));
    iconRegistry.addSvgIcon('training1',
      sanitizer.bypassSecurityTrustResourceUrl('assets/training_images/example_icons/s1.svg'));
    iconRegistry.addSvgIcon('training2',
      sanitizer.bypassSecurityTrustResourceUrl('assets/training_images/example_icons/s2.svg'));
    iconRegistry.addSvgIcon('training3',
      sanitizer.bypassSecurityTrustResourceUrl('assets/training_images/example_icons/s3.svg'));
    iconRegistry.addSvgIcon('training4',
      sanitizer.bypassSecurityTrustResourceUrl('assets/training_images/example_icons/s4.svg'));
    iconRegistry.addSvgIcon('training5',
      sanitizer.bypassSecurityTrustResourceUrl('assets/training_images/example_icons/s5.svg'));
  }



  ngOnInit() {
  }

}
