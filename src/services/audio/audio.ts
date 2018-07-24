import {Injectable} from '@angular/core';
import {ToastController} from "ionic-angular";

export enum Sound {
  SUCCESS = 'success.wav',
  ACHIEVEMENT = 'tada-success.wav',
}

@Injectable()
export class AudioService {
  loading = true;
  query$;
  audio;

  constructor(public toastCtrl: ToastController) {
    console.log('Hello AudioService Service');
  }

  play(sound: Sound) {
    this.audio = new Audio();
    this.audio.src = `assets/audio/${sound}`;
    this.audio.load();
    this.audio.play();
  }
}
