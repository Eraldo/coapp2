import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { FeedbackPage } from './feedback';
import {ElasticModule} from "angular2-elastic";

@NgModule({
  declarations: [
    FeedbackPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedbackPage),
    ElasticModule
  ],
  exports: [
    FeedbackPage
  ]
})
export class FeedbackPageModule {}
