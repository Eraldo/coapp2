import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoursesPage } from './courses';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    CoursesPage,
  ],
  imports: [
    IonicPageModule.forChild(CoursesPage),
    AppToolbarComponentModule,
  ],
  exports: [
    CoursesPage
  ]
})
export class CoursesPageModule {}
