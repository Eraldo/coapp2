import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrologueMockupPage } from './prologue-mockup';
import {TypewriterComponentModule} from "../../../components/typewriter/typewriter.module";
import {TypewriterPauseComponentModule} from "../../../components/typewriter/pause/typewriter-pause.module";
import {TypewriterSpeedComponentModule} from "../../../components/typewriter/speed/typewriter-speed.module";
// import {TypewriterSpeedComponent} from "../../../components/typewriter/speed/typewriter-speed";

@NgModule({
  declarations: [
    PrologueMockupPage,
    // TypewriterSpeedComponent,
  ],
  imports: [
    IonicPageModule.forChild(PrologueMockupPage),
    TypewriterComponentModule,
    TypewriterPauseComponentModule,
    TypewriterSpeedComponentModule,
  ],
  exports: [
    PrologueMockupPage
  ]
})
export class PrologueMockupPageModule {}
