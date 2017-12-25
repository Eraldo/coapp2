import { Component } from '@angular/core';
import {DateService} from "../../services/date/date";
import {ScopeService} from "../../services/scope/scope";
import {Hotkey, HotkeysService} from "angular2-hotkeys";

@Component({
  selector: 'scoped-date-picker',
  templateUrl: 'scoped-date-picker.html'
})
export class ScopedDatePickerComponent {

  constructor(private dateService: DateService, private scopeService: ScopeService, private hotkeysService: HotkeysService) {
    console.log('Hello ScopedDatePickerComponent Component');
  }

  ngOnInit() {
    this.hotkeysService.add(new Hotkey('j', (event: KeyboardEvent): boolean => {
      this.previous();
      return false; // Prevent bubbling
    }, [], 'previous'));
    this.hotkeysService.add(new Hotkey('k', (event: KeyboardEvent): boolean => {
      this.next();
      return false; // Prevent bubbling
    }, [], 'next'));
    this.hotkeysService.add(new Hotkey('z+o', (event: KeyboardEvent): boolean => {
      this.scopeService.zoomOut();
      return false; // Prevent bubbling
    }, [], 'zoom out'));
    this.hotkeysService.add(new Hotkey('z+i', (event: KeyboardEvent): boolean => {
      this.scopeService.zoomIn();
      return false; // Prevent bubbling
    }, [], 'zoom in'));
  }

  next() {
    this.dateService.next()
  }

  previous() {
    this.dateService.previous()
  }

  selectDate() {
    this.dateService.selectDate();
  }
}
