import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InterviewPage } from './interview';
import {ScopeComponentModule} from "../../../components/scope/scope.module";

@NgModule({
  declarations: [
    InterviewPage,
  ],
  imports: [
    IonicPageModule.forChild(InterviewPage),
    ScopeComponentModule,
  ],
  exports: [
    InterviewPage
  ]
})
export class InterviewPageModule {}
