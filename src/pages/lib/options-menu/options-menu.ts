import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {OptionsMenuService} from "../../../services/options-menu/options-menu";

@IonicPage()
@Component({
  selector: 'page-options-menu',
  templateUrl: 'options-menu.html',
})
export class OptionsMenuPage {
  options;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public optionsMenuService: OptionsMenuService,
  ) {
  }

  ngOnInit() {
    this.options = this.optionsMenuService.options;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsMenuPage');
  }

}
