import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InboxPage } from './inbox';
import {AppToolbarComponentModule} from "../../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    InboxPage,
  ],
  imports: [
    IonicPageModule.forChild(InboxPage),
    AppToolbarComponentModule,
  ],
  exports: [
    InboxPage
  ]
})
export class InboxPageModule {}
