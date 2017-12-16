import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityPage } from './community';
import {AppToolbarComponentModule} from "../../components/app-toolbar/app-toolbar.module";
import {SuperTabsModule} from "ionic2-super-tabs";

@NgModule({
  declarations: [
    CommunityPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityPage),
    SuperTabsModule,
    AppToolbarComponentModule
  ],
  exports: [
    CommunityPage
  ]
})
export class CommunityPageModule {}
