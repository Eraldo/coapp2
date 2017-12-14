import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TypewriterComponent} from "./typewriter";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    TypewriterComponent,
  ],
  imports: [
    IonicPageModule.forChild(TypewriterComponent),
    PipesModule
  ],
  exports: [
    TypewriterComponent
  ]
})
export class TypewriterComponentModule {}
