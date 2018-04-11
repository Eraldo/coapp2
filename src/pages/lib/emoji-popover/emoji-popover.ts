import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Icon} from "../../../models/icon";

@IonicPage()
@Component({
  selector: 'page-emoji-popover',
  templateUrl: 'emoji-popover.html',
})
export class EmojiPopoverPage {
  icons;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.icons = Icon;
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  addEmoji(emoji) {
    const callback = this.navParams.get('callback');
    if (callback) {
      callback(emoji.native)
    } else {
      this.viewCtrl.dismiss(emoji.native);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmojiPopoverPage');
  }

}
