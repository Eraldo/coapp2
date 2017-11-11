import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoryPage } from './story';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {MarkdownModule} from "angular2-markdown";

@NgModule({
  declarations: [
    StoryPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryPage),
    AppToolbarComponentModule,
    MarkdownModule
  ],
  exports: [
    StoryPage
  ]
})
export class StoryPageModule {}
