import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoursesPage } from './courses';
import {RoundProgressModule} from "angular-svg-round-progressbar";

@NgModule({
  declarations: [
    CoursesPage,
  ],
  imports: [
    IonicPageModule.forChild(CoursesPage),
    RoundProgressModule,
  ],
  exports: [
    CoursesPage
  ]
})
export class CoursesPageModule {}
