import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TagPage } from './tag';
import {MarkdownModule} from "ngx-md";

@NgModule({
  declarations: [
    TagPage,
  ],
  imports: [
    IonicPageModule.forChild(TagPage),
    MarkdownModule
  ],
})
export class TagPageModule {}
