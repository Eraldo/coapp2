import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {PipesModule} from "../../../pipes/pipes.module";

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
    AppToolbarComponentModule,
    PipesModule
  ],
  exports: [
    DashboardPage
  ]
})
export class DashboardPageModule {}
