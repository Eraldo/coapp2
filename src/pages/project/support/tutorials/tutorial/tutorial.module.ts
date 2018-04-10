import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutorialPage } from './tutorial';
import {MarkdownModule} from "ngx-markdown";
import {PipesModule} from "../../../../../pipes/pipes.module";
import {EmbeddedVideoComponentModule} from "../../../../../components/embedded-video/embedded-video.module";

@NgModule({
  declarations: [
    TutorialPage,
  ],
  imports: [
    IonicPageModule.forChild(TutorialPage),
    MarkdownModule.forChild(),
    PipesModule,
    EmbeddedVideoComponentModule
  ],
})
export class TutorialPageModule {}
