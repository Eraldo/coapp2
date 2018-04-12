import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Icon} from "../../../models/icon";

@IonicPage()
@Component({
  selector: 'page-emoji-popover',
  templateUrl: 'emoji-popover.html',
})
export class EmojiPopoverPage {
  @ViewChild('picker') picker;
  icons;
  emojis = [];

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private elementRef: ElementRef, public renderer: Renderer2) {
    this.icons = Icon;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmojiPopoverPage');
  }

  ngAfterViewInit() {
    // Set the width of this popover to scape automatically.
    const parent = this.elementRef.nativeElement.closest('.popover-content');
    this.renderer.setStyle(parent, 'width', 'auto');
  }

  addEmoji(emoji) {
    this.emojis.push(emoji);
    const callback = this.navParams.get('callback');
    if (callback) {
      callback(emoji.native)
    } else {
      this.viewCtrl.dismiss(emoji.native);
    }
  }

}
