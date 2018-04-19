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
  @Input()
  query;

  // YT;
  // player;

  get content() {
    const attributes = {id: 'player'};
    if (this.width) attributes['width'] = this.width;
    if (this.height) attributes['height'] = this.height;

    // youtube options: velopers.google.com/youtube/player_parameters
    let query = {rel: 0, modestbranding: 1, origin: window.location.origin, enablejsapi: 1};
    if (this.query) Object.assign(query, this.query);

    return this.embedVideoService.embed(this.videoUrl, {attr: attributes, query})
  }

  constructor(private embedVideoService: EmbedVideoService) {
    console.log('Hello EmbeddedVideoComponent Component');
  }

  // ngOnInit() {
  //   var tag = document.createElement('script');
  //   tag.src = 'https://www.youtube.com/iframe_api';
  //   var firstScriptTag = document.getElementsByTagName('script')[0];
  //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  //
  //   window['onYouTubeIframeAPIReady'] = (e) => {
  //     this.YT = window['YT'];
  //     this.player = new window['YT'].Player('player', {
  //       events: {
  //         // 'onStateChange': this.onPlayerStateChange.bind(this),
  //         // 'onError': this.onPlayerError.bind(this),
  //         // 'onReady': (e) => {
  //         //   alert('ready');
  //         //   this.play();
  //         // }
  //       }
  //     });
  //   };
  // }
  // play() {
  //   this.player.playVideo()
  // }
}
