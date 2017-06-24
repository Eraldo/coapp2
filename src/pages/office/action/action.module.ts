import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionPage } from './action';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    ActionPage,
  ],
  imports: [
    IonicPageModule.forChild(ActionPage),
    AppToolbarComponentModule,
  ],
  exports: [
    ActionPage
  ]
})
export class ActionPageModule {}
