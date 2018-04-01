import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DateService} from "../../services/date/date";
import {ScopeService} from "../../services/scope/scope";
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {Scope} from "../../models/scope";
import moment from "moment";

@Component({
  selector: 'scoped-date-picker',
  templateUrl: 'scoped-date-picker.html'
})
export class ScopedDatePickerComponent {
  @Input() scope = Scope.DAY;
  @Input() date = moment().format('YYYY-MM-DD');
  @Output() dateChanged = new EventEmitter();
  @Output() scopeChanged = new EventEmitter();

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
      this.scopeService.zoomOut(this.scope).then(scope => this.scopeChanged.next(scope), console.log);
      return false; // Prevent bubbling
    }, [], 'zoom out'));
    this.hotkeysService.add(new Hotkey('z+i', (event: KeyboardEvent): boolean => {
      this.scopeService.zoomIn(this.scope).then(scope => this.scopeChanged.next(scope), console.log);
      return false; // Prevent bubbling
    }, [], 'zoom in'));
    this.hotkeysService.add(new Hotkey('z+t', (event: KeyboardEvent): boolean => {
      this.dateChanged.next(moment().format('YYYY-MM-DD'));
      return false; // Prevent bubbling
    }, [], "zoom to today's date"));
  }

  next() {
    this.dateService.next(this.scope, this.date).then(date => this.dateChanged.next(date), console.log)
  }

  previous() {
    this.dateService.previous(this.scope, this.date).then(date => this.dateChanged.next(date), console.log)
  }

  selectDate() {
    this.dateService.selectDate(this.date).then(date => this.dateChanged.next(date), console.log);
  }

  ngOnDestroy() {
    for (const combo of ['k', 'j', 'z+o', 'z+i']) {
      const shortcut = this.hotkeysService.get(combo);
      this.hotkeysService.remove(shortcut);
    }
  }
}
