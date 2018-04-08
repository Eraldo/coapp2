import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarkdownPage } from './markdown';
import {MarkdownModule} from "ngx-markdown";

@NgModule({
  declarations: [
    MarkdownPage,
  ],
  imports: [
    IonicPageModule.forChild(MarkdownPage),
    MarkdownModule.forChild()
  ],
})
export class MarkdownPageModule {}
