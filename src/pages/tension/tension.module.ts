import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TensionPage } from './tension';
import {MarkdownModule} from "ngx-markdown";

@NgModule({
  declarations: [
    TensionPage,
  ],
  imports: [
    IonicPageModule.forChild(TensionPage),
    MarkdownModule.forChild(),
  ],
})
export class TensionPageModule {}
