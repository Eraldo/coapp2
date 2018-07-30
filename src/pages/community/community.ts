import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../models/icon";
import {Hotkey, HotkeysService} from "angular2-hotkeys";

const Query = gql`
  query {
    tutorialCompleted: hasCheckpoint(name: "community tutorial")
    clanCheckpoint: hasCheckpoint(name: "clan tutorial")
    tribeCheckpoint: hasCheckpoint(name: "tribe tutorial")
    chatCheckpoint: hasCheckpoint(name: "chat")
    mentorCheckpoint: hasCheckpoint(name: "mentor tutorial")
  }
`;

@IonicPage()
@Component({
  selector: 'page-community',
  templateUrl: 'community.html',
})
export class CommunityPage {
  @ViewChild(Tabs) tabs;
  query$;
  loading = true;
  icons;
  clanCheckpoint = false;
  tribeCheckpoint = false;
  mentorCheckpoint = false;
  chatCheckpoint = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private hotkeysService: HotkeysService) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: Query});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      if (data && !data.tutorialCompleted) {
        this.navCtrl.push('TutorialPage', {name: "community"})
      }
      this.clanCheckpoint = data.clanCheckpoint;
      this.tribeCheckpoint = data.tribeCheckpoint;
      this.mentorCheckpoint = data.mentorCheckpoint;
      this.chatCheckpoint = data.chatCheckpoint;
    });
    this.setShortcuts();
  }

  openChat() {
    if (this.chatCheckpoint) {
      window.open('http://chat.coLegend.org/', '_blank');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityPage');
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
