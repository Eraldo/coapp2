import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ScopeService} from "../../../services/scope/scope";

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
  loading = true;
  query$;
  private form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private formBuilder: FormBuilder, private scopeService: ScopeService, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatsPage');
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      // scope: [scope.toUpperCase(), Validators.required],
      // start: [],
      area1: [50, Validators.required],
      area2: [50, Validators.required],
      area3: [50, Validators.required],
      area4: [50, Validators.required],
      area5: [50, Validators.required],
      area6: [50, Validators.required],
      area7: [50, Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      console.log(this.form.value)
    }
  }

  showTutorial(name) {
    this.navCtrl.push('TutorialPage', {name})
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('HomeOptionsPage');
    popover.present({ev: source});
  }
}
