import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AchievementsPage } from './achievements';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    AchievementsPage,
  ],
  imports: [
    IonicPageModule.forChild(AchievementsPage),
    AppToolbarComponentModule,
  ],
  exports: [
    AchievementsPage
  ]
})
export class AchievementsPageModule {}
