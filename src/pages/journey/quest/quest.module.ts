import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestPage } from './quest';
import {ProgressBarComponentModule} from "../../../components/progress-bar/progress-bar.module";

@NgModule({
  declarations: [
    QuestPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestPage),
    ProgressBarComponentModule,
  ],
  exports: [
    QuestPage
  ]
})
export class QuestPageModule {}
