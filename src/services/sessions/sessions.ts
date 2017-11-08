import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AlertController} from "ionic-angular";

@Injectable()
export class SessionsService {
  audio;
  loaded = false;
  time = new BehaviorSubject<number>(0);

  get paused() {
    return this.audio.paused
  }

  get muted() {
    return this.audio.muted
  }

  get currentTime() {
    return this.time.value;
  }

  constructor(public http: Http, private alertCtrl: AlertController) {
    console.log('Hello SessionsService Provider');
    this.audio = new Audio();
    this.audio.src = "assets/audio/session.mp3";
    this.audio.ontimeupdate = event => {
      this.time.next(this.audio.currentTime);
    };
    this.audio.onended = event => {
      let alert = this.alertCtrl.create({
        title: 'Session complete',
        message: 'High 5!<br>Time to take a break. ;)',
        buttons: ['Ok']
      });
      alert.present();
    };
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
