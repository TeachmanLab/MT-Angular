import {Component, Input, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input()
  total: number;

  @Input()
  current: number;

  @Input()
  color: string;

  counter: Array<any>;

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('progress-next',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/progress/tiny_arrow.svg'));
    iconRegistry.addSvgIcon('connector',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/progress/connector.svg'));
    iconRegistry.addSvgIcon('connector-blank',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/progress/connector_blank.svg'));
    iconRegistry.addSvgIcon('circle-open',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/progress/circle_open.svg'));
    iconRegistry.addSvgIcon('circle-full',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/progress/circle_full.svg'));
    iconRegistry.addSvgIcon('checked',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/progress/checked.svg'));
  }


  ngOnInit() {
    this.counter = Array(this.total);
    console.log("The total size is : " + this.total);
    console.log("The counter is an array of size: " + this.counter.length);
  }

}
