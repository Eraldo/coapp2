import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutQuizPage } from './about-quiz';

@NgModule({
  declarations: [
    AboutQuizPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutQuizPage),
  ],
  exports: [
    AboutQuizPage
  ]
})
export class AboutQuizPageModule {}
