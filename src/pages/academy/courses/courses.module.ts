import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoursesPage } from './courses';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {RoundProgressModule} from "angular-svg-round-progressbar";

@NgModule({
  declarations: [
    CoursesPage,
  ],
  imports: [
    IonicPageModule.forChild(CoursesPage),
    AppToolbarComponentModule,
    RoundProgressModule,
  ],
  exports: [
    CoursesPage
  ]
})
export class CoursesPageModule {}
