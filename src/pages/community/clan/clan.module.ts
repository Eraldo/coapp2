import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { ClanPage } from './clan';
import {ClanUserCardComponentModule} from "./clan-user-card/clan-user-card.module";

@NgModule({
  declarations: [
    ClanPage,
  ],
  imports: [
    IonicPageModule.forChild(ClanPage),
    ClanUserCardComponentModule
  ],
  exports: [
    ClanPage
  ]
})
export class ClanPageModule {}
