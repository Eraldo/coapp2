import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TypewriterComponent} from "./typewriter";

@NgModule({
  declarations: [
    TypewriterComponent,
  ],
  imports: [
    IonicPageModule.forChild(TypewriterComponent),
  ],
  exports: [
    TypewriterComponent
  ]
})
export class TypewriterComponentModule {}
