import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import {Icon} from "../../models/icon";
import {Hotkey, HotkeysService} from "angular2-hotkeys";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    private hotkeysService: HotkeysService,
  ) {
    this.icons = Icon;
  }

  ngOnInit() {
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
