import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrologueMockupPage } from './prologue-mockup';
import {TypewriterComponentModule} from "../../../components/typewriter/typewriter.module";
import {TypewriterPauseComponentModule} from "../../../components/typewriter/pause/typewriter-pause.module";

@NgModule({
  declarations: [
    PrologueMockupPage,
  ],
  imports: [
    IonicPageModule.forChild(PrologueMockupPage),
    TypewriterComponentModule,
    TypewriterPauseComponentModule,
  ],
  exports: [
    PrologueMockupPage
  ]
})
export class PrologueMockupPageModule {}
