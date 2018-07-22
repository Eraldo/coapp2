import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../models/icon";
import {Hotkey, HotkeysService} from "angular2-hotkeys";

const Query = gql`
  query {
    tutorialCompleted: hasCheckpoint(name: "office tutorial")
    outcomesCheckpoint: hasCheckpoint(name: "outcomes tutorial")
    achievementsCheckpoint: hasCheckpoint(name: "achievements tutorial")
  }
`;

@IonicPage({ priority: 'high', segment: 'office'})
@Component({
  selector: 'page-office',
  templateUrl: 'office.html',
})
export class OfficePage {
  @ViewChild(Tabs) tabs;
  loading = true;
  query$;
  icons;
  outcomesCheckpoint = false;
  achievementsCheckpoint = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private hotkeysService: HotkeysService) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: Query});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      if (data && !data.tutorialCompleted) {
        this.navCtrl.push('TutorialPage', {name: "office"})
      }
      this.outcomesCheckpoint = data.outcomesCheckpoint;
      this.achievementsCheckpoint = data.achievementsCheckpoint;
    });
    this.setShortcuts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfficePage');
  }

  ionViewWillEnter() {
    this.tabs.select(0);
  }

  ionViewDidEnter() {
    this.tabs.select(0);
  }

  setShortcuts() {
    this.hotkeysService.add(new Hotkey('mod+j', (event: KeyboardEvent): boolean => {
      const index = this.tabs.getSelected().index - 1;
      if (index >= 0) {
        this.tabs.select(index);
      }
      return false; // Prevent bubbling
    }, [], 'previous tab'));
    this.hotkeysService.add(new Hotkey('mod+k', (event: KeyboardEvent): boolean => {
      const index = this.tabs.getSelected().index + 1;
      if (index < this.tabs._tabs.length) {
        this.tabs.select(index);
      }
      return false; // Prevent bubbling
    }, [], 'next tab'));
  }

  removeShortcuts() {
    for (const combo of ['mod+j', 'mod+k']) {
      const shortcut = this.hotkeysService.get(combo);
      if (shortcut) {
        this.hotkeysService.remove(shortcut);
      }
    }
  }

  ngOnDestroy() {
    this.removeShortcuts();
  }

}
