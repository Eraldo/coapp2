import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutorialComponent } from './tutorial';
import {MarkdownModule} from "angular2-markdown";

@NgModule({
  declarations: [
    TutorialComponent,
  ],
  imports: [
    IonicPageModule.forChild(TutorialComponent),
    MarkdownModule
  ],
  exports: [
    TutorialComponent
  ]
})
export class TutorialComponentModule {}
