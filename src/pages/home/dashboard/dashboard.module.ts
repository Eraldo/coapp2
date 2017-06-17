import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import {ProgressBarComponentModule} from "../../../components/progress-bar/progress-bar.module";

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
    ProgressBarComponentModule,
  ],
  exports: [
    DashboardPage
  ]
})
export class DashboardPageModule {}
