import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { ClanPage } from './clan';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    ClanPage,
  ],
  imports: [
    IonicPageModule.forChild(ClanPage),
    AppToolbarComponentModule,
  ],
  exports: [
    ClanPage
  ]
})
export class ClanPageModule {}
