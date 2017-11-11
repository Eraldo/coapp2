import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoryPage } from './story';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    StoryPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryPage),
    AppToolbarComponentModule,
    ComponentsModule
  ],
  exports: [
    StoryPage
  ]
})
export class StoryPageModule {}
