import {Component, Input} from '@angular/core';
import {App} from "../../models/app";
import {NavController, ToastController} from "ionic-angular";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../models/icon";

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
  loading = true;
  query$;
  status;

  constructor(public navCtrl: NavController, private apollo: Apollo, public toastCtrl: ToastController) {
    console.log('Hello AppToolbarComponent Component');
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: ExperienceQuery,
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.status = data && data.viewer;
    });
  }

  showMeta() {
    const page = this.getAppMetaPage();
    this.navCtrl.push(page);
  }

  showExperience() {
      let toast = this.toastCtrl.create({
        message: `Experience: ${this.status.experience}/${this.status.experience - (this.status.experience % 100) + 100}`,
        duration: 2000,
        cssClass: 'info'
      });
      toast.present();
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
        return Icon.HOME;
      case App.arcade:
        return Icon.ARCADE;
      case App.office:
        return Icon.OFFICE;
      case App.community:
        return Icon.COMMUNITY;
      case App.studio:
        return Icon.STUDIO;
      case App.academy:
        return Icon.ACADEMY;
      case App.journey:
        return Icon.JOURNEY;
    }
  }

}
