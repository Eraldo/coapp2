import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MentorPage } from './mentor';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {UserItemComponentModule} from "../../../components/user-item/user-item.module";

@NgModule({
  declarations: [
    MentorPage,
  ],
  imports: [
    IonicPageModule.forChild(MentorPage),
    AppToolbarComponentModule,
    UserItemComponentModule,
  ],
  exports: [
    MentorPage
  ]
})
export class MentorPageModule {}
