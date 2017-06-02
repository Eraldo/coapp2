import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import {ProgressBarComponent} from "../../../components/progress-bar/progress-bar";

@NgModule({
  declarations: [
    DashboardPage,
    ProgressBarComponent
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
  ],
  exports: [
    DashboardPage
  ]
})
export class DashboardPageModule {}
