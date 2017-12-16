import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudioPage } from './studio';
import {AppToolbarComponentModule} from "../../components/app-toolbar/app-toolbar.module";
import {SuperTabsModule} from "ionic2-super-tabs";

@NgModule({
  declarations: [
    StudioPage,
  ],
  imports: [
    IonicPageModule.forChild(StudioPage),
    SuperTabsModule,
    AppToolbarComponentModule
  ]
})
export class StudioPageModule {}
