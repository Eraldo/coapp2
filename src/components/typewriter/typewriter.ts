import {Component, ElementRef, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'typewriter',
  templateUrl: 'typewriter.html'
})
export class TypewriterComponent {
  @ViewChild('contentWrapper') contentWrapper: ElementRef;
  @ViewChild('writer') writer: ElementRef;

  content: string;
  typewriter$ = new BehaviorSubject<string>('');
  default_speed = 50;
  speed = this.default_speed;
  default_pause = 500;
  cursor = '<span class="tw-cursor">|</span>';
  active = false;

  htmlTagRegex = /(<[^<>]*>)/;
  pauseTagRegex = /<tw-pause(?:.*ms="(\d+)".*)?>/;
  speedTagRegex = /<tw-speed(?:.*ms="(\d+)".*)?>/;

  constructor() {
    console.log('Hello TypewriterComponent Component');
  }

  delay(ms: number) {
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
    this.content = this.contentWrapper.nativeElement.innerHTML;
    this.type();
  }
}
