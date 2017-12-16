import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficePage } from './office';
import {AppToolbarComponentModule} from "../../components/app-toolbar/app-toolbar.module";
import {SuperTabsModule} from "ionic2-super-tabs";

@NgModule({
  declarations: [
    OfficePage,
  ],
  imports: [
    IonicPageModule.forChild(OfficePage),
    SuperTabsModule,
    AppToolbarComponentModule
  ],
  exports: [
    OfficePage
  ]
})
export class OfficePageModule {}
