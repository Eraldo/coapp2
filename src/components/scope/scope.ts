import {Component, Input, OnInit} from '@angular/core';
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

  constructor(public alertCtrl: AlertController, private scopeService: ScopeService) {
    console.log('Hello ScopeComponent Component');
  }

  ngOnInit(): void {
    this.scope$ = this.scopeService.scope$;
  }

  select() {
    this.scopeService.selectScope()
  }
}
