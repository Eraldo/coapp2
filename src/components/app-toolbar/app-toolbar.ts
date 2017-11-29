import {Component, Input} from '@angular/core';
import {App} from "../../models/app";
import {Observable} from "rxjs/Observable";
import {NavController, ToastController} from "ionic-angular";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

export const ExperienceQuery = gql`
  query Status {
    viewer {
      id
      level
      experience
    }
  }
`;

interface Status {
  level: number
  experience: number
}

@Component({
  selector: 'app-toolbar',
  templateUrl: 'app-toolbar.html'
})
export class AppToolbarComponent {
  @Input()
  app: App;
  status$: Observable<Status>;

  constructor(public navCtrl: NavController, private apollo: Apollo, public toastCtrl: ToastController) {
    console.log('Hello AppToolbarComponent Component');
  }

  ngOnInit() {
    this.status$ = this.apollo.watchQuery<{ viewer: Status }>({query: ExperienceQuery})
      .map(({data}) => data.viewer);
  }

  showMeta() {
    const page = this.getAppMetaPage();
    this.navCtrl.push(page);
  }

  showExperience() {
    this.status$.first().subscribe(status => {
      let toast = this.toastCtrl.create({
        message: `Experience: ${status.experience}/${status.experience - (status.experience % 100) + 100}`,
        duration: 2000
      });
      toast.present();
    })
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
