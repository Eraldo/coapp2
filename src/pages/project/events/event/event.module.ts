import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventPage } from './event';
import {MarkdownModule} from "ngx-markdown";
import {PipesModule} from "../../../../pipes/pipes.module";
import {EmbeddedVideoComponentModule} from "../../../../components/embedded-video/embedded-video.module";

@NgModule({
  declarations: [
    EventPage,
  ],
  imports: [
    IonicPageModule.forChild(EventPage),
    MarkdownModule.forChild(),
    PipesModule,
    EmbeddedVideoComponentModule
  ],
})
export class EventPageModule {}
