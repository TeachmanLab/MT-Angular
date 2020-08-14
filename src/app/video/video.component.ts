import {Component, Input, OnInit} from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import {Video} from '../interfaces';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styles: ['video.component.css']
})
export class VideoComponent implements OnInit {

  @Input()
  video: Video;

  yt_iframe_html: any;

  constructor(private embedService: EmbedVideoService) {
  }

  ngOnInit() {
    console.log('Using video url:', this.video.content);
    this.yt_iframe_html = this.embedService.embed(this.video.content);
  }

}
