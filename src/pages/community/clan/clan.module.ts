import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { ClanPage } from './clan';
import {ClanUserCardComponentModule} from "./clan-user-card/clan-user-card.module";
import {MarkdownModule} from "ngx-markdown";

@NgModule({
  declarations: [
    ClanPage,
  ],
  imports: [
    IonicPageModule.forChild(ClanPage),
    ClanUserCardComponentModule,
    MarkdownModule.forChild(),
  ],
  exports: [
    ClanPage
  ]
})
export class ClanPageModule {}
