import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { DuoPage } from './duo';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {DuoUserCardComponentModule} from "./duo-user-card/duo-user-card.module";

@NgModule({
  declarations: [
    DuoPage,
  ],
  imports: [
    IonicPageModule.forChild(DuoPage),
    AppToolbarComponentModule,
    DuoUserCardComponentModule,
  ],
  exports: [
    DuoPage
  ]
})
export class DuoPageModule {}
