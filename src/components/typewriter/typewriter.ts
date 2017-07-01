import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
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

  default_speed = 50;
  speed = this.default_speed;
  default_pause = 500;
  skipped = false;

  @Output()
  done: EventEmitter<boolean> = new EventEmitter();
  @Output()
  changed: EventEmitter<boolean> = new EventEmitter();

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
    this.reset();
    this.type();
  }

  skip() {
    this.skipped = true;
    this.reset();
    this.typewriter$.next(this.content);
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private write(content) {
    if (this.skipped) return;
    const value = this.typewriter$.value;
    const index = value.indexOf(this.cursor);
    const newValue = value.substr(0, index) + content + value.substr(index);
    this.typewriter$.next(newValue);


    // TODO: Scroll to bottom of text. (next line is a workaround)
    this.changed.next()
    // this.contentWrapper.nativeElement.scrollTop = this.contentWrapper.nativeElement.scrollHeight;
    // this.writer.nativeElement
    // this.writer.nativeElement.offsetTop =
    // document.getElementById('content')
    // this.contentRef.scrollToBottom(300)//300ms animation speed
  }

  private reset() {
    this.content = this.contentWrapper.nativeElement.innerHTML;
  }

  async type() {
    this.active = true;
    this.typewriter$.next(this.cursor);
    let content = this.content.split(this.htmlTagRegex);

    for (let element of content) {
      if (this.skipped) break;
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
    this.done.next(true)
  }

  ngAfterViewInit() {
    if (this.autostart) {
      this.start();
    }
  }
}
