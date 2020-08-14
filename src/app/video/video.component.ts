import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-root',
  template: 'video.component.html',
  styles: ['video.component.css']
})
export class VideoComponent implements OnInit {

  yt_iframe_html: any;

  youtubeUrl = 'https://www.youtube.com/watch?v=iHhcHTlGtRs';

  constructor(private embedService: EmbedVideoService) {
   //# this.yt_iframe_html = this.embedService.embed(this.youtubeUrl);
  }

  ngOnInit() {
  }

}
