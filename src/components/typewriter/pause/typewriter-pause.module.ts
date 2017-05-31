import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TypewriterPauseComponent} from "./typewriter-pause";

@NgModule({
  declarations: [
    TypewriterPauseComponent,
  ],
  imports: [
    IonicPageModule.forChild(TypewriterPauseComponent),
  ],
  exports: [
    TypewriterPauseComponent
  ]
})
export class TypewriterPauseComponentModule {}
