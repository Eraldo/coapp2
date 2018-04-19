import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestPage } from './quest';
import {EmbeddedVideoComponentModule} from "../../../components/embedded-video/embedded-video.module";
import {MarkdownModule} from "ngx-markdown";

@NgModule({
  declarations: [
    QuestPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestPage),
    EmbeddedVideoComponentModule,
    MarkdownModule.forChild()
  ],
  exports: [
    QuestPage
  ]
})
export class QuestPageModule {}
