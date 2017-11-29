import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutorialPage } from './tutorial';
import {MarkdownModule} from "angular2-markdown";
import {PipesModule} from "../../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    TutorialPage,
  ],
  imports: [
    IonicPageModule.forChild(TutorialPage),
    MarkdownModule,
    PipesModule
  ],
})
export class TutorialPageModule {}
