import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EmbeddedVideoComponent} from "./embedded-video";

@NgModule({
  declarations: [
    EmbeddedVideoComponent,
  ],
  imports: [
    IonicPageModule.forChild(EmbeddedVideoComponent),
  ],
  exports: [
    EmbeddedVideoComponent
  ]
})
export class EmbeddedVideoComponentModule {}
