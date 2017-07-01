import {Component, Input} from '@angular/core';
import {App} from "../../models/app";
import {ExperienceService} from "../../services/experience/experience";
import {Observable} from "rxjs/Observable";
import {NavController} from "ionic-angular";

@Component({
  selector: 'app-toolbar',
  templateUrl: 'app-toolbar.html'
})
export class AppToolbarComponent {

  @Input()
  app: App;
  status$ = Observable.of({});

  constructor(public navCtrl: NavController, private experienceService: ExperienceService) {
    console.log('Hello AppToolbarComponent Component');
  }

  ngOnChanges() {
    this.status$ = this.experienceService.getStatus$(this.app)
  }

  showMeta() {
    const page = this.getAppMetaPage();
    this.navCtrl.push(page);
  }

  private getAppMetaPage() {
    switch (this.app) {
      case App.home:
        return 'HomeMetaPage';
      case App.arcade:
        return 'ArcadeMetaPage';
      case App.office:
        return 'OfficeMetaPage';
      case App.community:
        return 'CommunityMetaPage';
      case App.studio:
        return 'StudioMetaPage';
      case App.academy:
        return 'AcademyMetaPage';
      case App.journey:
        return 'JourneyMetaPage';
    }
  }

  get color() {
    switch (this.app) {
      case App.home:
        return 'area-1';
      case App.arcade:
        return 'area-2';
      case App.office:
        return 'area-3';
      case App.community:
        return 'area-4';
      case App.studio:
        return 'area-5';
      case App.academy:
        return 'area-6';
      case App.journey:
        return 'area-7';
    }
  }

  get icon() {
    switch (this.app) {
      case App.home:
        return 'home';
      case App.arcade:
        return 'game-controller-a';
      case App.office:
        return 'briefcase';
      case App.community:
        return 'bonfire';
      case App.studio:
        return 'microphone';
      case App.academy:
        return 'school';
      case App.journey:
        return 'compass';
    }
  }

}
