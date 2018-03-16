import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoursesMockupPage } from './courses-mockup';
import {RoundProgressModule} from "angular-svg-round-progressbar";

@NgModule({
  declarations: [
    CoursesMockupPage,
  ],
  imports: [
    IonicPageModule.forChild(CoursesMockupPage),
    RoundProgressModule,
  ],
})
export class CoursesMockupPageModule {}
