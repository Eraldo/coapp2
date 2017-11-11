import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoryPage } from './story';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {ChapterComponentModule} from "../../../components/chapter/chapter.module";

@NgModule({
  declarations: [
    StoryPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryPage),
    AppToolbarComponentModule,
    ChapterComponentModule
  ],
  exports: [
    StoryPage
  ]
})
export class StoryPageModule {}
