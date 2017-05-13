import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChapterPage } from './chapter';

@NgModule({
  declarations: [
    ChapterPage,
  ],
  imports: [
    IonicPageModule.forChild(ChapterPage),
  ],
  exports: [
    ChapterPage
  ]
})
export class ChapterPageModule {}
