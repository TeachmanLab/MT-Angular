import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-warning',
  templateUrl: './session-warning.component.html',
  styleUrls: ['./session-warning.component.scss']
})
export class SessionWarningComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }


  goHome () {
    this.router.navigate(['']);
  }

}
