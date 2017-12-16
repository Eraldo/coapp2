import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoryPage } from './story';
import {ChapterComponentModule} from "../../../components/chapter/chapter.module";

@NgModule({
  declarations: [
    StoryPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryPage),
    ChapterComponentModule
  ],
  exports: [
    StoryPage
  ]
})
export class StoryPageModule {}
