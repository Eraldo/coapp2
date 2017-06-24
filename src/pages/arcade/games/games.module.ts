import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GamesPage } from './games';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    GamesPage,
  ],
  imports: [
    IonicPageModule.forChild(GamesPage),
    AppToolbarComponentModule,
  ],
  exports: [
    GamesPage
  ]
})
export class GamesPageModule {}
