import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Icon} from "../../../models/icon";

@IonicPage()
@Component({
  selector: 'page-emoji-modal',
  templateUrl: 'emoji-modal.html',
})
export class EmojiModalPage {
  icons;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.icons = Icon;
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  addEmoji(emoji) {
    console.log('>>', emoji.native);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmojiModalPage');
  }

}
