import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../models/icon";
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {SuperTabs} from "ionic2-super-tabs";

const Query = gql`
  query {
    tutorialCompleted: hasCheckpoint(name: "office tutorial")
  }
`;

@IonicPage()
@Component({
  selector: 'page-office',
  templateUrl: 'office.html',
})
export class OfficePage {
  @ViewChild(SuperTabs) superTabs: SuperTabs;
  loading = true;
  query$;
  icons;

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
    });
    this.setShortcuts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfficePage');
  }

  setShortcuts() {
    this.hotkeysService.add(new Hotkey('mod+j', (event: KeyboardEvent): boolean => {
      const index = this.superTabs.selectedTabIndex - 1;
      if (index >= 0) {
        this.superTabs.slideTo(index);
      }
      return false; // Prevent bubbling
    }, [], 'previous tab'));
    this.hotkeysService.add(new Hotkey('mod+k', (event: KeyboardEvent): boolean => {
      const index = this.superTabs.selectedTabIndex + 1;
      if (index < this.superTabs._tabs.length) {
        this.superTabs.slideTo(index);
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
