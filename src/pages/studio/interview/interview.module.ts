import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InterviewPage } from './interview';
import {ScopeComponentModule} from "../../../components/scope/scope.module";
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    InterviewPage,
  ],
  imports: [
    IonicPageModule.forChild(InterviewPage),
    ScopeComponentModule,
    AppToolbarComponentModule,
  ],
  exports: [
    InterviewPage
  ]
})
export class InterviewPageModule {}
