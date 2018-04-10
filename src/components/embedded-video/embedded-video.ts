import {Component, Input} from '@angular/core';
import {EmbedVideoService} from "ngx-embed-video";

@Component({
  selector: 'embedded-video',
  templateUrl: 'embedded-video.html'
})
export class EmbeddedVideoComponent {
  @Input()
  videoUrl;
  @Input()
  width;
  @Input()
  height;

  get content() {
    const attributes = {};
    if (this.width) attributes['width'] = this.width;
    if (this.height) attributes['height'] = this.height;
    return this.embedVideoService.embed(this.videoUrl, {attr: attributes})
  }

  constructor(private embedVideoService: EmbedVideoService) {
    console.log('Hello EmbeddedVideoComponent Component');
  }

}
