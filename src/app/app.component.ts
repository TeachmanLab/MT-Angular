import {Component} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  // Add the Google Analytics settings dynamically.
  constructor() {
    if (environment.gaTrackingId) {
      // register google tag manager
      const gTagManagerScript = document.createElement('script');
      gTagManagerScript.async = true;
      gTagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gaTrackingId}`;
      document.head.appendChild(gTagManagerScript);

      // register google analytics
      const gaScript = document.createElement('script');
      gaScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', '${environment.gaTrackingId}');
    `;
      document.head.appendChild(gaScript);
    }
  }

}


