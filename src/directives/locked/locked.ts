import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[locked]' // Attribute selector
})
export class LockedDirective {

  constructor(private el: ElementRef) {
    console.log('Hello LockedDirective Directive');
    console.log(this.el.nativeElement);
    this.el.nativeElement.style.backgroundColor = 'blue !important';
  }

}
