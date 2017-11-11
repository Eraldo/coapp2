import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChapterFormPage } from './chapter-form';
import {SimplemdeModule} from "ng2-simplemde/no-style";

@NgModule({
  declarations: [
    ChapterFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ChapterFormPage),
    SimplemdeModule
  ],
})
export class ChapterFormPageModule {}
