import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TypewriterSpeedComponent} from "./typewriter-speed";

@NgModule({
  declarations: [
    TypewriterSpeedComponent,
  ],
  imports: [
    IonicPageModule.forChild(TypewriterSpeedComponent),
  ],
  exports: [
    TypewriterSpeedComponent
  ]
})
export class TypewriterSpeedComponentModule {}
