import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InterviewPage } from './interview';
import {ScopeComponentModule} from "../../../components/scope/scope.module";
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {ScopedDatePickerComponentModule} from "../../../components/scoped-date-picker/scoped-date-picker.module";
import {ElasticModule} from "angular2-elastic";

@NgModule({
  declarations: [
    InterviewPage,
  ],
  imports: [
    IonicPageModule.forChild(InterviewPage),
    ScopeComponentModule,
    AppToolbarComponentModule,
    ScopedDatePickerComponentModule,
    ElasticModule
  ],
  exports: [
    InterviewPage
  ]
})
export class InterviewPageModule {}
