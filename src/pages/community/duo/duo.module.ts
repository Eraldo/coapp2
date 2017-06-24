import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { DuoPage } from './duo';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    DuoPage,
  ],
  imports: [
    IonicPageModule.forChild(DuoPage),
    AppToolbarComponentModule,
  ],
  exports: [
    DuoPage
  ]
})
export class DuoPageModule {}
