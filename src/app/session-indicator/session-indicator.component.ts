import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
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
  }



  ngOnInit() {
  }

}
