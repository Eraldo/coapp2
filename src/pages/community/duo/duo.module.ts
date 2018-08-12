import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { DuoPage } from './duo';
import {DuoUserCardComponentModule} from "./duo-user-card/duo-user-card.module";
import {MarkdownModule} from "ngx-markdown";

@NgModule({
  declarations: [
    DuoPage,
  ],
  imports: [
    IonicPageModule.forChild(DuoPage),
    DuoUserCardComponentModule,
    MarkdownModule.forChild(),
  ],
  exports: [
    DuoPage
  ]
})
export class DuoPageModule {}
