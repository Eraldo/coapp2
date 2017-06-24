import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatsPage } from './stats';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    StatsPage,
  ],
  imports: [
    IonicPageModule.forChild(StatsPage),
    AppToolbarComponentModule,
  ],
  exports: [
    StatsPage
  ]
})
export class StatsPageModule {}
