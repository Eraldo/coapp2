import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertController} from "ionic-angular";
import {Scope} from "../../models/scope";
import {ScopeService} from "../../services/scope/scope";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'scope',
  templateUrl: 'scope.html'
})
export class ScopeComponent implements OnInit {
  scope$: Observable<Scope>;
  @Input() showText = true;
  @Input() showIcon = false;
  @Input() scope = Scope.DAY;
  @Output() changed = new EventEmitter();

  constructor(public alertCtrl: AlertController, private scopeService: ScopeService) {
    console.log('Hello ScopeComponent Component');
  }

  ngOnInit(): void {
  }

  select() {
    this.scopeService.selectScope(this.scope).then(scope => {
      this.changed.next(scope);
    }, console.log)
  }
}
