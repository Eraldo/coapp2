import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProloguePage } from './prologue';
import {TypewriterComponentModule} from "../../../../components/typewriter/typewriter.module";
import {TypewriterPauseComponentModule} from "../../../../components/typewriter/pause/typewriter-pause.module";
import {TypewriterSpeedComponentModule} from "../../../../components/typewriter/speed/typewriter-speed.module";

@NgModule({
  declarations: [
    ProloguePage,
  ],
  imports: [
    IonicPageModule.forChild(ProloguePage),
    TypewriterComponentModule,
    TypewriterPauseComponentModule,
    TypewriterSpeedComponentModule,
  ],
  exports: [
    ProloguePage
  ]
})
export class ProloguePageModule {}
