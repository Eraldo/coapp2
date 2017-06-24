import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizzesPage } from './quizzes';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    QuizzesPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizzesPage),
    AppToolbarComponentModule,
  ],
  exports: [
    QuizzesPage
  ]
})
export class QuizzesPageModule {}
