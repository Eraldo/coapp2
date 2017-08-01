import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { ClanPage } from './clan';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {ClanUserCardComponentModule} from "./clan-user-card/clan-user-card.module";

@NgModule({
  declarations: [
    ClanPage,
  ],
  imports: [
    IonicPageModule.forChild(ClanPage),
    AppToolbarComponentModule,
    ClanUserCardComponentModule
  ],
  exports: [
    ClanPage
  ]
})
export class ClanPageModule {}
