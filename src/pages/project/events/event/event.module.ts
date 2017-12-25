import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventPage } from './event';
import {MarkdownModule} from "ngx-md";
import {PipesModule} from "../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    EventPage,
  ],
  imports: [
    IonicPageModule.forChild(EventPage),
    MarkdownModule,
    PipesModule
  ],
})
export class EventPageModule {}
