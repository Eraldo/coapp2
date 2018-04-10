import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import {PipesModule} from "../../../pipes/pipes.module";
import {EmbeddedVideoComponentModule} from "../../../components/embedded-video/embedded-video.module";

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
    PipesModule,
    EmbeddedVideoComponentModule
  ],
  exports: [
    DashboardPage
  ]
})
export class DashboardPageModule {}
