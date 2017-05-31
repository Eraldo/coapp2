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
  speed = 20;
  cursor = '<span class="tw-cursor">|</span>';
  active = false;

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
    let content = this.content.split(/(<[^<>]*>)/);
    this.typewriter$.next(this.cursor);

    for (let element of content) {
      let isTag = element.startsWith('<') && element.endsWith('>');
      if (isTag) {
        this.write(element);
        if (element.includes('tw-pause')) {
          let delay = element.split('"')[1];
          await this.delay(+delay);
        }
        // MAYBE: Implementing "speed change tag"
      } else {
        for (let character of element) {
          // varying values for setTimeout during typing
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
