import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { TribePage } from './tribe';
import {TribeUserItemComponentModule} from "./tribe-user-item/tribe-user-item.module";
import {MarkdownModule} from "ngx-markdown";

@NgModule({
  declarations: [
    TribePage,
  ],
  imports: [
    IonicPageModule.forChild(TribePage),
    TribeUserItemComponentModule,
    MarkdownModule.forChild(),
  ],
  exports: [
    TribePage
  ]
})
export class TribePageModule {}
