import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import {ToastController} from "ionic-angular";
import gql from "graphql-tag";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ANONYMOUS_USER} from "../../models/user";
import {AudioService, Sound} from "../audio/audio";

export const ViewerQuery = gql`
  query Viewer {
    viewer {
      id
      username
      name
      avatar
      isAuthenticated
      isActive
      isPremium
      isStaff
      isSuperuser
      level
      experience
    }
  }
`;

@Injectable()
export class UserService {
  loading = true;
  query$;
  viewer$ = new BehaviorSubject(ANONYMOUS_USER);

  get viewer() {
    return this.viewer$.value;
  }

  set viewer(value) {
    this.viewer$.next(value)
  }

  constructor(private apollo: Apollo, public toastCtrl: ToastController, public audioService: AudioService) {
    console.log('Hello UserService Service');

    this.query$ = this.apollo.watchQuery({
      query: ViewerQuery,
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      const oldViewer = this.viewer;
      this.viewer = data && data.viewer;
      if (oldViewer && this.viewer) {
        this.checkExperience(oldViewer);
        this.checkLevel(oldViewer);
      }
    });
  }

  checkLevel(oldViewer) {
    if (oldViewer.level && this.viewer.level && oldViewer.level != this.viewer.level) {
      const diff = this.viewer.level - oldViewer.level;
      let toast = this.toastCtrl.create({
        message: `Levelup: ${this.viewer.level}`,
        duration: 3000,
        cssClass: 'success'
      });
      toast.present();
      this.audioService.play(Sound.LEVELUP)
    }
  }

  checkExperience(oldViewer) {
    if (oldViewer.experience && this.viewer.experience && oldViewer.experience != this.viewer.experience) {
      const diff = this.viewer.experience - oldViewer.experience;
      let toast = this.toastCtrl.create({
        message: `Karma: ${diff > 0 ? '+' : diff < 0 ? '-' : ''}${diff}`,
        duration: 2000,
        cssClass: 'success'
      });
      toast.present();
      this.audioService.play(Sound.SUCCESS)
    }
  }

}
