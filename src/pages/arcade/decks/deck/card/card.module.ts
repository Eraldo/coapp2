import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardPage } from './card';
import {MarkdownModule} from "ngx-markdown";

@NgModule({
  declarations: [
    CardPage,
  ],
  imports: [
    IonicPageModule.forChild(CardPage),
    MarkdownModule.forChild(),
  ],
})
export class CardPageModule {}
