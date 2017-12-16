import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcademyPage } from './academy';
import {AppToolbarComponentModule} from "../../components/app-toolbar/app-toolbar.module";
import {SuperTabsModule} from "ionic2-super-tabs";

@NgModule({
  declarations: [
    AcademyPage,
  ],
  imports: [
    IonicPageModule.forChild(AcademyPage),
    SuperTabsModule,
    AppToolbarComponentModule
  ]
})
export class AcademyPageModule {}
