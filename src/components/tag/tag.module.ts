import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TagComponent} from "./tag";

@NgModule({
  declarations: [
    TagComponent,
  ],
  imports: [
    IonicPageModule.forChild(TagComponent),
  ],
  exports: [
    TagComponent
  ]
})
export class TagComponentModule {}
