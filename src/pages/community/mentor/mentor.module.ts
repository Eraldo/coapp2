import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MentorPage } from './mentor';
import {UserItemComponentModule} from "../../../components/user-item/user-item.module";

@NgModule({
  declarations: [
    MentorPage,
  ],
  imports: [
    IonicPageModule.forChild(MentorPage),
    UserItemComponentModule,
  ],
  exports: [
    MentorPage
  ]
})
export class MentorPageModule {}
