import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestPage } from './quest';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    QuestPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestPage),
    AppToolbarComponentModule,
  ],
  exports: [
    QuestPage
  ]
})
export class QuestPageModule {}
