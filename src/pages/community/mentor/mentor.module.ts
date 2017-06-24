import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MentorPage } from './mentor';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    MentorPage,
  ],
  imports: [
    IonicPageModule.forChild(MentorPage),
    AppToolbarComponentModule,
  ],
  exports: [
    MentorPage
  ]
})
export class MentorPageModule {}
