import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MentorPage } from './mentor';

@NgModule({
  declarations: [
    MentorPage,
  ],
  imports: [
    IonicPageModule.forChild(MentorPage),
  ],
  exports: [
    MentorPage
  ]
})
export class MentorPageModule {}
