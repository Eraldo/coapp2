import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the ArcadePage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-arcade',
  templateUrl: 'arcade.html'
})
@IonicPage()
export class ArcadePage {

  adventuresRoot = 'AdventuresPage'
  gamesRoot = 'GamesPage'
  shopRoot = 'ShopPage'
  contestsRoot = 'ContestsPage'


  constructor(public navCtrl: NavController) {}

}
