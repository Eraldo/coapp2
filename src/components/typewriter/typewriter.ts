import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'typewriter',
  templateUrl: 'typewriter.html'
})
export class TypewriterComponent {
  @ViewChild('contentWrapper') contentWrapper: ElementRef;
  @ViewChild('writer') writer: ElementRef;

  @Input()
  autostart = false;
  default_speed = 0;
  speed = this.default_speed;
  default_pause = 500;

  private active = false;
  private content: string;
  private cursor = '<span class="tw-cursor">|</span>';
  private typewriter$ = new BehaviorSubject<string>('');

  private htmlTagRegex = /(<[^<>]*>)/;
  private pauseTagRegex = /<tw-pause(?:.*ms="(\d+)".*)?>/;
  private speedTagRegex = /<tw-speed(?:.*ms="(\d+)".*)?>/;

  constructor() {
    console.log('Hello TypewriterComponent Component');
  }

  start() {
    this.content = this.contentWrapper.nativeElement.innerHTML;
    this.type();
  }

  skip() {

  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private write(content) {
    const value = this.typewriter$.value;
    const index = value.indexOf(this.cursor);
    const newValue = value.substr(0, index) + content + value.substr(index);
    this.typewriter$.next(newValue);

    // TODO: Scroll to bottom of text.
    // this.writer.nativeElement
    // this.writer.nativeElement.offsetTop =
    // document.getElementById('content')
    // this.contentRef.scrollToBottom(300)//300ms animation speed
  }

  private reset() {
    this.typewriter$.next(this.cursor);
    this.content = this.contentWrapper.nativeElement.innerHTML;
  }

  async type() {
    this.active = true;
    let content = this.content.split(this.htmlTagRegex);
    this.typewriter$.next(this.cursor);

    for (let element of content) {
      let isTag = element.startsWith('<') && element.endsWith('>');
      if (isTag) {
        this.write(element);
        if (element.startsWith('<tw-pause')) {
          // "pause tag - stop typing for some time"
          const milliseconds = element.match(this.pauseTagRegex)[1] || this.default_pause;
          await this.delay(+milliseconds);
        } else if (element.startsWith('<tw-speed')) {
          // "speed tag - change the typing speed"
          const milliseconds = element.match(this.speedTagRegex)[1] || this.default_speed;
          this.speed = +milliseconds;
        }
      } else {
        for (let character of element) {
          // varying values for pause during typing
          // can't be global since number changes each time loop is executed
          let humanize = Math.round(Math.random() * (100 - 30)) + this.speed;
          await this.delay(humanize);
          this.write(character);
        }
      }
    }
    this.active = false;
  }

  ngAfterViewInit() {
    if (this.autostart) {
      this.start();
      // setTimeout(() => {
      //   this.start();
      // }, 1000);
    }
  }
}
