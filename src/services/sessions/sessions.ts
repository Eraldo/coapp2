import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SessionsService {
  audio;
  loaded = false;

  get paused() {
    return this.audio.paused
  }

  get muted() {
    return this.audio.muted
  }

  get currentTime() {
    return this.audio.currentTime;
  }

  constructor(public http: Http) {
    console.log('Hello SessionsService Provider');
    this.audio = new Audio();
    this.audio.src = "assets/audio/session.mp3";
  }

  play() {
    if (!this.loaded) {
      this.audio.load();
      this.loaded = true;
    }
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  stop() {}

  mute() {
    this.audio.muted = true;
  }

  unmute() {
    this.audio.muted = false;
  }

  toggleMute() {
    this.audio.muted = !this.audio.muted
  }
}
